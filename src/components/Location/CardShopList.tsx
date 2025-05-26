import { Card, Col, Flex, Input, Row, Tag, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const CardStyle = styled(Card)`
  min-width: 100px;
  max-width: 400px;

  // box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  // height: calc(100vh-400px);

  background: rgba(246, 244, 244, 0.49);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.8px);
  -webkit-backdrop-filter: blur(10.8px);
  border: 1px solid rgba(246, 244, 244, 0.24);
`;

const CardShopList = () => {
  return (
    <CardStyle className="h-[calc(100vh-200px)] rounded-xl">
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Typography.Text ellipsis className="text-base font-semibold">
            Shop Location List
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Input placeholder="Search...." />
        </Col>
        <Col span={24}>
          <Card styles={{ body: { padding: 16 } }}>
            <Row>
              <Col span={4}></Col>
              <Col span={12}>
                <Flex vertical gap={6}>
                  <Typography.Text className="font-semibold">
                    Shop Name 001
                  </Typography.Text>
                  <Typography.Text className="text-xs">
                    {`Shop ID : N/A`}
                  </Typography.Text>
                </Flex>
              </Col>
              <Col span={8} className="flex justify-end items-start">
                <Tag color="red">ddd</Tag>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </CardStyle>
  );
};

export default CardShopList;
