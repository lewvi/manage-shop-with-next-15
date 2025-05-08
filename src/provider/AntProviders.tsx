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
