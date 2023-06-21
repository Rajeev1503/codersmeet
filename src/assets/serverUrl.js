const serverUrl =
  process.env.NODE_ENV === "development"
    ? "https://codersmeetbackend.vercel.app"
    : "https://codersmeetbackend.vercel.app";

    export default serverUrl;