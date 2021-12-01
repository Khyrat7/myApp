const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const mon = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDateLong(d) {
  const dayIndex = new Date(d).getDay();
  const dayName = days[dayIndex];
  const date = new Date(d).getDate();
  const year = new Date(d).getFullYear();
  const monthIndex = new Date(d).getMonth();
  const monthName = months[monthIndex];
  const formatted = `${dayName}, ${date} ${monthName} ${year}`;
  // console.log('Date From Module : ', formatted);
  return formatted;
}

export function formatDateShort(d) {
  const dayIndex = new Date(d).getDay();
  const dayName = days[dayIndex];
  const date = new Date(d).getDate();
  const year = new Date(d).getFullYear();
  const monthIndex = new Date(d).getMonth();
  const monthName = mon[monthIndex];
  const formatted = `${dayName}, ${date} ${monthName} ${year}`;
  // console.log('Date From Module : ', formatted);
  return formatted;
}

export function formatNormalDate(d) {
  const date = new Date(d).getDate();
  const year = new Date(d).getFullYear();
  const monthIndex = new Date(d).getMonth();
  const monthName = mon[monthIndex];
  const formatted = `${date}   ${monthName}   ${year}`;
  return formatted;
}
