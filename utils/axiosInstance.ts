import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://formsappserver.onrender.com"
      : "http://localhost:5000",
});

export default instance;
