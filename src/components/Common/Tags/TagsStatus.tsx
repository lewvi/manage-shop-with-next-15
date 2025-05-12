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
    >
      {status || ""}
    </Tag>
  );
};

export default TagsStatus;
