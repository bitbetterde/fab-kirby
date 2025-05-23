export const truncateStringAtWhitespace = (
  str: string,
  lim: number,
  ending = "...",
) => {
  if (str.length <= lim) return str;
  const lastSpace = str.slice(0, lim - ending.length + 1).lastIndexOf(" ");
  return str.slice(0, lastSpace > 0 ? lastSpace : lim - ending.length) + ending;
};
