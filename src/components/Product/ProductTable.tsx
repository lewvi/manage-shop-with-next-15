"use client";

import {
  DeleteOutlined,
  EditOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Input,
  message,
  Popconfirm,
  Row,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { formatNumberDigit } from "@/utils/formatNumberDigit";
import ButtonUpdateData from "@/components/Common/Button/ButtonUpdateData";
import CustomCard from "@/components/Common/Card/CustomCard";
import ModalFormProduct from "@/components/Product/ModalFormProduct";
import TagsStatus from "@/components/Common/Tags/TagsStatus";
import {
  useDeleteProduct,
  useProductInformation,
  useProductList,
} from "@/service/product";

const ProductTable = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [search, setSearch] = useState<string>();

  const [open, setOpen] = useState(false);
  const [dataInfo, setDataInfo] = useState<IProduct | undefined>();

  const queryProductList = useProductList();

  const mutateInfo = useProductInformation();
  const mutateDelete = useDeleteProduct();

  const filterDataList = useMemo(() => {
    if (queryProductList.data == null) return [];

    if (search != null) {
      const searchLower = search?.toLowerCase();

      return queryProductList.data?.filter((e) => {
        return (
          e?.product_code?.toLowerCase()?.includes(searchLower) ||
          e?.product_name?.toLowerCase()?.includes(searchLower)
        );
      });
    }

    return queryProductList.data;
  }, [search, queryProductList.data]);

  const handleToggleModal = () => {
    setOpen(!open);
  };

  const onEdit = (rc: IProduct) => {
    if (rc == null || isEmpty(rc)) return;

    mutateInfo.mutate(
      { product_code: rc?.product_code },
      {
        onSuccess: (val) => {
          setDataInfo(val);
          handleToggleModal();
        },
        onError: ({ message: msg }) => {
          messageApi.error(msg);
        },
      }
    );
  };

  const onDelete = (rc: IProduct) => {
    if (rc == null || isEmpty(rc)) return;

    mutateDelete.mutate(
      { product_code: rc?.product_code },
      {
        onSuccess: () => {
          messageApi.success("Delete Product Success");
          queryProductList.refetch();
        },
        onError: ({ message: msg }) => {
          messageApi.error(msg);
        },
      }
    );
  };

  useEffect(() => {
    if (open === false) {
      setDataInfo(undefined);
    }
  }, [open]);

  const columns: ColumnsType<IProduct> = [
    {
      key: "product_code",
      title: "Product Code",
      align: "center",
      width: 200,
      render: (_, rc) => {
        return (
          <Typography.Text className="text-sky-500">
            {rc?.product_code || "N/A"}
          </Typography.Text>
        );
      },
    },
    {
      key: "product_name",
      title: "Product Name",
      render: (_, rc) => {
        return <Typography.Text>{rc?.product_name || "N/A"}</Typography.Text>;
      },
    },
    {
      key: "status",
      title: "Status",
      align: "center",
      width: 150,
      render: (_, rc) => {
        const status = rc?.product_status ? "active" : "inactive";

        return <TagsStatus status={status} />;
      },
    },
    {
      key: "product_price",
      title: "Price",
      align: "right",
      width: 180,
      render: (_, rc) => {
        return (
          <Typography.Text>
            {formatNumberDigit(rc?.product_price ?? 0)}
          </Typography.Text>
        );
      },
    },
    {
      key: "action",
      title: "",
      fixed: "right",
      width: 150,
      render: (_, rc) => {
        return (
          <Flex gap={16} className="flex justify-center">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(rc)}
            />
            <Popconfirm
              title="Are you sure?"
              description="This action cannot be undone"
              placement="bottomLeft"
              onConfirm={() => onDelete(rc)}
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <CustomCard>
      {contextHolder}
      <Row gutter={[12, 12]} justify="end" align="middle">
        <Col span={24} className="flex justify-end items-center">
          <ButtonUpdateData onReFetch={() => queryProductList.refetch()} />
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 8 }} xs={{ span: 24 }}>
          <ShoppingOutlined className="mr-2 text-base" />
          <Typography.Text className="font-semibold text-base">
            Product List
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
            Create Product
          </Button>
        </Col>
        <Col span={24}>
          <Table
            rowKey="product_code"
            columns={columns}
            dataSource={filterDataList || []}
            loading={queryProductList.loading}
            size="middle"
            scroll={{ x: "max-content" }}
            pagination={{
              size: "small",
              showSizeChanger: true,
            }}
          />
        </Col>
      </Row>
      <ModalFormProduct
        data={dataInfo}
        open={open}
        onCanCel={handleToggleModal}
      />
    </CustomCard>
  );
};

export default ProductTable;
