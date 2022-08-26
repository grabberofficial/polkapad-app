export const resolvePath = (object: Record<string, any>, path?: string) =>
  path &&
  path.split('.').reduce((o, p) => {
    return o ? o[p] : undefined;
  }, object);
