type DateFormatterVariant = "full" | "date" | "time";

export const dateFormatter = (variant: DateFormatterVariant) => {
  let options: Intl.DateTimeFormatOptions;
  switch (variant) {
    case "date":
      options = {
        timeZone: "America/Los_Angeles",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      break;
    case "full":
      options = {
        timeZone: "America/Los_Angeles",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      break;
    case "time":
      options = {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        minute: "numeric",
      };
      break;
  }

  return new Intl.DateTimeFormat("en-US", options);
};
