const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const startKeepAlive = () => {
  if (!import.meta.env.VITE_API_URL) return;

  setInterval(
    async () => {
      try {
        await fetch(`${BACKEND_URL}/health`);
        console.log("Keep alive ping silent");
      } catch {}
    },
    14 * 60 * 1000,
  );
};
