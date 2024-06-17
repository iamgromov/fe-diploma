export const getPrice = (index, coach, isWifiIncluded, isLinensIncluded) => {
  const isSideSeat = index > 32;
  const isTopSeat = index % 2 === 0;

  const wifiPrice = coach.have_wifi && isWifiIncluded ? coach.wifi_price : 0;
  const linensPrice = coach.is_linens_included
    ? 0
    : isLinensIncluded
    ? coach.linens_price
    : 0;

  const price =
    coach.class_type === "fourth" || coach.class_type === "first"
      ? coach.price
      : coach.class_type === "third" && isSideSeat
      ? coach.side_price
      : isTopSeat
      ? coach.top_price
      : coach.bottom_price;

  return price + wifiPrice + linensPrice;
};
