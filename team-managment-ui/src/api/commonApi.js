const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createImagePath = (imagePath) => {
  const response = `${API_BASE_URL}/${imagePath}`;

  return response;
};


export function calculateEmploymentLength(startDate) {
  const employmentStartDate = new Date(startDate);
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - employmentStartDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - employmentStartDate.getMonth();

  let employmentLength = '';

  if (yearsDiff > 0) {
    employmentLength += `${yearsDiff} year${yearsDiff > 1 ? 's' : ''}`;
  }

  if (monthsDiff > 0) {
    employmentLength += `${employmentLength ? ' ' : ''}${monthsDiff} month${monthsDiff > 1 ? 's' : ''}`;
  }

  return employmentLength || 'No employment length data available';
}