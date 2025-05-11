import { Layout, Menu } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Pages from "../../utils/routes";
import { usePathname, useRouter } from "next/navigation";
import { cloneDeep, isEmpty } from "lodash";
import { findMenuByPath } from "@/utils/findMenuByPath";
import styled from "styled-components";

const MenuWrapper = styled.div`
  .ant-menu-item {
    transition: transform 0.3s ease;
  }

  .ant-menu-item:hover {
    transform: scale(1.05);
    // background-color: #e6f7ff;
  }
`;

interface ISideBarProps {
  onGetTitleLabel: (e: string) => void;
}

const Sidebar = (props: ISideBarProps) => {
  const { onGetTitleLabel } = props;

  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("");

  const renderMenu = useCallback(
    (menu: any[]) => {
      return menu?.map((item) => {
        const data = {
          key: item.key,
          icon: item.icon,
          label: item.label,
          path: item.path,
          children: item.children,
          onClick: () => {},
        };

        if (item.children) {
          data.children = renderMenu(item.children);
        } else if (item.path) {
          data.path = item.path;
          data.onClick = () => onClickMenu(item.key, data.label, item.path);
        }

        return data;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  const onClickMenu = (key: string, label: string, path: string) => {
    setSelectedKey(key);

    onGetTitleLabel(label);

    router.push(`${path}`);
  };

  const onCollapse = (value: boolean) => {
    setCollapsed(value);
  };

  const menuList = useMemo(() => {
    if (Pages == null || Pages?.length === 0) return [];

    return renderMenu(cloneDeep(Pages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, Pages]);

  useEffect(() => {
    const menu = findMenuByPath(pathname, Pages);

    setSelectedKey(menu.key);
    onGetTitleLabel(menu.label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => onCollapse(value)}
      width="240px"
      className="shadow-lg"
    >
      <div className="z-[1000]" style={{ top: 0, position: "sticky" }}>
        <div className="p-3">
          <div className="bg-[#292929] rounded-md h-[50px]" />
        </div>
        <MenuWrapper className="mt-5 px-2">
          <Menu
            theme="dark"
            mode="vertical"
            items={menuList}
            selectedKeys={[selectedKey]}
          />
        </MenuWrapper>
      </div>
    </Layout.Sider>
  );
};

export default Sidebar;
