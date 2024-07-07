import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const GoogleSignInButton = ({ children }: Props) => {
  const handleClick = () => {};
  return <Button className="w-full my-2" onClick={handleClick}>{children}</Button>;
};

export default GoogleSignInButton;
