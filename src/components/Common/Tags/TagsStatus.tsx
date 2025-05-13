"use client";

import { getStatusColor } from "@/utils/getStatusColor";
import { Tag } from "antd";
import React from "react";

interface ITagsStatusProps {
  status: string;
}

const TagsStatus = (props: ITagsStatusProps) => {
  const { status } = props;

  return (
    <Tag
      className="min-w-[85px] text-center rounded-xl capitalize"
      color={getStatusColor(status)}
      // style={{
      //   backgroundColor: `${getStatusColor(status)}1A`,
      //   border: "none",
      //   color: `${getStatusColor(status)}`,
      // }}
      // className="rounded-xl capitalize text-center min-w-[85px] font-semibold py-1"
    >
      {status || ""}
    </Tag>
  );
};

export default TagsStatus;
