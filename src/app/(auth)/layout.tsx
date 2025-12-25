import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      className="flex justify-center items-center w-full"
      style={{
        minHeight: "calc(100dvh - var(--header-height))",
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
