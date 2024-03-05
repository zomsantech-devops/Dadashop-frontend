import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment-timezone";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertVbuckToTHB = (price: number | null, rate: number) => {
  if (price === null) {
    return 0;
  }
  const baht = (price / 100) * rate;
  return baht;
};

export const isToday = (inputDate: Date) => {
  const date = moment.utc(inputDate);
  const today = moment.utc();
  return (
    date.date() === today.date() &&
    date.month() === today.month() &&
    date.year() === today.year()
  );
};