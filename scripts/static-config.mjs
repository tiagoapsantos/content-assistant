export function normalizeBasePath(value = '/') {
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(value)) throw new Error('BASE_PATH deve começar e terminar com / e conter apenas segmentos simples.');
  return value;
}
export const contentSecurityPolicy = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'";
