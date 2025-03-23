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

export const choicesData: { [key: number]: string } = {
  0: "الخيار الأول",
  1: "الخيار الثاني",
  2: "الخيار الثالث",
  3: "الخيار الرابع",
  4: "الخيار الخامس",
  5: "الخيار السادس",
  6: "الخيار السابع",
  7: "الخيار الثامن",
  8: "الخيار التاسع",
  9: "الخيار العاشر",
  10: "الخيار الحادي عشر",
  11: "الخيار الثاني عشر",
  12: "الخيار الثالث عشر",
  13: "الخيار الرابع عشر",
  14: "الخيار الخامس عشر",
  15: "الخيار السادس عشر",
  16: "الخيار السابع عشر",
  17: "الخيار الثامن عشر",
  18: "الخيار التاسع عشر",
  19: "الخيار العشرون",
  20: "الخيار الحادي والعشرون",
  21: "الخيار الثاني والعشرون",
  22: "الخيار الثالث والعشرون",
  23: "الخيار الرابع والعشرون",
  24: "الخيار الخامس والعشرون",
  25: "الخيار السادس والعشرون",
  26: "الخيار السابع والعشرون",
  27: "الخيار الثامن والعشرون",
  28: "الخيار التاسع والعشرون",
  29: "الخيار الثلاثون",
};

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue || null;
  }
  return null;
}

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
