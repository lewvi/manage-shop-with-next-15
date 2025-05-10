"use client";

import { Layout, Typography } from "antd";
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout className="h-screen">
      <Sidebar />
      <Layout>
        <Header />
        <Layout.Content className="p-5">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
