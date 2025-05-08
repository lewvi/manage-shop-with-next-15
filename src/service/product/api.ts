import { fetchGetData, fetchPostData } from "../connection/helper";

const ROUTE_NAME = {
  URL_PRODUCT: "/products",
};

export const getProductList = async () => {
  const res = await fetchGetData(`${ROUTE_NAME.URL_PRODUCT}/product-list`, {});

  return res;
};

export const postProductInformation = async (params: any) => {
  const res = await fetchPostData(
    `${ROUTE_NAME.URL_PRODUCT}/product-information`,
    params || {}
  );

  return res;
};
