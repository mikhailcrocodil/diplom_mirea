export const useFormatHours = () => {
  function formatHours(hours: number) {
    const lastDigit = hours % 10;
    const preLastDigit = Math.floor((hours % 100) / 10);

    if (lastDigit === 1 && preLastDigit !== 1) {
      return `${hours} час`;
    } else if (lastDigit >= 2 && lastDigit <= 4 && preLastDigit !== 1) {
      return `${hours} часа`;
    } else {
      return `${hours} часов`;
    }
  }

  return { formatHours };
};
