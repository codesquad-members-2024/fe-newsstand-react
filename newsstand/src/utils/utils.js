export const reloadPage = () => {
  location.reload();
};

export const getCurrentDate = () => {
  const date = new Date();
  const weekDay = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = weekDay[date.getDay()];
  return `${date.toLocaleDateString()} ${dayName}요일`;
};

export const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};
