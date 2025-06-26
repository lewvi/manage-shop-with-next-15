import { Button, Drawer, DrawerProps, Flex } from "antd";
import { AnyObject } from "antd/es/_util/type";
import React from "react";

interface CustomDrawerProps extends DrawerProps {
  showFooter?: boolean;
  okText?: string;
  cancelText?: string;
  onSubmit?: (e?: AnyObject) => void;
}

const CDrawer = (props: CustomDrawerProps) => {
  const { showFooter = true, maskClosable = false, onClose, onSubmit } = props;

  return (
    <Drawer
      {...props}
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
