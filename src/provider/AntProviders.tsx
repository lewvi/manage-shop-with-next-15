"use client";

import { ConfigProvider } from "antd";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

const AntProviders = ({ children }: { children: ReactNode }) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};

export default dynamic(() => Promise.resolve(AntProviders), {
  ssr: false,
});
