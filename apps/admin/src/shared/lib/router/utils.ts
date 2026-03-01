export const buildQueryParams = (fullPath: string, params: { [x: string]: any }): string => {
  let pathname = fullPath.split('').find((char) => char == '?') ? fullPath : `${fullPath}?`;

  const routeSeg = pathname.split('?').at(0);
  let paramsSeg = pathname.split('?').at(1)?.split('&') ?? [''];

  for (const [key, value] of Object.entries(params)) {
    const p = paramsSeg?.findIndex((val) => val == key);

    if (p >= 0) {
      paramsSeg[p] = value;
    } else {
      paramsSeg?.push('&');
      paramsSeg?.push(key);
      paramsSeg?.push('=');
      paramsSeg?.push(value);
    }
  }

  return `${routeSeg}?${paramsSeg.join('')}`;
};
