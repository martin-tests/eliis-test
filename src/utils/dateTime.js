// get YYYY-MM-DD date string from YYYY-MM-DD or ISO date-time string
export const getDateString = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// get '' from YYYY-MM-DD or HH:MM time string from ISO date-time string
export const getTimeString = (dateStr) => {
  if (dateStr.indexOf('T') === -1) {
    return '';
  }
  const date = new Date(dateStr);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// get ISO date-time string from YYYY-MM-DD and HH:MM time string or only YYYY-MM-DD date string if time string is empty
export const getDateSaveStr = (dateStr, timeStr) => { 
  if (timeStr === '') {
    return dateStr;
  }
  return new Date(dateStr + ' ' + timeStr).toISOString();
}