import React from "react";
import {
  EnvironmentOutlined,
  ShopOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

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
  {
    key: "overview",
    label: "Overview",
    path: "/overview",
    icon: <EnvironmentOutlined />,
  },
];

export default menu;
