import { Layout } from "antd";
import React, { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (value: boolean) => {
    setCollapsed(value);
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => onCollapse(value)}
      width="250px"
    >
      <div>
        <div className="p-3">
          <div className="bg-[#292929] rounded-md h-[50px]" />
        </div>
      </div>
    </Layout.Sider>
  );
};

export default Sidebar;
