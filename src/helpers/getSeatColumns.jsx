export const getSeatColumns = (seats) => {
  const seatsColumns = [];

  for (let i = 0; i < seats.length; i += 2) {
    seatsColumns.push(seats.slice(i, i + 2));
  }

  return seatsColumns;
};
