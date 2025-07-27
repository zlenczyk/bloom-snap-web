"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown as ShowOptionsIcon } from "lucide-react";
import { useState } from "react";
import Tags from "./Tags";

type MultiSelectTagInputProps = {
  className?: string;
  emptyMessage?: string;
  onChange: (selectedItems: string[]) => void;
  options: Record<string, string[]>;
  selectedItems: string[];
};

const MultiSelectTagInput = ({
  className,
  emptyMessage = "No options found.",
  onChange,
  options,
  selectedItems,
}: MultiSelectTagInputProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filteredOptions = Object.entries(options).reduce(
    (filtered, [category, tags]) => {
      const matchingTags = tags.filter((tag) =>
        tag.toLowerCase().includes(inputValue.toLowerCase())
      );

      if (matchingTags.length > 0) {
        filtered[category] = matchingTags;
      }

      return filtered;
    },
    {} as Record<string, string[]>
  );

  const addCustomTag = () => {
    if (inputValue && !selectedItems.includes(inputValue)) {
      onChange([...selectedItems, inputValue]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addCustomTag();
    }

    if (e.key === "Backspace" && !inputValue && selectedItems.length > 0) {
      onChange(selectedItems.slice(0, -1));
    }
  };

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      onChange(selectedItems.filter((i) => i !== item));
    } else {
      onChange([...selectedItems, item]);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10 px-3 py-2"
          >
            <Tags selectedItems={selectedItems} toggleOption={toggleItem} />
            <ShowOptionsIcon className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search or add custom tag..."
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleKeyDown}
              className="h-9"
            />
            <CommandList className="max-h-[300px] overflow-auto">
              {Object.keys(filteredOptions).length === 0 && (
                <CommandEmpty>{emptyMessage}</CommandEmpty>
              )}

              {Object.entries(filteredOptions).map(([group, items]) => (
                <CommandGroup
                  key={group}
                  heading={group.charAt(0).toUpperCase() + group.slice(1)}
                >
                  {items.map((item) => (
                    <CommandItem
                      key={item}
                      value={item}
                      onSelect={() => toggleItem(item)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedItems.includes(item)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}

              <CommandGroup>
                {inputValue && !selectedItems.includes(inputValue) && (
                  <>
                    <CommandSeparator />
                    <CommandItem
                      value={`add-${inputValue}`}
                      onSelect={() => addCustomTag()}
                      className="text-sm"
                    >
                      Add{" "}
                      <span className="font-medium">
                        &quot;{inputValue}&quot;
                      </span>
                    </CommandItem>
                  </>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelectTagInput;
