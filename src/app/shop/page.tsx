"use client";

import ButtonUpdateData from "@/components/Common/Button/ButtonUpdateData";
import CustomCard from "@/components/Common/Card/CustomCard";
import TagsStatus from "@/components/Common/Tags/TagsStatus";
import DrawerFormShop from "@/components/Shop/DrawerFormShop";
import { DeleteOutlined, EditOutlined, ShopOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useMemo, useState } from "react";
import MOCK_SHOP_LIST from "../../mock/shop-list.json";

const Page = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [search, setSearch] = useState<string>();
  const [open, setOpen] = useState(false);
  const [dataInfo, setDataInfo] = useState<IShopData | undefined>();

  const filterDataList = useMemo(() => {
    if (MOCK_SHOP_LIST?.result == null) return [];

    if (search != null) {
      const searchLower = search?.toLowerCase();

      return MOCK_SHOP_LIST?.result?.filter(
        (e) =>
          e?.shop_id?.toLowerCase()?.includes(searchLower) ||
          e?.shop_name?.toLowerCase()?.includes(searchLower)
      );
    }
    return MOCK_SHOP_LIST?.result;
  }, [search]);

  const handleToggleModal = () => {
    setOpen(!open);
  };

  const onEdit = (rc: IShopData) => {
    setDataInfo(rc);
    handleToggleModal();
  };

  const onDelete = (rc: IShopData) => {
    //
  };

  useEffect(() => {
    if (open === false) {
      setDataInfo(undefined);
    }
  }, [open]);

  const columns: ColumnsType<IShopData> = [
    {
      key: "shop_id",
      title: "Shop ID",
      align: "center",
      width: 180,
      render: (_, rc) => {
        return <Typography.Text>{rc?.shop_id || ""}</Typography.Text>;
      },
    },
    {
      key: "shop_name",
      title: "Shop Name",
      render: (_, rc) => {
        return <Typography.Text>{rc?.shop_name || ""}</Typography.Text>;
      },
    },
    {
      key: "status",
      title: "Status",
      align: "center",
      width: 150,
      render: (_, rc) => {
        const status = rc?.status === true ? "active" : "inactive";
        return <TagsStatus status={status} />;
      },
    },
    {
      key: "edit",
      title: "Edit",
      width: 80,
      align: "center",
      fixed: "right",
      render: (_, rc) => {
        return (
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(rc)}
          />
        );
      },
    },
    {
      key: "delete",
      title: "Delete",
      width: 80,
      align: "center",
      fixed: "right",
      render: (_, rc) => {
        return (
          <Popconfirm
            title="Are you sure?"
            description="This action cannot be undone"
            placement="bottomLeft"
            onConfirm={() => onDelete(rc)}
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        );
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
            size="small"
            pagination={{
              size: "small",
              showSizeChanger: true,
            }}
          />
        </Col>
      </Row>
      <DrawerFormShop data={dataInfo} open={open} onClose={handleToggleModal} />
    </CustomCard>
  );
};

export default Page;
