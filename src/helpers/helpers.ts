const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const getColorFromString = (str: string) => {
  const hash = hashString(str);
  const color = `#${((hash & 0xffffff) | 0x1000000).toString(16).substring(1)}`;
  return color;
};

export const capitaliseFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
