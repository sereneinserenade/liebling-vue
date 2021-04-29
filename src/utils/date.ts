import {
  differenceInSeconds,
  formatDistanceToNow,
  parseISO,
  format as dateFnsFormat,
} from "date-fns";

export const getTimeDifferenceString = (date: Date): string => {
  let diff;
  if (date instanceof Date) {
    diff = getDifference(date);
  } else if (typeof date === "string") {
    diff = getDifference(parseISO(date));
  }
  if (diff && diff < 30) {
    return "now";
  } else {
    const options = {
      addSuffix: true,
      includeSeconds: false,
    };
    if (date instanceof Date) {
      return formatDistanceToNow(date, options);
    } else if (typeof date === "string") {
      return formatDistanceToNow(parseISO(date), options);
    }

    return date;
  }
};

export const getDifference = (date: Date): number => {
  return differenceInSeconds(new Date(), date);
};

export const getInterval = (date: Date): number => {
  const diff = getDifference(date);
  if (diff < 3600) {
    return 60000;
  } else if (diff >= 3600 && diff <= 86400) {
    return 3600000;
  } else {
    return 0;
  }
};

export const formatDate = (date: Date): string => {
  if (date instanceof Date) {
    return dateFnsFormat(date, "MMM dd, yyyy");
  } else if (typeof date === "string") {
    return dateFnsFormat(parseISO(date), "MMM dd, yyyy");
  }
  return date;
};
