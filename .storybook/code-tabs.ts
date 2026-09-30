/// <reference types="vite/client" />
import { createElement, useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import { Canvas, Source, useOf } from '@storybook/addon-docs/blocks';

type SourceLanguage = ComponentProps<typeof Source>['language'];

/** One tab: its label and what to render under it. */
interface Tab {
  name: string;
  content: () => ReactNode;
}

/** One source file: its name, shown as the tab label, and its content. */
export interface CodeFile {
  name: string;
  code: string;
}

// Every component source file under src/showcase, as text, so an example can
// show the real files of whatever it renders.
const SOURCES = import.meta.glob<string>(
  ['../src/showcase/**/*.{html,scss,ts}', '!../src/showcase/**/*.stories.ts', '!../src/showcase/**/*.spec.ts'],
  { query: '?raw', import: 'default', eager: true },
);

const LANGUAGES: Record<string, string> = { html: 'html', ts: 'typescript', scss: 'scss', css: 'css' };

const languageOf = (name: string): SourceLanguage =>
  (LANGUAGES[name.split('.').pop() ?? ''] ?? 'text') as SourceLanguage;

const dirOf = (path: string): string => path.slice(0, path.lastIndexOf('/'));

// HTML, TS, SCSS first, the way material.angular.dev orders its example tabs.
const ORDER = [/\.component\.html$/, /\.component\.ts$/, /\.component\.scss$/, /\.types\.ts$/, /\.constants\.ts$/, /\.utils\.ts$/];
const rank = (path: string): number => {
  const i = ORDER.findIndex((r) => r.test(path));
  return i < 0 ? ORDER.length : i;
};

/** Element selector (such as `docs-token-card`) -> the folder its component lives in. */
const SELECTOR_DIRS = new Map<string, string>();
for (const [path, code] of Object.entries(SOURCES)) {
  if (!path.endsWith('.component.ts')) continue;
  const selector = code.match(/selector:\s*'([a-z][\w-]*)'/)?.[1];
  if (selector) SELECTOR_DIRS.set(selector, dirOf(path));
}

const filesIn = (dir: string): string[] =>
  Object.keys(SOURCES)
    .filter((path) => dirOf(path) === dir)
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

/** `./src/showcase/table/table.stories.ts` -> `../src/showcase/table`, the key prefix in SOURCES. */
const storyDir = (fileName: string): string => '..' + dirOf(fileName).replace(/^\./, '');

const labelFor = (path: string, base: string): string =>
  path.startsWith(base + '/') ? path.slice(base.length + 1) : path.replace('../src/showcase/', '');

interface StoryLike {
  id: string;
  parameters: {
    fileName: string;
    docs?: { source?: { transform?: (code: string, ctx: { args: Record<string, unknown> }) => string } };
  };
  initialArgs: Record<string, unknown>;
  component?: { ɵcmp?: { selectors?: string[][] } };
  originalStoryFn: (args: Record<string, unknown>, ctx: unknown) => { template?: string } | undefined;
}

const dedent = (text: string): string => {
  const lines = text.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length));
  return lines.map((l) => l.slice(indent)).join('\n');
};

/** `<selector input="value" [flag]="true" />` from a component story's args. */
const tagFor = (selector: string, args: Record<string, unknown>): string => {
  const attrs = Object.entries(args)
    .filter(([, v]) => v !== '' && v !== undefined && v !== null && typeof v !== 'function')
    .map(([k, v]) => (typeof v === 'string' ? `${k}="${v}"` : `[${k}]="${JSON.stringify(v).replace(/"/g, "'")}"`));
  if (!attrs.length) return `<${selector} />`;
  return `<${selector}\n  ${attrs.join('\n  ')}\n/>`;
};

