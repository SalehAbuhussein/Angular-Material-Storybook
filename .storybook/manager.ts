import { createElement, useEffect, useState } from 'react';
import { addons, types } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { MoonIcon, SunIcon } from '@storybook/icons';

import {
  PALETTES,
  PALETTE_EVENT,
  SCHEME_EVENT,
  readPalette,
  readScheme,
  writePalette,
  writeScheme,
  type Palette,
  type Scheme,
} from './scheme';

const ADDON_ID = 'docs-scheme';

// Send the saved value once the preview is listening, and again whenever
// the user navigates, so a freshly loaded story starts in the right mode.
function useBroadcast(event: string, value: string) {
  useEffect(() => {
    const channel = addons.getChannel();
    const send = () => channel.emit(event, value);
    send();
    channel.on('storyRendered', send);
    channel.on('docsRendered', send);
    return () => {
      channel.off('storyRendered', send);
      channel.off('docsRendered', send);
    };
  }, [event, value]);
}

function SchemeTool() {
  const [scheme, setScheme] = useState<Scheme>(readScheme);
  useBroadcast(SCHEME_EVENT, scheme);

  const next: Scheme = scheme === 'dark' ? 'light' : 'dark';

  return createElement(
    IconButton,
    {
      key: ADDON_ID,
      title: `Switch to ${next} scheme`,
      'aria-label': `Switch to ${next} scheme`,
      onClick: () => {
        writeScheme(next);
        setScheme(next);
      },
    },
    createElement(scheme === 'dark' ? MoonIcon : SunIcon),
  );
}

// Cycles through PALETTES on each click. The label is the current palette.
function PaletteTool() {
  const [palette, setPalette] = useState<Palette>(readPalette);
  useBroadcast(PALETTE_EVENT, palette);

  const next = PALETTES[(PALETTES.indexOf(palette) + 1) % PALETTES.length];

  return createElement(
    IconButton,
    {
      key: `${ADDON_ID}/palette`,
      title: `Primary palette: ${palette}. Click for ${next}`,
      'aria-label': `Primary palette ${palette}, switch to ${next}`,
      onClick: () => {
        writePalette(next);
        setPalette(next);
      },
    },
    palette,
  );
}

addons.register(ADDON_ID, () => {
  addons.add(`${ADDON_ID}/tool`, {
    type: types.TOOL,
    title: 'Colour scheme',
    render: () => createElement(SchemeTool),
  });
  addons.add(`${ADDON_ID}/palette-tool`, {
    type: types.TOOL,
    title: 'Primary palette',
    render: () => createElement(PaletteTool),
  });
});
