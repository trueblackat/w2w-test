import axios from "axios";

const httpClient = axios.create({
  baseURL: 'https://httpbin.org/delay/1',
  timeout: 5000,
});

export default httpClient;
