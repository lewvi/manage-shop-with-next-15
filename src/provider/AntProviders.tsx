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
            bodyBg: "#fff",
            headerBg: "transparent",
            siderBg: "#f1f1f1",
            triggerBg: "#f1f1f1",
            triggerColor: "#292929",
          },
          Button: {
            primaryShadow: "none",
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