const literal = (v: unknown): string =>
  typeof v === 'string' ? `'${v}'` : JSON.stringify(v).replace(/"/g, "'");

/**
 * Playground templates bind to arg names (`[height]="height"`, `{{ label }}`).
 * Swap those names for the story's values, so the markup reads the way you
 * would write it in an app.
 */
const withArgValues = (code: string, args: Record<string, unknown>): string =>
  Object.entries(args)
    .filter(([, v]) => v !== undefined && typeof v !== 'function')
    .reduce(
      (out, [name, v]) =>
        out
          .replace(new RegExp(`(\\[[\\w.-]+\\])="${name}"`, 'g'), `$1="${literal(v)}"`)
          .replace(new RegExp(`\\{\\{\\s*${name}\\s*\\}\\}`, 'g'), String(v)),
      code,
    );

/**
 * The markup a story renders, worked out from the story itself: the template
 * its render function returns, or the component tag with its args. A story's
 * own `docs.source.transform` gets the last word.
 */
const storyMarkup = (story: StoryLike): string => {
  const args = story.initialArgs ?? {};
  let code = '';
  try {
    code = story.originalStoryFn(args, { args })?.template ?? '';
  } catch {
    // A render function that needs a live context; fall back to the tag.
  }
  if (code) code = withArgValues(dedent(code), args);
  else {
    const selector = story.component?.ɵcmp?.selectors?.[0]?.[0];
    code = selector ? tagFor(selector, args) : '';
  }
  const transform = story.parameters.docs?.source?.transform;
  return transform ? transform(code, { args }) : code;
};

function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[Math.min(active, tabs.length - 1)];

  return createElement(
    'div',
    { className: 'docs-code-tabs' },
    createElement(
      'div',
      { className: 'docs-code-tabs__bar', role: 'tablist', 'aria-label': 'Source files' },
      tabs.map((tab, i) =>
        createElement(
          'button',
          {
            key: tab.name,
            type: 'button',
            role: 'tab',
            'aria-selected': tab === current,
            className: 'docs-code-tabs__tab' + (tab === current ? ' docs-code-tabs__tab--active' : ''),
            onClick: () => setActive(i),
          },
          tab.name,
        ),
      ),
    ),
    current.content(),
  );
}

/**
 * A fixed list of files in tabs:
 *
 *   import html from './card/card.component.html?raw';
 *   <CodeTabs files={[{ name: 'card.component.html', code: html }]} />
 */
export function CodeTabs({ files }: { files: CodeFile[] }) {
  return createElement(Tabs, {
    tabs: files.map((f) => ({
      name: f.name,
      content: () => createElement(Source, { code: f.code, language: languageOf(f.name) }),
    })),
  });
}

/**
 * Use instead of `<Canvas of={...} />`. Renders the story, then tabs: the
 * story's own markup as `example.html`, followed by every file of each
 * showcase component the story renders, nested ones included.
 */
export function Example({ of }: { of: unknown }) {
  const story = (useOf(of as never, ['story']) as unknown as { story: StoryLike }).story;
  const markup = storyMarkup(story);
  const base = storyDir(story.parameters.fileName);
  const host = useRef<HTMLDivElement>(null);
  const [dirs, setDirs] = useState<string[]>([]);

  // Components render asynchronously, so look for their elements a few times.
  useEffect(() => {
    let tries = 0;
    const scan = () => {
      const found: string[] = [];
      host.current?.querySelectorAll('*').forEach((el) => {
        const dir = SELECTOR_DIRS.get(el.tagName.toLowerCase());
        if (dir && !found.includes(dir)) found.push(dir);
      });
      setDirs((prev) => (prev.join() === found.join() ? prev : found));
    };
    scan();
    const timer = setInterval(() => {
      scan();
      if (++tries >= 20) clearInterval(timer);
    }, 250);
    return () => clearInterval(timer);
  }, [story.id]);

  const tabs: Tab[] = [
    { name: 'example.html', content: () => createElement(Source, { code: markup, language: 'html' }) },
    ...dirs.flatMap((dir) =>
      filesIn(dir).map((path) => ({
        name: labelFor(path, base),
        content: () => createElement(Source, { code: SOURCES[path], language: languageOf(path) }),
      })),
    ),
  ];

  return createElement(
    'div',
    { className: 'docs-example', ref: host },
    createElement(Canvas, { of: of as never, sourceState: 'none' }),
    createElement(Tabs, { tabs }),
  );
}
