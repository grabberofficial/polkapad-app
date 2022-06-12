export const shortenPolkaAddress = (address: string) => {
  if (!address || address.length === 0) return '';
  const start = address.slice(0, 3);
  const end = address.slice(address.length - 3);
  return `${start}...${end}`;
};
