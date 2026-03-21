export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getDefaultDates = () => {
  const start = new Date().toISOString().split("T")[0];
  const end = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  return { start, end };
};
