import { useMutation, useQuery } from "@tanstack/react-query";
import { throwResponse } from "../connection/helper";
import { getProductList, postProductInformation } from "./api";

export const useGetProductList = () => {
  const fetchData = async () => {
    try {
      const { data } = await getProductList();

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

export const useGetProductInformation = () => {
  const fetchData = async (params: any) => {
    try {
      const { data } = await postProductInformation(params);

      return data;
    } catch (err: any) {
      throwResponse(err?.response?.data);
    }
  };

  const { data, error, mutate, mutateAsync, reset } = useMutation({
    mutationFn: (params: any) => fetchData(params),
  });

  return { data, error, mutate, mutateAsync, reset };
};
