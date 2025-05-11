import { Col, Form, Input, InputNumber, Row, Switch } from "antd";
import React, { useEffect } from "react";
import CustomModal from "../../components/Common/Modal/CustomModal";
import { isEmpty } from "lodash";
import { useGetProductList, useUpdateProduct } from "@/service/product";

interface IModalFormProduct {
  data?: IProduct;
  open: boolean;
  onCanCel: () => void;
}

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

export default ModalFormProduct;
