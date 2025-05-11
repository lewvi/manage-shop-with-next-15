"use client";

import { Layout } from "antd";
import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [titleLabel, setTitleLabel] = useState<string>("");

  const onGetTitleLabel = (e: string) => {
    setTitleLabel(e);
  };

  return (
    <Layout>
      <Sidebar onGetTitleLabel={onGetTitleLabel} />
      <Layout>
        <Layout.Content style={{ minHeight: "100vh" }}>
          <Header title={titleLabel} />
          <div className="p-5">{children}</div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
