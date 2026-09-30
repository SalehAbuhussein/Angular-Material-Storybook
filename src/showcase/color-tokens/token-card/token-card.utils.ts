export const readCssVariable = (element: HTMLElement, name: string): string =>
  getComputedStyle(element).getPropertyValue(name).trim();
