import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status > 404) {
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

export function setDefaultCommonHeaders(header, value) {
  axios.defaults.headers.common[header] = value;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setDefaultCommonHeaders,
};

export default httpService;
