import { Col, Row, Typography } from "antd";
import React from "react";
import { formatNumberDigit } from "@/utils/formatNumberDigit";
import CustomCard from "../Common/Card/CustomCard";
import { RiseOutlined } from "@ant-design/icons";

const ProductCount = () => {
  return (
    <CustomCard isShadow={false}>
      <Row>
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
            {formatNumberDigit(0, 0)}
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
        <ProductCount />
      </Col>
      <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <ProductCount />
      </Col>
    </Row>
  );
};

export default ProductDashboard;
