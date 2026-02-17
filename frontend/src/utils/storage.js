const AUTH_STORAGE_KEY = "wastezero_auth_tokens";

export const getStoredAuth = () => {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null };
  }

  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return { accessToken: null, refreshToken: null };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      accessToken: parsed?.accessToken ?? null,
      refreshToken: parsed?.refreshToken ?? null,
    };
  } catch {
    return { accessToken: null, refreshToken: null };
  }
};

export const setStoredAuth = ({ accessToken, refreshToken }) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      accessToken: accessToken ?? null,
      refreshToken: refreshToken ?? null,
    }),
  );
};

export const clearStoredAuth = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
