import React from "react";
import { ShopOutlined, ShoppingOutlined } from "@ant-design/icons";

const menu = [
  {
    key: "product",
    label: "Manage Product",
    path: "/product",
    icon: <ShoppingOutlined />,
  },
  {
    key: "shop",
    label: "Manage Shop",
    path: "/shop",
    icon: <ShopOutlined />,
  },
];

export default menu;
