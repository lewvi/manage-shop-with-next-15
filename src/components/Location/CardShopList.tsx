import {
  Avatar,
  Card,
  Col,
  Empty,
  Flex,
  Input,
  Row,
  Tag,
  Typography,
} from "antd";
import { MapPin } from "lucide-react";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import TagsStatus from "../Common/Tags/TagsStatus";

const CardStyle = styled(Card)`
  min-width: 100px;
  max-width: 400px;

  background: rgba(246, 244, 244, 0.49);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.8px);
  -webkit-backdrop-filter: blur(10.8px);
  border: 1px solid rgba(246, 244, 244, 0.24);
`;

interface CardShopListProps {
  data: IShopLocationData[];
  shopData?: IShopLocationData;
  onSelectShopCard: (val: IShopLocationData) => void;
}

interface CardShopItemProps {
  item: IShopLocationData;
  onSelectShopCard: (val: IShopLocationData) => void;
}

const ShopIcon = ({ status }: { status: boolean }) => {
  return (
    <Avatar
      shape="square"
      icon={<MapPin color={status === true ? "#40985E" : "#CF1322"} />}
      size="large"
      style={{ background: status === true ? "#EDFDF1" : "#FCECEB" }}
    />
  );
};

const CardShopItem = (props: CardShopItemProps) => {
  const { item, onSelectShopCard } = props;

  const cardStyle = useMemo(() => {
    const style = {};
    return style;
  }, []);

  return (
    <Card
      key={item?.shop_id}
      hoverable
      className="mb-2"
      styles={{ body: { padding: 16 } }}
      onClick={() => onSelectShopCard(item)}
      style={cardStyle}
    >
      <Row>
        <Col span={5} className="flex items-center">
          <ShopIcon status={item?.shop_status} />
        </Col>
        <Col span={13}>
          <Flex vertical gap={6}>
            <Typography.Text className="font-semibold">
              {item?.shop_name || "N/A"}
            </Typography.Text>
            <Typography.Text className="text-xs text-accent-content">
              {`Shop ID : ${item?.shop_id || "N/A"}`}
            </Typography.Text>
          </Flex>
        </Col>
        <Col span={6} className="flex justify-end items-start">
          {/* <TagsStatus status={item?.status === true ? "active" : "inactive"} /> */}
        </Col>
      </Row>
    </Card>
  );
};

const CardShopList = (props: CardShopListProps) => {
  const { data, onSelectShopCard } = props;

  const [search, setSearch] = useState("");

  const filterShopList = useMemo(() => {
    if (data == null || data?.length === 0) return [];

    if (search != null) {
      const searchLower = search?.toLowerCase();

      return data?.filter(
        (e) =>
          e?.shop_id?.toLowerCase()?.includes(searchLower) ||
          e?.shop_name?.toLowerCase()?.includes(searchLower)
      );
    }

    return data;
  }, [data, search]);

  return (
    <CardStyle className="h-[calc(100vh-200px)] rounded-xl">
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Typography.Text ellipsis className="text-base font-semibold mr-2">
            Shop Location List
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Input
            placeholder="Search...."
            variant="underlined"
            className="bg-transparent"
            onChange={(e) => setSearch(e?.target?.value)}
          />
        </Col>
        <Col span={24}>
          {filterShopList?.length !== 0 ? (
            <div className="h-[calc(100vh-330px)] overflow-x-hidden overflow-y-auto px-3">
              {filterShopList?.map((item) => {
                return (
                  <CardShopItem
                    key={item?.shop_id}
                    item={item}
                    onSelectShopCard={onSelectShopCard}
                  />
                );
              })}
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center p-5">
              <Empty />
            </div>
          )}
        </Col>
      </Row>
    </CardStyle>
  );
};

export default CardShopList;
