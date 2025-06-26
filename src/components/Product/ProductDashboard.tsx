"use client";

import { Col, Empty, Flex, Row, Typography } from "antd";
import React, { useEffect, useMemo } from "react";
import CustomCard from "../Common/Card/CustomCard";
import { BarChartOutlined } from "@ant-design/icons";
import {
  useProductCount,
  useProductList,
  useProductTopPrice,
} from "@/service/product";
import ColumnChart from "../Common/ApexCharts/ColumnChart";
import PieCharts from "../Common/ApexCharts/PieCharts";
import { getStatusColor } from "@/utils/getStatusColor";
import RadialBarCharts from "../Common/ApexCharts/RadialBarCharts";

const colors = ["#444444", "#333333", "#222222", "#111111", "#000000"];

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
        <CustomCard className="h-full">
          <Row>
            <Col span={24}>
              <Typography.Text className="font-semibold text-base">
                Product Total
              </Typography.Text>
            </Col>
            <Col span={24}>
              <RadialBarCharts
                series={[queryCount.data?.count ?? 0]}
                labels={["Total"]}
                height={300}
              />
            </Col>
          </Row>
        </CustomCard>
      </Col>
      <Col xl={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
        <CustomCard className="h-full">
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Typography.Text className="font-semibold text-base">
                Product Status Count
              </Typography.Text>
            </Col>
            <Col span={24} className="flex justify-center">
              {(queryCount.data?.count ?? 0) > 0 ? (
                <PieCharts
                  series={[
                    queryCount.data?.active ?? 0,
                    queryCount.data?.inactive ?? 0,
                  ]}
                  height={200}
                  labels={["Active", "InActive"]}
                  color={[
                    getStatusColor("active") || "",
                    getStatusColor("inactive") || "",
                  ]}
                />
              ) : (
                <div className="h-[200px] flex items-center justify-center">
                  <Empty />
                </div>
              )}
            </Col>
            <Col span={24} className="flex items-center justify-center">
              <Flex gap={12} className="flex items-center mr-5">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: getStatusColor("active"),
                    borderRadius: "50%",
                  }}
                />
                <Typography.Text className="font-semibold">
                  {`Active : ${queryCount.data?.active ?? 0}`}
                </Typography.Text>
              </Flex>
              <Flex gap={12} className="flex items-center">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: getStatusColor("inactive"),
                    borderRadius: "50%",
                  }}
                />
                <Typography.Text className="font-semibold">
                  {`Inactive : ${queryCount.data?.inactive ?? 0}`}
                </Typography.Text>
              </Flex>
            </Col>
          </Row>
        </CustomCard>
      </Col>
      <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <CustomCard className="h-full" styles={{ body: { padding: 14 } }}>
          <Row>
            <Col span={24}>
              <Flex gap={8} className="flex items-center">
                <BarChartOutlined className="text-[16px]" />
                <Typography.Text className="font-semibold text-base">
                  Product Top Price
                </Typography.Text>
              </Flex>
            </Col>
            <Col span={24}>
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
            </Col>
          </Row>
        </CustomCard>
      </Col>
    </Row>
  );
};

export default ProductDashboard;
