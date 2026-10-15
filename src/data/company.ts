export const foundingYear = 2001;

export function getExperienceYears(year = new Date().getFullYear()): number {
  return year - foundingYear;
}
