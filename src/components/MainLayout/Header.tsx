"use client";

import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Col, Grid, Layout, Row, Typography } from "antd";
import React from "react";

interface HeaderProps {
  title: string;
  onToggleMenu: () => void;
}

const Header = ({ title, onToggleMenu }: HeaderProps) => {
  const { xl } = Grid.useBreakpoint();

  return (
    <Layout.Header className="p-0 z-[1000]">
      <Row className="h-full px-5">
        <Col span={16} className="flex items-center">
          {!xl ? (
            <Button
              shape="circle"
              size="large"
              className="mr-5"
              icon={<MenuOutlined />}
              onClick={onToggleMenu}
            />
          ) : null}

          <Typography.Text
            ellipsis
            className="text-[28px] font-bold text-[#292929]"
          >
            {title || ""}
          </Typography.Text>
        </Col>
        <Col span={8} className="flex items-center justify-end">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<BellOutlined style={{ fontSize: "18px" }} />}
          />
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
