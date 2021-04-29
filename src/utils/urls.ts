export const getUrlSlug = (url: string): string => {
  const urlWithoutLastChar = url.slice(0, -1);
  const splittedStringArr = urlWithoutLastChar.split("/");
  return splittedStringArr[splittedStringArr.length - 1];
};

export const getFEUrlPath = (url: string): string | void => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname;
};
