export const getApiErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again.",
) => {
  if (error?.code === "ERR_NETWORK") {
    return "Network error: backend is not reachable. Start backend server and check VITE_API_BASE_URL.";
  }

  return (
    error?.response?.data?.message ||
    error?.response?.data?.error?.message ||
    error?.message ||
    fallback
  );
};
