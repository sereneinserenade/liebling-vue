/* eslint-disable @typescript-eslint/no-explicit-any */
export const get = async (url: RequestInfo): Promise<any> => {
  const res = await fetch(url);
  const parsedJson = await res.json();

  return parsedJson;
};
