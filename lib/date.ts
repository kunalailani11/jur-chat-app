import { DateTime } from 'luxon';

export type DateTypes = Date | string | DateTime;

export function toDateTime(date: DateTypes): DateTime {
  if (DateTime.isDateTime(date)) {
    return date;
  } else if (date instanceof Date) {
    return DateTime.fromJSDate(date);
  } else {
    return DateTime.fromISO(date);
  }
}

export function isToday(date: DateTypes): boolean {
  return DateTime.now().hasSame(toDateTime(date), 'day');
}
