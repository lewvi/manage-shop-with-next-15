"use client";

import ButtonUpdateData from "@/components/Common/Button/ButtonUpdateData";
import CustomCard from "@/components/Common/Card/CustomCard";
import { ShopOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Switch,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useMemo, useState } from "react";

const colLayout = {
  xl: { span: 24 },
  md: { span: 24 },
  xs: { span: 24 },
};
interface DrawerFormShopProp {
  open: boolean;
  onClose: () => void;
}

const DrawerFormShop = (props: DrawerFormShopProp) => {
  const { open, onClose } = props;

  const onToggleDrawer = () => {
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onToggleDrawer}
      title="Create Shop"
      width="50vw"
      maskClosable={false}
      footer={
        <Flex gap={8} className="flex justify-end py-2">
          <Button className="min-w-[120px]" onClick={onToggleDrawer}>
            Close
          </Button>
          <Button type="primary" className="min-w-[120px]">
            Submit
          </Button>
        </Flex>
      }
    >
      <Form layout="vertical">
        <Row>
          <Col span={24}>
            <Typography.Text className="font-semibold text-lg">
              Personal
            </Typography.Text>
          </Col>
          <Col {...colLayout}>
            <Form.Item label="Shop ID" name="shop_id">
              <Input />
            </Form.Item>
          </Col>
          <Col {...colLayout}>
            <Form.Item label="Shop Name" name="shop_name">
              <Input />
            </Form.Item>
          </Col>
          <Col {...colLayout}>
            <Form.Item label="Status" name="status">
              <Switch />
            </Form.Item>
          </Col>
          <Col {...colLayout}>
            <Form.Item label="Remark" name="remark">
              <Input.TextArea autoSize={{ minRows: 5 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Typography.Text className="font-semibold text-lg">
              Address
            </Typography.Text>
          </Col>
          <Col {...colLayout}>
            <Form.Item label="Address" name="address">
              <Select />
            </Form.Item>
          </Col>
          <Col {...colLayout}>
            <Form.Item label="Address" name="address">
              <Select />
            </Form.Item>
          </Col>
          <Col {...colLayout}>
            <Form.Item label="Address" name="address">
              <Select />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

const Page = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [search, setSearch] = useState<string>();
  const [open, setOpen] = useState(false);

  const filterDataList = useMemo(() => {
    return [];
  }, []);

  const handleToggleModal = () => {
    setOpen(!open);
  };

  const columns: ColumnsType = [
    {
      key: "shop_id",
      title: "Shop ID",
      render: (_, rc) => {
        return <></>;
      },
    },
    {
      key: "shop_name",
      title: "Shop Name",
      render: (_, rc) => {
        return <></>;
      },
    },
    {
      key: "status",
      title: "Status",
      align: "center",
      render: (_, rc) => {
        return <></>;
      },
    },
    {
      key: "edit",
      title: "Edit",
      width: 80,
      align: "center",
      fixed: "right",
      render: (_, rc) => {
        return <></>;
      },
    },
    {
      key: "delete",
      title: "Delete",
      width: 80,
      align: "center",
      fixed: "right",
      render: (_, rc) => {
        return <></>;
      },
    },
  ];

  return (
    <CustomCard>
      {contextHolder}

      <Row gutter={[12, 12]} justify="end" align="middle">
        <Col span={24} className="flex justify-end items-center">
          <ButtonUpdateData onReFetch={() => {}} />
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 8 }} xs={{ span: 24 }}>
          <ShopOutlined className="mr-2 text-base" />
          <Typography.Text className="font-semibold text-base">
            Shop List
          </Typography.Text>
        </Col>
        <Col xl={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
          <Input
            placeholder="Search..."
            onChange={(e) => setSearch(e?.target?.value)}
          />
        </Col>
        <Col xl={{ span: 4 }} md={{ span: 6 }} xs={{ span: 24 }}>
          <Button block type="primary" onClick={handleToggleModal}>
            Create Shop
          </Button>
        </Col>
        <Col span={24}>
          <Table
            rowKey="shop_id"
            columns={columns}
            dataSource={filterDataList || []}
            scroll={{ x: "max-content" }}
            pagination={{
              size: "small",
              showSizeChanger: true,
            }}
          />
        </Col>
      </Row>
      <DrawerFormShop open={open} onClose={handleToggleModal} />
    </CustomCard>
  );
};

export default Page;
