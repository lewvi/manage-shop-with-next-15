"use client";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useMemo, useState } from "react";
import CustomModal from "../../components/Common/Modal/CustomModal";
import { isEmpty } from "lodash";
import { formatNumberDigit } from "@/utils/formatNumberDigit";
import {
  useGetProductInformation,
  useGetProductList,
  useUpdateProduct,
} from "@/service/product";
import ButtonUpdateData from "@/components/Common/Button/ButtonUpdateData";

interface IModalFormProduct {
  data?: IProduct;
  open: boolean;
  onCanCel: () => void;
}

// const data = [
//   {
//     product_code: "1",
//     product_name: "Coffee",
//     product_price: 0,
//     product_status: true,
//     product_description: "",
//   },
//   {
//     product_code: "2",
//     product_name: "",
//     product_price: 0,
//     product_status: false,
//     product_description: "",
//   },
// ];

const ModalFormProduct = (props: IModalFormProduct) => {
  const { data, open, onCanCel } = props;

  const [form] = Form.useForm();

  const mutateUpdate = useUpdateProduct();
  const queryProductList = useGetProductList();

  const onSubmit = () => {
    form
      ?.validateFields()
      ?.then((val) => {
        if (val == null || isEmpty(val)) return;

        const params: IUpdateProductParams = {
          ...val,
          product_description: val?.product_description || "",
        };

        mutateUpdate.mutate(params, {
          onSuccess: () => {
            queryProductList.refetch();
            onCloseModal();
          },
          onError: ({ message: msg }) => {
            //
          },
        });
      })
      .catch(() => {});
  };

  const onCloseModal = () => {
    form?.resetFields();
    onCanCel();
  };

  useEffect(() => {
    if (data != null || isEmpty(data) === false) {
      form?.setFieldsValue({ ...data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <CustomModal
      open={open}
      onCancel={onCloseModal}
      onOk={onSubmit}
      righted
      title="Create Product"
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item
              label="Product Code"
              name="product_code"
              rules={[{ required: true }]}
            >
              <Input placeholder="Product Code" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item
              label="Product Name"
              name="product_name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item
              label="Product Price"
              name="product_price"
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder="Product Price"
                controls={false}
                className="w-full"
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Product Status"
              name="product_status"
              initialValue={true}
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Product Description" name="product_description">
              <Input.TextArea
                placeholder="Product Description"
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};

const Page = () => {
  const [search, setSearch] = useState<string>();

  const [open, setOpen] = useState(false);
  const [dataInfo, setDataInfo] = useState<IProduct | undefined>();

  const queryProductList = useGetProductList();

  const mutateInfo = useGetProductInformation();

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
      { product_code: "" },
      {
        onSuccess: (val) => {
          setDataInfo(val);
          handleToggleModal();
        },
        onError: ({ message: msg }) => {
          //
        },
      }
    );
  };

  const onDelete = (rc: IProduct) => {
    //
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
        return (
          <Tag
            className="w-[80px] text-center capitalize"
            color={status === "active" ? "green" : "red"}
          >
            {status}
          </Tag>
        );
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
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(rc)}
            />
          </Flex>
        );
      },
    },
  ];

  return (
    <Row gutter={[12, 12]} justify="end" align="middle">
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
      <Col span={24} className="flex justify-end items-center">
        <ButtonUpdateData onReFetch={() => queryProductList.refetch()} />
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
      <ModalFormProduct
        data={dataInfo}
        open={open}
        onCanCel={handleToggleModal}
      />
    </Row>
  );
};

export default Page;
