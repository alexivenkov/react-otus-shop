import { storage, TOKEN_KEY } from '@/utils/storage';

const apiUrl = 'http://19429ba06ff2.vps.myjino.ru',
  apiPath = '/api';

class API {
  protected baseUrl: string;
  protected apiPath: string;

  constructor(baseUrl: string, apiPath: string) {
    this.baseUrl = baseUrl;
    this.apiPath = apiPath;
  }

  public get = async <T>(
    endpoint: string,
    params: Record<string, string | number>,
    headers: Record<string, string> = {}
  ): Promise<T> => {
    const url = new URL(`${this.apiPath}/${endpoint}`, this.baseUrl);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key].toString()));

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  };

  public post = async <T>(
    endpoint: string,
    data: Record<string, string | number> = {},
    headers: Record<string, string> = {}
  ): Promise<T> => {
    const url = new URL(`${this.apiPath}/${endpoint}`, this.baseUrl);

    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  };
}

export const getAuthHeader = () => {
  const token = storage.get(TOKEN_KEY);

  return { authorization: `Bearer ${token}` };
};

export const api: API = new API(apiUrl, apiPath);
