const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const date = "2024/02/21";
const day = new Date(date).getDay();
console.log(weekDays[day]);
