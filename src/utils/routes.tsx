import React from "react";
import { ShopOutlined, ShoppingOutlined } from "@ant-design/icons";

const menu = [
  {
    key: "product",
    label: "Product",
    path: "/product",
    icon: <ShoppingOutlined />,
  },
  {
    key: "shop",
    label: "Shop",
    path: "/shop",
    icon: <ShopOutlined />,
  },
];

export default menu;
