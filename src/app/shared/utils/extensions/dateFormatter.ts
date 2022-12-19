export const getDateFormat = (inputDate: string | Date) => {
  let date: Date;

  if (typeof inputDate === 'string') {
    date = new Date(inputDate);
  } else {
    date = inputDate;
  }

  const yyyy = String(date.getFullYear()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}
