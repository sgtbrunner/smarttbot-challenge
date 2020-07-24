export const getCurrentDateTime = () => {
  const dateTimeNow = new Date();
  return `${dateTimeNow.toLocaleDateString(
    "pt-BR"
  )} at ${dateTimeNow.toLocaleTimeString("pt-BR")}`;
};

export const convertUnixToDate = (unix) => {
  return new Date(unix * 1000);
};
