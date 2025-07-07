import { Button, Drawer, DrawerProps, Flex, Grid } from "antd";
import { AnyObject } from "antd/es/_util/type";
import React from "react";

interface CustomDrawerProps extends DrawerProps {
  showFooter?: boolean;
  okText?: string;
  cancelText?: string;
  width?: any;
  onSubmit?: (e?: AnyObject) => void;
}

const defaultWidth = { xl: "50vw", lg: "70vw", md: "75vw", screen: "95vw" };

const CDrawer = (props: CustomDrawerProps) => {
  const {
    showFooter = true,
    maskClosable = false,
    width,
    onClose,
    onSubmit,
  } = props;

  const { md, lg, xl } = Grid.useBreakpoint();

  return (
    <Drawer
      {...props}
      width={
        xl
          ? width?.xl ?? defaultWidth?.xl
          : lg
          ? width?.lg ?? defaultWidth?.lg
          : md
          ? width?.md ?? defaultWidth?.md
          : width?.screen ?? defaultWidth?.screen
      }
      maskClosable={maskClosable}
      footer={
        showFooter ? (
          <Flex gap={8} className="flex justify-end py-2">
            <Button
              className="min-w-[120px] text-primary border-primary"
              onClick={onClose}
            >
              Close
            </Button>
            <Button type="primary" className="min-w-[120px]" onClick={onSubmit}>
              Submit
            </Button>
          </Flex>
        ) : null
      }
    />
  );
};

export default CDrawer;
