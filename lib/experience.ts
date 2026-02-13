export function getYearsOfExperience(): string {
  const analyticsStartDate = new Date("2019-03-01");
  const today = new Date();

  const years = today.getFullYear() - analyticsStartDate.getFullYear();
  const monthDiff = today.getMonth() - analyticsStartDate.getMonth();
  const adjustedYears = monthDiff < 0 ? years - 1 : years;

  return `${adjustedYears}+`;
}

export function getTotalExperience(): string {
  const careerStartDate = new Date("2017-01-01");
  const today = new Date();

  const years = today.getFullYear() - careerStartDate.getFullYear();
  const monthDiff = today.getMonth() - careerStartDate.getMonth();
  const adjustedYears = monthDiff < 0 ? years - 1 : years;

  return `${adjustedYears}+`;
}
