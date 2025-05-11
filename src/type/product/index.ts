interface IProduct {
  product_code: string;
  product_name: string;
  product_price: number;
  product_status: boolean;
  product_description: string;
}

interface IUpdateProductParams {
  product_code: string;
  product_name: string;
  product_price: number;
  product_status: boolean;
  product_description?: string;
}
