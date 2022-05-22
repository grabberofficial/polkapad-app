export const shortenPolkaAddress = (address: string) => {
  const start = address.slice(0, 5);
  const end = address.slice(address.length - 4);
  return `${start}...${end}`;
};
