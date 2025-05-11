"use client";

import { ConfigProvider } from "antd";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  display: "fallback",
  weight: "300",
});

const AntProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: kanit.style.fontFamily,
          colorPrimary: "#292929",
        },
        components: {
          Layout: {
            bodyBg: "#f1f1f1",
            headerBg: "transparent",
            siderBg: "#fff",
            triggerBg: "#fff",
            triggerColor: "#292929",
          },
          Button: {
            primaryShadow: "none",
          },
          Menu: {
            darkItemBg: "transparent",
            darkItemColor: "#696969",
            darkItemHoverColor: "#292929",
            iconSize: 16,
            itemBorderRadius: 10,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default dynamic(() => Promise.resolve(AntProviders), {
  ssr: false,
});
