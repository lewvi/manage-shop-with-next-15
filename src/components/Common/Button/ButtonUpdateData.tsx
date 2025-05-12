"use client";

import { ReloadOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

interface IButtonUpdateData {
  onReFetch: () => void;
}

const ButtonUpdateData = (props: IButtonUpdateData) => {
  const { onReFetch } = props;

  const [updateTime, setUpdateTime] = useState<Dayjs>(dayjs());

  const handleUpdateData = () => {
    setUpdateTime(dayjs());
    onReFetch();
  };

  return (
    <Flex gap={4} className="flex items-center">
      <Button
        type="text"
        size="small"
        shape="circle"
        icon={<ReloadOutlined className="text-xs text-sky-500" />}
        onClick={handleUpdateData}
      />
      <Typography.Text className="text-xs">
        {`Update at : ${updateTime.format("DD MMM YYYY HH:mm")} `}
      </Typography.Text>
    </Flex>
  );
};

export default ButtonUpdateData;
