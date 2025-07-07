import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import React, { useEffect, useMemo } from "react";
import CDrawer from "../Common/Drawer/CDrawer";
import { isEmpty, isNumber } from "lodash";
import useThaiAddress from "@/hooks/useThaiAddress";
import ThaiAddressData from "../../../public/json/thai_address.json";

const colLayout = {
  xl: { span: 24 },
  md: { span: 24 },
  xs: { span: 24 },
};

interface DrawerFormShopProp {
  data?: IShopData;
  open: boolean;
  onClose: () => void;
}

const TitleContent = ({ text }: { text: string }) => {
  return (
    <Divider orientation="left" orientationMargin={0}>
      <Typography.Text className="font-semibold text-lg">
        {text || ""}
      </Typography.Text>
    </Divider>
  );
};

const FormPersonal = () => {
  return (
    <Row>
      <Col span={24}>
        <TitleContent text="Personal" />
      </Col>
      <Col {...colLayout}>
        <Form.Item label="Shop ID" name="shop_id" rules={[{ required: true }]}>
          <Input placeholder="Shop ID" />
        </Form.Item>
      </Col>
      <Col {...colLayout}>
        <Form.Item
          label="Shop Name"
          name="shop_name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Shop Name" />
        </Form.Item>
      </Col>
      <Col {...colLayout}>
        <Form.Item label="Status" name="status">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Col>
      <Col {...colLayout}>
        <Form.Item label="Remark" name="remark">
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
      </Col>
    </Row>
  );
};

const FormAddress = () => {
  const { provinces } = useThaiAddress();

  const form = Form.useFormInstance();
  const province = Form.useWatch("province", form);
  const district = Form.useWatch("district", form);

  const optionProvince = useMemo(() => {
    return provinces?.map((item) => {
      return { label: item, value: item };
    });
  }, [provinces]);

  const optionDistrict = useMemo(() => {
    if (province == null) return [];

    const seen = new Set<string>();
    const result: { label: string; value: string }[] = [];

    for (const item of ThaiAddressData ?? []) {
      if (item.province === province && item.amphoe && !seen.has(item.amphoe)) {
        seen.add(item.amphoe);
        result.push({ label: item.amphoe, value: item.amphoe });
      }
    }

    return result;
  }, [province]);

  const optionSubDistrict = useMemo(() => {
    if (district == null) return [];

    const result: { label: string; value: string }[] = [];

    for (const item of ThaiAddressData ?? []) {
      if (item.amphoe === district && item.district) {
        result.push({
          label: item.district,
          value: item.district,
        });
      }
    }

    return result;
  }, [district]);

  const handleSelectProvince = () => {
    form?.resetFields(["district", "subdistrict", "post_code"]);
  };

  const handleSelectDistrict = () => {
    form?.resetFields(["subdistrict", "post_code"]);
  };

  const handleSelectSubDistrict = (val: string) => {
    const find = ThaiAddressData?.find((e) => e?.district === val);
    form?.setFieldsValue({ post_code: find?.zipcode });
  };

  const validatorLatitude = (_: any, value: number) => {
    if (value < -90 || value > 90) {
      return Promise.reject("Latitude must be between -90 and 90");
    }

    return Promise.resolve();
  };

  const validatorLongitude = (_: any, value: number) => {
    if (value < -180 || value > 180) {
      return Promise.reject("Longitude must be between -180 and 180");
    }

    return Promise.resolve();
  };

  return (
    <Row gutter={[12, 0]}>
      <Col span={24}>
        <TitleContent text="Address" />
      </Col>
      <Col {...colLayout}>
        <Form.Item
          label="Province"
          name="province"
          rules={[{ required: true }]}
        >
          <Select
            allowClear
            placeholder="Province"
            options={optionProvince}
            onChange={handleSelectProvince}
          />
        </Form.Item>
      </Col>
      <Col {...colLayout}>
        <Form.Item
          label="District"
          name="district"
          rules={[{ required: true }]}
        >
          <Select
            allowClear
            placeholder="District"
            options={optionDistrict}
            onChange={handleSelectDistrict}
            disabled={province == null}
          />
        </Form.Item>
      </Col>
      <Col {...colLayout}>
        <Form.Item
          label="Subdistrict"
          name="subdistrict"
          rules={[{ required: true }]}
        >
          <Select
            allowClear
            placeholder="Subdistrict"
            options={optionSubDistrict}
            onChange={handleSelectSubDistrict}
            disabled={district == null}
          />
        </Form.Item>
      </Col>
      <Col {...colLayout}>
        <Form.Item
          label="Post Code"
          name="post_code"
          rules={[{ required: true }]}
        >
          <Input placeholder="Post Code" disabled />
        </Form.Item>
      </Col>
      <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <Form.Item
          label="Latitude"
          name="latitude"
          rules={[{ required: true }, { validator: validatorLatitude }]}
        >
          <InputNumber
            placeholder="Latitude"
            controls={false}
            precision={6}
            className="w-full"
          />
        </Form.Item>
      </Col>
      <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <Form.Item
          label="Longitude"
          name="longitude"
          rules={[{ required: true }, { validator: validatorLongitude }]}
        >
          <InputNumber
            placeholder="Longitude"
            controls={false}
            precision={6}
            className="w-full"
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

const DrawerFormShop = (props: DrawerFormShopProp) => {
  const { data, open, onClose } = props;

  const [form] = Form.useForm();

  const onSubmit = () => {
    form
      ?.validateFields()
      ?.then((val) => {
        if (val == null) return;
      })
      .catch(() => {});
  };

  const onToggleDrawer = () => {
    form?.resetFields();
    onClose();
  };

  useEffect(() => {
    if (data != null || isEmpty(data) === false) {
      form?.setFieldsValue({ ...data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <CDrawer
      open={open}
      onClose={onToggleDrawer}
      title={data?.shop_id == null ? "Create Shop" : "Update Shop"}
      onSubmit={onSubmit}
    >
      <Form form={form} layout="vertical">
        <FormPersonal />
        <FormAddress />
      </Form>
    </CDrawer>
  );
};

export default DrawerFormShop;
