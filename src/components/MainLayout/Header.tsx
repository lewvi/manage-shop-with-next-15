"use client";

import { BellOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Layout, Row, Typography } from "antd";
import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <Layout.Header className="p-0 z-[1000]">
      <Row className="h-full px-5">
        <Col span={12} className="flex items-center">
          <Typography.Text className="text-[28px] font-bold text-[#292929]">
            {title || ""}
          </Typography.Text>
        </Col>
        <Col span={12} className="flex items-center justify-end">
          <Flex gap={8}>
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<BellOutlined style={{ fontSize: "18px" }} />}
            />
          </Flex>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
