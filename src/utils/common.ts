export const resolvePath = (object: Record<string, any>, path?: string) =>
  path &&
  path.split('.').reduce((o, p) => {
    return o ? o[p] : undefined;
  }, object);

export function callOnDocumentReady(callback: () => unknown) {
  return new Promise((resolve): void => {
    if (document.readyState === 'complete') {
      resolve(callback());
    } else {
      window.addEventListener('load', () => resolve(callback()));
    }
  });
}
