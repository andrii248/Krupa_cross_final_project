import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const fetchTrips = async () => {
  const response = await api.get("/posts?_limit=10");
  return response.data;
};
