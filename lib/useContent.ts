import content from './content.json';

export const getContent = () => content;

export const interpolateText = (text: string, values: Record<string, string | number>): string => {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return String(values[key] ?? match);
  });
};

export const applyTheme = () => {
  if (typeof window === 'undefined') return;

  const theme = content.theme;
  const root = document.documentElement;

  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Apply typography variables
  Object.entries(theme.typography).forEach(([key, value]) => {
    root.style.setProperty(`--typography-${key}`, String(value));
  });

  // Apply spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });

  // Apply animation variables
  Object.entries(theme.animations).forEach(([key, value]) => {
    root.style.setProperty(`--animation-${key}`, String(value));
  });
};
