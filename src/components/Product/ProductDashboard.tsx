"use client";

import { Col, Progress, Row, Tag, Typography } from "antd";
import React, { useEffect, useMemo } from "react";
import { formatNumberDigit } from "@/utils/formatNumberDigit";
import CustomCard from "../Common/Card/CustomCard";
import { BarChartOutlined, RiseOutlined } from "@ant-design/icons";
import { getStatusColor } from "@/utils/getStatusColor";
import {
  useProductCount,
  useProductList,
  useProductTopPrice,
} from "@/service/product";
import ColumnChart from "../Common/ApexCharts/ColumnChart";

const colors = ["#444444", "#333333", "#222222", "#111111", "#000000"];

const ProductActiveAndInactive = ({ data }: { data?: IProductCount }) => {
  return (
    <CustomCard isShadow={false} className="h-full">
      {/* <Row>
        <Col span={24}>
          <Typography.Text>Product Active</Typography.Text>
          <Progress
            percent={data?.active}
            showInfo={false}
            strokeColor={getStatusColor("active")}
          />
          <div className="flex justify-between items-center">
            <Typography.Text className="text-xs text-accent-content">
              Total
            </Typography.Text>
            <Typography.Text className="text-xs text-accent-content">
              {`${data?.active ?? 0}/${data?.count ?? 0}`}
            </Typography.Text>
          </div>
        </Col>
        <Col span={24}>
          <Typography.Text>Product Inactive</Typography.Text>
          <Progress
            percent={data?.inactive}
            showInfo={false}
            strokeColor={getStatusColor("inactive")}
          />
          <div className="flex justify-between items-center">
            <Typography.Text className="text-xs text-accent-content">
              Total
            </Typography.Text>
            <Typography.Text className="text-xs text-accent-content">
              {`${data?.inactive ?? 0}/${data?.count ?? 0}`}
            </Typography.Text>
          </div>
        </Col>
      </Row> */}
    </CustomCard>
  );
};

const ProductCount = ({ count }: { count: number }) => {
  return (
    <CustomCard isShadow={false} className="h-full">
      {/* <Row align="middle">
        <Col span={8} className="flex items-center"></Col>
        <Col span={16}>
          <Typography.Text className="font-semibold text-red-brown">
            Product Count
          </Typography.Text>
          <br />
          <Typography.Text className="text-[40px] font-semibold">
            {formatNumberDigit(count ?? 0, 0)}
          </Typography.Text>
          <br />
          <Typography.Text className="text-xs text-accent-content">
            Products
          </Typography.Text>
        </Col>
      </Row> */}
    </CustomCard>
  );
};

const ProductDashboard = () => {
  const queryCount = useProductCount();
  const queryProductTop = useProductTopPrice();
  const queryProductList = useProductList();

  const series = useMemo(() => {
    return queryProductTop.data?.map((item, i) => {
      return {
        x: item?.product_name,
        y: item?.product_price ?? 0,

        fillColor: colors[i],
      };
    });
  }, [queryProductTop.data]);

  useEffect(() => {
    queryCount.refetch();
    queryProductTop.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryProductList.data]);

  return (
    <Row gutter={[12, 12]}>
      <Col xl={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
        <ProductCount count={queryCount.data?.count ?? 0} />
      </Col>
      <Col xl={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
        <ProductActiveAndInactive data={queryCount.data} />
      </Col>
      <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <CustomCard className="h-full" styles={{ body: { padding: 14 } }}>
          <p className="font-semibold text-base px-3 flex items-center">
            <BarChartOutlined className="mr-2" />
            Product Top Price
          </p>
          <ColumnChart
            height={250}
            categories={[]}
            series={[
              {
                name: "Product Price",
                data: series,
              },
            ]}
          />
        </CustomCard>
      </Col>
    </Row>
  );
};

export default ProductDashboard;
