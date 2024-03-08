import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-timezone";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const getTitle = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/setting/content/title`
    );
    return response.data.data.content;
  } catch (error: any) {
    console.error(error.response);
  }
};
