const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://codersmeetbackend.vercel.app";

    export default serverUrl;