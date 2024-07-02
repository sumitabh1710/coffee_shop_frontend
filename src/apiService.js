import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://3.88.231.35:5000/api/coffeeshops",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ApiService = {
  get(resource) {
    return apiClient.get(resource);
  },
  post(resource, data) {
    return apiClient.post(resource, data);
  },
  put(resource, data) {
    return apiClient.put(resource, data);
  },
  delete(resource) {
    return apiClient.delete(resource);
  },
};

export default ApiService;
