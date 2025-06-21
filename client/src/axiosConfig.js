import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:5000/api", // Changed https to http
});

export default axiosBase;
