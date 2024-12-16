import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function toDateTimeFormat(
  date?: Date | string | number | null,
  toFormat: string = "DD/MM/YYYY HH:mm:ss",
  dateFormat?: string,
  fallback: string = "-"
): string {
  const day = dayjs(date, dateFormat);
  if (!day.isValid()) {
    return fallback;
  }

  return day.format(toFormat);
}

export function toDateFormat(
  date?: Date | string | number | null,
  toFormat: string = "DD/MM/YYYY",
  dateFormat?: string,
  fallback: string = "-"
): string {
  return toDateTimeFormat(date, toFormat, dateFormat, fallback);
}

export function parseDate(
  dateStr: dayjs.ConfigType,
  format?: dayjs.OptionType
): Date | undefined {
  const date = dayjs(dateStr, format);
  return date.isValid() ? date.toDate() : undefined;
}

export function isDate(value: any): value is dayjs.Dayjs {
  return dayjs(value).isValid();
}
