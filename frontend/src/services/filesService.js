import httpService from "./httpService";
import config from "../config.json";

export function uploadFile(file) {
  return httpService.post(`${config.apiUrl}/files/upload`, file, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function destroyFile(public_id) {
  return httpService.post(`${config.apiUrl}/files/destroy`, public_id);
}

const filesService = {
  uploadFile,
  destroyFile,
};

export default filesService;
