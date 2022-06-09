import httpService from "./httpService";
import config from "../config.json";

export function getProducts(page, category, sort, search) {
  return httpService.get(
    `${config.apiUrl}/products?limit=${
      page * 8
    }&${category}&${sort}&title[regex]=${search}`
  );
}

export function createProduct(product, image) {
  return httpService.post(`${config.apiUrl}/products`, { ...product, image });
}

export function editProduct(id, product, image) {
  return httpService.put(`${config.apiUrl}/products/${id}`, {
    ...product,
    image,
  });
}

export function removeProduct(id) {
  return httpService.delete(`${config.apiUrl}/products/${id}`);
}

const productsService = {
  getProducts,
  createProduct,
  editProduct,
  removeProduct,
};

export default productsService;
