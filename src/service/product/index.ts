import { useMutation, useQuery } from "@tanstack/react-query";
import { throwResponse } from "../connection/helper";
import {
  getProductCount,
  getProductTopPrice,
  postCreateProduct,
  postDeleteProduct,
  postProductInfo,
  postProductList,
  postUpdateProduct,
} from "./api";

export const useProductList = () => {
  const fetchData = async (): Promise<IProduct[] | undefined> => {
    try {
      const { data } = await postProductList();

      return data;
    } catch (err: any) {
      throwResponse(err?.response?.data);
    }
  };

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["getProductList"],
    queryFn: () => fetchData(),
  });

  return { data, loading: isLoading || isFetching, error: isError, refetch };
};

export const useProductInformation = () => {
  const fetchData = async (params: {
    product_code: string;
  }): Promise<IProduct | undefined> => {
    try {
      const { data } = await postProductInfo(params);

      return data;
    } catch (err: any) {
      throwResponse(err?.response?.data);
    }
  };

  const { data, error, mutate, mutateAsync, reset } = useMutation({
    mutationFn: (params: { product_code: string }) => fetchData(params),
  });

  return { data, error, mutate, mutateAsync, reset };
};

export const useCreateProduct = () => {
  const fetchData = async (params: IProductParams) => {
    try {
      const { data } = await postCreateProduct(params);

      return data;
    } catch (err: any) {
      throwResponse(err?.response?.data);
    }
  };

  const { data, error, mutate, mutateAsync, reset } = useMutation({
    mutationFn: (params: IProductParams) => fetchData(params),
  });

  return { data, error, mutate, mutateAsync, reset };
};

export const useUpdateProduct = () => {
  const fetchData = async (params: IProductParams) => {
    try {
      const { data } = await postUpdateProduct(params);

      return data;
    } catch (err: any) {
      throwResponse(err?.response?.data);
    }
  };

  const { data, error, mutate, mutateAsync, reset } = useMutation({
    mutationFn: (params: IProductParams) => fetchData(params),
  });

  return { data, error, mutate, mutateAsync, reset };
};

export const useDeleteProduct = () => {
  const fetchData = async (params: {
    product_code: string;
  }): Promise<IProduct | undefined> => {
    try {
      const { data } = await postDeleteProduct(params);

      return data;
    } catch (err: any) {
      throwResponse(err?.response?.data);
    }
  };

  const { data, error, mutate, mutateAsync, reset } = useMutation({
    mutationFn: (params: { product_code: string }) => fetchData(params),
  });

  return { data, error, mutate, mutateAsync, reset };
};

export const useProductCount = () => {
  const fetchData = async (): Promise<IProductCount | undefined> => {
    try {
      const { data } = await getProductCount();

      return data;
    } catch (err: any) {
      throwResponse(err?.response?.data);
    }
  };

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["getProductCount"],
    queryFn: () => fetchData(),
  });

  return { data, loading: isLoading || isFetching, error: isError, refetch };
};

export const useProductTopPrice = () => {
  const fetchData = async (): Promise<IProduct[] | undefined> => {
    try {
      const { data } = await getProductTopPrice();

      return data;
    } catch (err: any) {
      throwResponse(err?.response?.data);
    }
  };

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["getProductTopPrice"],
    queryFn: () => fetchData(),
  });

  return { data, loading: isLoading || isFetching, error: isError, refetch };
};
