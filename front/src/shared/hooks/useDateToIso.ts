export const useDateToIso = () => {
  const setDateToIso = (date: string) => {
    const selectedDate = new Date(date);
    const dateWithOffset = new Date(
      selectedDate.getTime() + 3 * 60 * 60 * 1000,
    );
    return dateWithOffset.toISOString();
  };
  return { setDateToIso };
};
