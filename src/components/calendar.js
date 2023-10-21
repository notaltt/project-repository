import dayjs from "dayjs";

export const generateDate = (month, year) => {
  // Set default values for month and year if not provided
  const currentMonth = month || dayjs().month();
  const currentYear = year || dayjs().year();

  const firstDateOfMonth = dayjs().year(currentYear).month(currentMonth).startOf("month");
  const lastDateOfMonth = dayjs().year(currentYear).month(currentMonth).endOf("month");

  const arrayOfDate = [];

  // Create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push(null); // Push null or an empty representation for empty days
  }

  // Generate current date
  for (let i = 1; i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push(firstDateOfMonth.date(i).format("YYYY-MM-DD")); // Use the format method
  }

  const remaining = 42 - arrayOfDate.length;

  // Fill remaining days with empty representations
  for (let i = 0; i < remaining; i++) {
    arrayOfDate.push(null);
  }

  return arrayOfDate;
};
