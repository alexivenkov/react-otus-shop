import { storage, TOKEN_KEY } from '@/utils/storage';
import { APIError, NotFoundError, ServerError } from '@/utils/api/errors';
import { StatusCodes } from 'http-status-codes';

export const apiUrl = 'http://19429ba06ff2.vps.myjino.ru',
  apiPath = '/api';

class API {
  private readonly baseUrl: string;
  private readonly apiPath: string;

  constructor(baseUrl: string, apiPath: string) {
    this.baseUrl = baseUrl;
    this.apiPath = apiPath;
  }

  private getFullUrl(endpoint: string, params?: Record<string, string | number>): URL {
    const url = new URL(`${this.apiPath}/${endpoint}`, this.baseUrl);
    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key].toString()));
    }
    return url;
  }

  private async performRequest<T>(
    method: string,
    endpoint: string,
    data?: Record<string, string | number>,
    customHeaders?: Record<string, string>,
    url?: URL
  ): Promise<T> {
    const requestUrl = url || this.getFullUrl(endpoint);

    const headers = new Headers({
      'Content-Type': 'application/json',
      ...customHeaders,
    });

    try {
      const response = await fetch(requestUrl.toString(), {
        method,
        headers,
        body: method !== 'GET' && data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        if (response.status == StatusCodes.NOT_FOUND) {
          throw new NotFoundError('not found');
        }

        if (response.status >= 500) {
          throw new ServerError(response.status, 'server error');
        }

        const error = (await response.json()) as ServerError;
        console.error(`API ${method} Error:`, error);
        throw new APIError(response.status, error);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error(`API ${method} Error:`, error);
      throw error;
    }
  }

  public get<T>(
    endpoint: string,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = this.getFullUrl(endpoint, params);
    return this.performRequest('GET', endpoint, undefined, headers, url);
  }

  public post<T>(
    endpoint: string,
    data?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.performRequest('POST', endpoint, data, headers);
  }

  public put<T>(
    endpoint: string,
    data?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.performRequest('PUT', endpoint, data, headers);
  }

  public delete<T>(
    endpoint: string,
    data?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.performRequest('DELETE', endpoint, data, headers);
  }
}

export const getAuthHeader = () => {
  const token = storage.get(TOKEN_KEY);

  return { authorization: `Bearer ${token}` };
};

export const api: API = new API(apiUrl, apiPath);
