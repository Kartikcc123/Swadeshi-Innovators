const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || '';

export const apiUrl = (path) => `${configuredApiBaseUrl.replace(/\/$/, '')}${path}`;
