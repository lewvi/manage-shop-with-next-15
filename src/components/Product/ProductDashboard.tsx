"use client";

import { Col, Progress, Row, Tag, Typography } from "antd";
import React from "react";
import { formatNumberDigit } from "@/utils/formatNumberDigit";
import CustomCard from "../Common/Card/CustomCard";
import { RiseOutlined } from "@ant-design/icons";
import { getStatusColor } from "@/utils/getStatusColor";

const data = {
  product_count: 50,
  product_active: 30,
  product_inactive: 20,
};

const ProductActiveAndInactive = () => {
  return (
    <CustomCard isShadow={false} className="h-full">
      <Row>
        <Col span={24}>
          <Typography.Text>Product Active</Typography.Text>
          <Progress
            percent={data?.product_active}
            showInfo={false}
            strokeColor={getStatusColor("active")}
          />
          <div className="flex justify-between items-center">
            <Typography.Text className="text-xs text-accent-content">
              Total
            </Typography.Text>
            <Typography.Text className="text-xs text-accent-content">
              {`${data?.product_active ?? 0}/${data?.product_count ?? 0}`}
            </Typography.Text>
          </div>
        </Col>
        <Col span={24}>
          <Typography.Text>Product Inactive</Typography.Text>
          <Progress
            percent={data?.product_inactive}
            showInfo={false}
            strokeColor={getStatusColor("inactive")}
          />
          <div className="flex justify-between items-center">
            <Typography.Text className="text-xs text-accent-content">
              Total
            </Typography.Text>
            <Typography.Text className="text-xs text-accent-content">
              {`${data?.product_inactive ?? 0}/${data?.product_count ?? 0}`}
            </Typography.Text>
          </div>
        </Col>
      </Row>
    </CustomCard>
  );
};

const ProductCount = () => {
  return (
    <CustomCard isShadow={false} className="h-full">
      <Row align="middle">
        <Col span={8} className="flex items-center">
          {/* <div className="bg-[#EBF3E8] rounded-lg p-4">
            <RiseOutlined className="text-[25px]" />
          </div> */}
        </Col>
        <Col span={16}>
          <Typography.Text className="font-semibold text-red-brown">
            Product Count
          </Typography.Text>
          <br />
          <Typography.Text className="text-[40px] font-semibold">
            {formatNumberDigit(data?.product_count ?? 0, 0)}
          </Typography.Text>
          <br />
          <Typography.Text className="text-xs text-accent-content">
            Products
          </Typography.Text>
        </Col>
      </Row>
    </CustomCard>
  );
};

const ProductDashboard = () => {
  return (
    <Row gutter={[12, 12]}>
      <Col xl={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
        <ProductCount />
      </Col>
      <Col xl={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
        <ProductActiveAndInactive />
      </Col>
      <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <CustomCard isShadow={false} className="h-full"></CustomCard>
      </Col>
    </Row>
  );
};

export default ProductDashboard;
