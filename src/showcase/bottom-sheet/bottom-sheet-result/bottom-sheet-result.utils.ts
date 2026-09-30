export const resultMessage = (id: string | undefined): string =>
  id ? `You picked "${id}".` : 'Dismissed without choosing.';
