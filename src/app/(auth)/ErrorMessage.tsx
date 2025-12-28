import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
import React from "react";

type Props = {
  messages: string[];
};

const ErrorMessage = ({ messages }: Props) => {
  return messages.length > 0 ? (
    <div>
      {messages.map((message, index) => (
        <div className="text-destructive flex gap-1" key={`${message}-${index}`}>
          <CircleAlert size={20} className="shrink-0" />
          <p className={cn("text-[0.8rem] font-medium flex gap-2")} key={index}>
            {message}
          </p>
        </div>
      ))}
    </div>
  ) : null;
};

export default ErrorMessage;
