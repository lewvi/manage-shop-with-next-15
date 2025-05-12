interface IProduct {
  product_code: string;
  product_name: string;
  product_price: number;
  product_status: boolean;
  product_description: string;
}

interface IProductParams {
  product_code: string;
  product_name: string;
  product_price: number;
  product_status: boolean;
  product_description?: string;
}
