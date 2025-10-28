import { Button } from "@/components/ui/button";
import { ReactNode, useActionState } from "react";
import { authenticateGoogle } from "./sign-in/actions";

type Props = {
  children: ReactNode;
};

const GoogleSignInButton = ({ children }: Props) => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticateGoogle,
    undefined
  );

  return (
    <form action={formAction}>
      <Button className="w-full" type="submit">
        {children}
      </Button>
    </form>
  );
};

export default GoogleSignInButton;
