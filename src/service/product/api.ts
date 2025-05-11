import { fetchGetData, fetchPostData } from "../connection/helper";

const ROUTE_NAME = {
  URL_PRODUCT: "/products",
};

export const getProductList = async () => {
  const res = await fetchGetData(
    `http://localhost:3000${ROUTE_NAME.URL_PRODUCT}/product-list`,
    {}
  );

  return res;
};

export const postProductInformation = async (params: any) => {
  const res = await fetchPostData(
    `http://localhost:3000${ROUTE_NAME.URL_PRODUCT}/product-information`,
    params || {}
  );

  return res;
};

export const postUpdateProduct = async (params: IUpdateProductParams) => {
  const res = await fetchPostData(
    `http://localhost:3000${ROUTE_NAME.URL_PRODUCT}/update-product`,
    params || {}
  );

  return res;
};
