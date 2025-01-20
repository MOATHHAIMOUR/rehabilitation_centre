import DateObject from "react-date-object";

// Function to calculate the number of days in a given month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

// Function to convert English numbers to Arabic numbers
const toArabicNumbers = (number: number): string => {
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  return number
    .toString()
    .split("")
    .map((digit) => arabicDigits[parseInt(digit, 10)])
    .join("");
};

// Main function to calculate age and return it in Arabic format
export const getAgeInArabic = (birthDate: DateObject): string => {
  const today = new DateObject();
  const birth = new DateObject(birthDate);

  let years = today.year - birth.year;
  let months = today.month.index - birth.month.index;
  let days = today.day - birth.day;

  // Adjust for negative months
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Adjust for negative days
  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = getDaysInMonth(birth.year, birth.month.index);
    days += daysInPrevMonth;
  }

  // Format the result in Arabic
  return `العمر: ${toArabicNumbers(years)} سنة، ${toArabicNumbers(
    months
  )} شهر، و ${toArabicNumbers(days)} يوم`;
};

export function setLocalStorageValue<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage key ", key, error);
  }
}

export function findOption<T>(
  options: { label: string; value: T }[] | undefined,
  valueToFind: T | undefined
): { label: string; value: T } | null {
  if (!options || !valueToFind) {
    return null; // Return null if options or valueToFind is undefined
  }

  return options.find((option) => option.value === valueToFind) || null;
}
