interface IProduct {
  product_code: string;
  product_name: string;
  product_price: number;
  product_status: boolean;
  product_description: string;
  update_at?: string;
}

interface IProductParams {
  product_code: string;
  product_name: string;
  product_price: number;
  product_status: boolean;
  product_description?: string;
}

interface IProductCount {
  count: number;
  active: number;
  inactive: number;
}
