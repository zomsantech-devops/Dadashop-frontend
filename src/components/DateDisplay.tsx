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

    const dayOfWeek: string = thaiWeekdays[date.getDay()];
    const day: number = date.getDate();
    const month: string = thaiMonths[date.getMonth()];
    const year: number = date.getFullYear() + 543;

    return `${dayOfWeek}ที่ ${day} ${month} ${year}`;
  };

  const now: Date = new Date();
  const formattedDate: string = formatDate(now);

  return <div>{formattedDate}</div>;
};
