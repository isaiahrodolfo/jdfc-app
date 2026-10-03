type DateFormatterVariant = "full" | "date";

export const dateFormatter = (variant: DateFormatterVariant) => {
  const options: Intl.DateTimeFormatOptions =
    variant === "date"
      ? {
          timeZone: "America/Los_Angeles",
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      : {
          timeZone: "America/Los_Angeles",
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        };

  return new Intl.DateTimeFormat("en-US", options);
};
