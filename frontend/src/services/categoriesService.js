import httpService from "./httpService";
import config from "../config.json";

export function getCategories() {
  return httpService.get(`${config.apiUrl}/categories`);
}

export function createCategory(category) {
  return httpService.post(`${config.apiUrl}/categories`, { name: category });
}

export function editCategory(id, category) {
  return httpService.put(`${config.apiUrl}/categories/${id}`, {
    name: category,
  });
}

export function removeCategory(id) {
  return httpService.delete(`${config.apiUrl}/categories/${id}`);
}

const categoriesService = {
  getCategories,
  createCategory,
  editCategory,
  removeCategory,
};

export default categoriesService;
