"use client";

import ProductDashboard from "@/components/Product/ProductDashboard";
import ProductTable from "@/components/Product/ProductTable";
import { Col, Row } from "antd";

const Page = () => {
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <ProductDashboard />
      </Col>
      <Col span={24}>
        <ProductTable />
      </Col>
    </Row>
  );
};

export default Page;
