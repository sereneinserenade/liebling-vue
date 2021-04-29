export const getImageUrlForSize = (url: string, size: string): string => {
  if (size === "xs") {
    return url.replace("/content/images/", "/content/images/size/w100/");
  }
  if (size === "s") {
    return url.replace("/content/images/", "/content/images/size/w300/");
  }
  if (size === "m") {
    return url.replace("/content/images/", "/content/images/size/w600/");
  }
  if (size === "l") {
    return url.replace("/content/images/", "/content/images/size/w1000/");
  }
  if (size === "xl") {
    return url.replace("/content/images/", "/content/images/size/w2000/");
  }

  return url;
};

export const generateSrcSet = (url: string): string => {
  const sizes = [
    getImageUrlForSize(url, "s") + " 300w",
    getImageUrlForSize(url, "m") + " 600w",
    getImageUrlForSize(url, "l") + " 1000w",
    getImageUrlForSize(url, "xl") + " 2000w",
  ];

  return sizes.join(",");
};
