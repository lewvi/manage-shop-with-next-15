"use client";

import { Layout } from "antd";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout className="h-screen">
      <Layout.Sider
        theme="dark"
        width="250px"
        // className="bg-[#F6F6F7]"
        style={{ background: "#F6F6F7" }}
        // breakpoint="lg"
        // collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        {/* <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        /> */}
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{ background: "white", borderBottom: "1px solid #dcdce2" }}
          className=" shadow-2xl"
        ></Layout.Header>
        <Layout.Content className="p-5 bg-white">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
