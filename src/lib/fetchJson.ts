import { ExceptionTypeEnum } from './constants';

export default async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
  token?: string,
): Promise<JSON> {
  const headers = token
    ? new Headers({
        Authorization: token,
        'Content-Type': 'application/json',
      })
    : new Headers({
        'Content-Type': 'application/json',
      });

  const response = await fetch(input, {
    ...init,
    headers: headers,
  });

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line

  let data;
  try {
    data = await response.json();
    // eslint-disable-next-line no-empty
  } catch {}
  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
    code: number;
    type: ExceptionTypeEnum;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
      code: number;
      type: ExceptionTypeEnum;
    };
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response;
    this.data = data ?? { message: message };
  }
}
