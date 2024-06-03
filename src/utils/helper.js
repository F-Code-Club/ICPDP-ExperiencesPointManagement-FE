export const formatUserName = (firstName, lastName) => {
  return [firstName, lastName].join(" ");
};

export const VietnamesePhoneNumberRegex =
  /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

export const DateFormatS = (props) => {
  const date = new Date(props);
  // const hour = date.getUTCHours();
  // const minute = date.getUTCMinutes();
  // const second = date.getUTCSeconds();
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  const newDate = day + "/" + month + "/" + year;
  return newDate;
};

export function percentToNumber(percent = 0) {
  const roundedNumber = parseFloat(percent.toFixed(2));
  return roundedNumber;
}
