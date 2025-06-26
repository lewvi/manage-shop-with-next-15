"use client";

import { Drawer, Grid, Layout, Menu } from "antd";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Header from "./Header";
import styled from "styled-components";
import Pages from "../../utils/routes";
import { usePathname, useRouter } from "next/navigation";
import { cloneDeep } from "lodash";
import { findMenuByPath } from "@/utils/findMenuByPath";

const MenuWrapper = styled.div`
  .ant-menu-item {
    transition: transform 0.3s ease;
  }

  .ant-menu-item:hover {
    transform: scale(1.05);
  }
`;

interface ISideBarContent {
  listMenu: any[];
  selectedKey: string;
}
interface ISideBarMobile extends ISideBarContent {
  open: boolean;
  onClose: () => void;
}

const SideBarMobile = (props: ISideBarMobile) => {
  const { open, onClose, listMenu, selectedKey } = props;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="left"
      width="80vw"
      closable={false}
    >
      <div>
        <div>
          <div className="bg-[#292929] rounded-md h-[50px]" />
        </div>
        <MenuWrapper className="mt-5 h-[calc(100vh-200px)]">
          <Menu
            theme="dark"
            mode="vertical"
            items={listMenu}
            selectedKeys={[selectedKey]}
          />
        </MenuWrapper>
      </div>
    </Drawer>
  );
};

const SideBarContent = ({ listMenu, selectedKey }: ISideBarContent) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width="240px"
      className="shadow-lg z-[1000]"
      style={{ top: 0, position: "sticky" }}
    >
      <div>
        <div className="p-3">
          <div className="bg-[#292929] rounded-md h-[50px]" />
        </div>
        <MenuWrapper className="mt-5 px-2 h-[calc(100vh-200px)]">
          <Menu
            theme="dark"
            mode="vertical"
            items={listMenu}
            selectedKeys={[selectedKey]}
          />
        </MenuWrapper>
      </div>
    </Layout.Sider>
  );
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { xl } = Grid.useBreakpoint();

  const [titleLabel, setTitleLabel] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const handleToggleMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const onClickMenu = (key: string, label: string, path: string) => {
    setSelectedKey(key);
    setTitleLabel(label);

    router.push(`${path}`);
  };

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

  const menuList = useMemo(() => {
    if (Pages == null || Pages?.length === 0) return [];

    return renderMenu(cloneDeep(Pages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, Pages]);

  useEffect(() => {
    const menu = findMenuByPath(pathname, Pages);

    if (menu == null) return;

    setSelectedKey(menu.key);
    setTitleLabel(menu.label);
  }, [pathname]);

  return (
    <Layout style={{ height: "100vh", overflowX: "hidden" }}>
      {xl ? (
        <SideBarContent listMenu={menuList} selectedKey={selectedKey} />
      ) : (
        <SideBarMobile
          open={openMenuMobile}
          onClose={handleToggleMenuMobile}
          listMenu={menuList}
          selectedKey={selectedKey}
        />
      )}
      <Layout>
        <Header title={titleLabel} onToggleMenu={handleToggleMenuMobile} />
        <Layout.Content className="p-5">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
