export const DateDisplay = () => {
  const formatDate = (date: Date): string => {
    const thaiWeekdays: string[] = [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
    ];

    const thaiMonths: string[] = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const utcDate = new Date(date.getTime() + (7 * 60 * 60 * 1000));

    const dayOfWeek: string = thaiWeekdays[utcDate.getUTCDay()];
    const day: number = utcDate.getUTCDate();
    const month: string = thaiMonths[utcDate.getUTCMonth()];
    const year: number = utcDate.getUTCFullYear() + 543;

    return `${dayOfWeek}ที่ ${day} ${month} ${year}`;
  };

  const now: Date = new Date();
  const formattedDate: string = formatDate(now);

  return <div>{formattedDate}</div>;
};
