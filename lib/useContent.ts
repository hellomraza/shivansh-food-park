import content from './content.json';

export const getContent = () => content;

export const interpolateText = (text: string, values: Record<string, string | number>): string => {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return String(values[key] ?? match);
  });
};
