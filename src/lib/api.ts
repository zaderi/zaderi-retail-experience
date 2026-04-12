// API configuration for development and production
const getApiBaseUrl = (): string => {
  // In development (Vite dev server), use the local proxy
  if (import.meta.env.DEV) {
    return '';
  }

  // In production, use the deployed backend URL from environment variable
  const prodUrl = import.meta.env.VITE_API_URL;
  
  if (!prodUrl) {
    console.warn('VITE_API_URL is not set for production. API calls will fail.');
    return '';
  }

  return prodUrl;
};

export const apiBaseUrl = getApiBaseUrl();

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
