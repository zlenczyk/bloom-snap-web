import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center px-2 w-full mt-header-height py-6">
      {children}
    </div>
  );
};

export default Layout;
