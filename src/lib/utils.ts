export const shortenPolkaAddress = (address: string, rate = 6) => {
  if (!address || address.length === 0) return '';
  const start = address.slice(0, rate);
  const end = address.slice(address.length - rate);
  return `${start}...${end}`;
};
