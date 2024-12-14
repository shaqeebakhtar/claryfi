import { CheckIcon, ChevronsUpDown, Tag, XIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Tag as TTag } from '@prisma/client';

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: TTag[] | undefined;
  onValueChange: (value: TTag[]) => void;
  placeholder?: string;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      placeholder = 'Select options...',
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<TTag[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: TTag) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const tagColors = [
      {
        name: 'Gray',
        tagClass: 'bg-gray-50 text-gray-600 border border-gray-200',
        buttonClass: 'bg-gray-500',
      },
      {
        name: 'Red',
        tagClass: 'bg-red-50 text-red-600 border border-red-200',
        buttonClass: 'bg-red-500',
      },
      {
        name: 'Orange',
        tagClass: 'bg-orange-50 text-orange-600 border border-orange-200',
        buttonClass: 'bg-orange-500',
      },
      {
        name: 'Cyan',
        tagClass: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
        buttonClass: 'bg-cyan-500',
      },
      {
        name: 'Green',
        tagClass: 'bg-green-50 text-green-600 border border-green-200',
        buttonClass: 'bg-green-500',
      },
      {
        name: 'Blue',
        tagClass: 'bg-blue-50 text-blue-600 border border-blue-200',
        buttonClass: 'bg-blue-500',
      },
      {
        name: 'Yellow',
        tagClass: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
        buttonClass: 'bg-yellow-500',
      },
      {
        name: 'Purple',
        tagClass: 'bg-purple-50 text-purple-600 border border-purple-200',
        buttonClass: 'bg-purple-500',
      },
    ];

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              'flex w-full p-1 rounded-md border border-input items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto shadow-none font-normal',
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag className="size-4 text-muted-foreground ml-3 mr-1" />
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options?.find((o) => o.name === value.name);
                    return (
                      <div
                        key={option?.id}
                        className={cn(
                          'flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-sm',
                          tagColors.find(
                            (color) =>
                              color.name.toLowerCase() ===
                              option?.color.toLowerCase()
                          )?.tagClass
                        )}
                      >
                        {option?.name}
                      </div>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <div
                      className={cn(
                        'border-transparent bg-secondary text-muted-foreground hover:bg-secondary/80 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                      )}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  />
                  <ChevronsUpDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-muted-foreground ml-3" />
                  <span className="text-sm text-muted-foreground">
                    {placeholder}
                  </span>
                </div>
                <ChevronsUpDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[--radix-popover-trigger-width]"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => {
                  const isSelected = selectedValues.includes(option);
                  return (
                    <CommandItem
                      key={option.id}
                      onSelect={() => toggleOption(option)}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon className="size-3" />
                      </div>
                      <div
                        className={cn(
                          'flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-sm',
                          tagColors.find(
                            (color) =>
                              color.name.toLowerCase() ===
                              option.color.toLowerCase()
                          )?.tagClass
                        )}
                      >
                        {option.name}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
