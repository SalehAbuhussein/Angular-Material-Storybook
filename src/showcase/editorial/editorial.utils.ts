/** How far through its scrollable content an element is, from 0 to 100. */
export function scrollPercent(el: HTMLElement): number {
  const max = el.scrollHeight - el.clientHeight;
  return max <= 0 ? 0 : Math.round((el.scrollTop / max) * 100);
}
