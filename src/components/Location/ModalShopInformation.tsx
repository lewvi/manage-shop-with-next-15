"use client";

import React, { useMemo } from "react";
import CustomModal from "../Common/Modal/CustomModal";
import { Card, Col, Row, Typography } from "antd";
import MapItem from "../Common/Map/MapItem";
import { getStatusColor } from "@/utils/getStatusColor";

const colLayout = {
  xl: { span: 8 },
  md: { span: 12 },
  xs: { span: 24 },
};

interface ModalShopInformationProps {
  data?: IShopLocationData;
  open: boolean;
  onClose: () => void;
}

const ModalShopInformation = (props: ModalShopInformationProps) => {
  const { data, open, onClose } = props;

  const status = data?.status === true ? "active" : "inactive";

  const mapDetail = useMemo(() => {
    if (data == null) return;

    return {
      name: data?.shop_name,
      latitude: data?.latitude,
      longitude: data?.longitude,
      signal: getStatusColor(status),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onCloseModal = () => {
    onClose();
  };

  return (
    <CustomModal
      open={open}
      onCancel={onCloseModal}
      title="Shop Information"
      width={{ xl: "60vw" }}
    >
      <div className="my-3 overflow-x-hidden overflow-y-auto h-[calc(100vh-300px)]">
        <Card className="mb-5">
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Typography.Text className="font-bold text-red-brown">
                Shop Information
              </Typography.Text>
            </Col>
            <Col {...colLayout}>
              <Typography.Text className="text-xs text-accent-content">
                Shop ID
              </Typography.Text>
              <br />
              <Typography.Text>{data?.shop_id || ""}</Typography.Text>
            </Col>
            <Col {...colLayout}>
              <Typography.Text className="text-xs text-accent-content">
                Shop Name
              </Typography.Text>
              <br />
              <Typography.Text>{data?.shop_name || ""}</Typography.Text>
            </Col>
            <Col {...colLayout}>
              <Typography.Text className="text-xs text-accent-content">
                Status
              </Typography.Text>
              <br />
              {data?.status === true ? (
                <Typography.Text
                  className="font-semibold"
                  style={{ color: getStatusColor("active") }}
                >
                  Active
                </Typography.Text>
              ) : (
                <Typography.Text
                  className="font-semibold"
                  style={{ color: getStatusColor("inactive") }}
                >
                  Inactive
                </Typography.Text>
              )}
            </Col>
          </Row>
        </Card>
        <Card>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Typography.Text className="font-bold text-red-brown">
                Shop Address
              </Typography.Text>
            </Col>
            <Col {...colLayout}>
              <Typography.Text className="text-xs text-accent-content">
                Sub District
              </Typography.Text>
              <br />
              <Typography.Text>{data?.subdistrict || ""}</Typography.Text>
            </Col>
            <Col {...colLayout}>
              <Typography.Text className="text-xs text-accent-content">
                District
              </Typography.Text>
              <br />
              <Typography.Text>{data?.district || ""}</Typography.Text>
            </Col>
            <Col {...colLayout}>
              <Typography.Text className="text-xs text-accent-content">
                Province
              </Typography.Text>
              <br />
              <Typography.Text>{data?.province || ""}</Typography.Text>
            </Col>
            <Col {...colLayout}>
              <Typography.Text className="text-xs text-accent-content">
                Post Code
              </Typography.Text>
              <br />
              <Typography.Text>{data?.post_code || ""}</Typography.Text>
            </Col>
            <Col {...colLayout}>
              <Typography.Text className="text-xs text-accent-content">
                Latitude
              </Typography.Text>
              <br />
              <Typography.Text>{data?.latitude || ""}</Typography.Text>
            </Col>
            <Col {...colLayout}>
              <Typography.Text className="text-xs text-accent-content">
                Longitude
              </Typography.Text>
              <br />
              <Typography.Text>{data?.longitude || ""}</Typography.Text>
            </Col>
            <Col span={24}>
              <div className="rounded-lg overflow-hidden h-[300px]">
                <MapItem.Provider>
                  <MapItem markerList={[mapDetail]} />
                </MapItem.Provider>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </CustomModal>
  );
};

export default ModalShopInformation;
