import { createContext } from "react";
import ProductsApi from "../api/productsApi";
import UsersApi from "../api/usersApi";
import CategoriesApi from "../api/categoriesApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    productsApi: ProductsApi(),
    usersApi: UsersApi(),
    categoriesApi: CategoriesApi(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
