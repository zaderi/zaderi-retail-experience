// API configuration for development and production
const getApiBaseUrl = (): string => {
  // In development (Vite dev server), use the local proxy
  if (import.meta.env.DEV) {
    return '';
  }

  // In production, use the deployed backend URL from environment variable
  const prodUrl = import.meta.env.VITE_API_URL;

  if (!prodUrl) {
    console.warn('VITE_API_URL is not set for production. API calls will use relative paths.');
    return '';
  }

  return prodUrl;
};

export const apiBaseUrl = getApiBaseUrl();

export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const setAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

export const fetchApi = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = `${apiBaseUrl}${endpoint}`;

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
};

export const authFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  } as Record<string, string>;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetchApi(endpoint, {
    ...options,
    headers,
  });
};
