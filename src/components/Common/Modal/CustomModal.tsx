"use client";

import { Modal, ModalProps, Grid } from "antd";
import React from "react";
import styled, { css } from "styled-components";

type themeBgType = "white" | "glass";

const themeBg: Record<themeBgType, any> = {
  white: {
    bg: "#fff",
  },
  glass: {
    bg: "rgba(255, 255, 255, 0.7)",
  },
};

const StyleModal = styled(Modal)<{ $righted: boolean; $theme: themeBgType }>`
  ${({ $righted }) =>
    $righted &&
    css`
      position: absolute;
      top: 2rem !important;
      right: 2rem;

      @media not all and (min-width: 768px) {
        left: 50%;
        right: 0;
        transform: translateX(-50%);
      }
    `}

  .ant-modal-content {
    background-color: ${({ $theme }) => themeBg[$theme].bg ?? "#fff"};

    ${({ $theme }) =>
      $theme === "glass" &&
      css`
        box-shadow: 4px 4px 30px rgba(32, 32, 32, 0.4);
        border-radius: 1rem;
        backdrop-filter: blur(10px) saturate(150%);
        -webkit-backdrop-filter: blur(10px) saturate(150%);
        border: 1px solid rgba(255, 255, 255, 0.125);
      `}

    > .ant-modal-header {
      background: transparent;
    }
  }

  > .ant-modal-body {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 300px);
  }
`;

interface CustomModalProps extends ModalProps {
  width?: { xl?: string; lg?: string; md?: string; screen?: string };
  centered?: boolean;
  righted?: boolean;
  theme?: themeBgType;
}

const defaultWidth = { xl: "60vw", lg: "70vw", md: "75vw", screen: "95vw" };

const CustomModal = (props: CustomModalProps) => {
  const {
    width,
    maskClosable = false,
    centered = true,
    righted = false,
    theme = "white",
  } = props;

  const { md, lg, xl } = Grid.useBreakpoint();

  return (
    <StyleModal
      {...props}
      maskClosable={maskClosable}
      centered={righted ? righted : centered}
      width={
        xl
          ? width?.xl ?? defaultWidth?.xl
          : lg
          ? width?.lg ?? defaultWidth?.lg
          : md
          ? width?.md ?? defaultWidth?.md
          : width?.screen ?? defaultWidth?.screen
      }
      $righted={righted}
      $theme={theme}
    />
  );
};

export default CustomModal;
