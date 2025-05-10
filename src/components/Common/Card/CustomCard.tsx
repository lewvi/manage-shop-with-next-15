"use client";

import { Card } from "antd";
import type { CardProps } from "antd";
import React from "react";
import styled from "styled-components";

// rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
// rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

const CardStyle = styled(Card)<{ $isShadow: boolean }>`
  border-radius: 25px;
  box-shadow: ${({ $isShadow }) =>
    $isShadow
      ? "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      : "none"};
`;

interface CustomCardProps extends CardProps {
  isShadow?: boolean;
  // style?: React.CSSProperties;
}

const CustomCard: React.FC<CustomCardProps> = (props) => {
  return <CardStyle {...props} $isShadow={props?.isShadow ?? true} />;
};

export default CustomCard;
