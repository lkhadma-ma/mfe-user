// httpFetch.ts
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface HttpOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string | number>;
}

export async function httpFetch<T>(url: string, options: HttpOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, queryParams } = options;

  // Build query string if provided
  const queryString = queryParams
    ? '?' + new URLSearchParams(queryParams as Record<string, string>).toString()
    : '';

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body && method !== 'GET' ? JSON.stringify(body) : undefined
  };

  const response = await fetch(url + queryString, fetchOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
  }

  // Try to parse JSON, fallback to text
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json() as Promise<T>;
  } else {
    return response.text() as unknown as T;
  }
}
