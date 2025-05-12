import { fetchGetData, fetchPostData } from "../connection/helper";

const ROUTE_NAME = {
  URL_PRODUCT: "/products",
};

export const postProductList = async () => {
  const res = await fetchPostData(
    `http://localhost:3000${ROUTE_NAME.URL_PRODUCT}/product-list`,
    {}
  );

  return res;
};

export const postProductInfo = async (params: { product_code: string }) => {
  const res = await fetchPostData(
    `http://localhost:3000${ROUTE_NAME.URL_PRODUCT}/product-information`,
    params || {}
  );

  return res;
};

export const postCreateProduct = async (params: IProductParams) => {
  const res = await fetchPostData(
    `http://localhost:3000${ROUTE_NAME.URL_PRODUCT}/create-product`,
    params || {}
  );

  return res;
};

export const postUpdateProduct = async (params: IProductParams) => {
  const res = await fetchPostData(
    `http://localhost:3000${ROUTE_NAME.URL_PRODUCT}/update-product`,
    params || {}
  );

  return res;
};

export const postDeleteProduct = async (params: { product_code: string }) => {
  const res = await fetchPostData(
    `http://localhost:3000${ROUTE_NAME.URL_PRODUCT}/delete-product`,
    params || {}
  );

  return res;
};
