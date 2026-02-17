export const getApiErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again.",
) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error?.message ||
    error?.message ||
    fallback
  );
};
