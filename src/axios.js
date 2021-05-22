import axios from "axios";
import environment from "./environment";

const axiosInstance = axios.create({
  baseURL:
    environment.NODE_ENV === "production"
      ? ""
      : "http://traumacheck-api.b1nary.co/",
});

export default axiosInstance;
