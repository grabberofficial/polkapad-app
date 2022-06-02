export const shortenPolkaAddress = (address: string) => {
  if (!address || address.length === 0) return '';
  const start = address.slice(0, 5);
  const end = address.slice(address.length - 4);
  return `${start}...${end}`;
};
