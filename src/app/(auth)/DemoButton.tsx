import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useActionState } from "react";
import { startDemo } from "./demo/actions";
import ErrorMessage from "./ErrorMessage";

const DemoButton = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    startDemo,
    undefined
  );

  return (
    <form action={formAction} className="mt-3">
      <Button
        type="submit"
        variant="outline"
        disabled={isPending}
        className="w-full border-emerald-600 bg-white/70 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
      >
        <Sparkles />
        {isPending ? "Preparing your demo..." : "Try the live demo"}
      </Button>

      <p className="mt-2 text-center text-xs text-gray-500">
        No account needed. You get a private sample collection to play with.
      </p>

      {errorMessage ? <ErrorMessage messages={[errorMessage]} /> : null}
    </form>
  );
};

export default DemoButton;
