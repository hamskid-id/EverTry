"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type DropdownSeparator = {
  separator: true;
};

export type DropdownMenuItemType = {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  subItems?: DropdownItem[];
  content?: never;
  avatar?: string;
  selected?: boolean;
};

export type DropdownContentItem = {
  content: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  label?: never;
  icon?: never;
  subItems?: never;
};

export type DropdownItem =
  | DropdownSeparator
  | DropdownMenuItemType
  | DropdownContentItem;

interface CustomDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
  label?: string;
  disabled?: boolean;
  contentClassName?: string;
  open?: boolean; // Add controlled open prop
  onOpenChange?: (open: boolean) => void; // Add onOpenChange prop
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  trigger,
  items,
  className,
  label,
  disabled = false,
  contentClassName,
  open,
  onOpenChange,
  align = "start",
  sideOffset = 5,
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-[280px] bg-[#1A1D21] border-[#363A3D] text-white",
          contentClassName
        )}
        align={align}
        sideOffset={sideOffset}
        onCloseAutoFocus={(e) => {
          e.preventDefault(); // Prevent focus from moving on close
        }}
      >
        {label && (
          <DropdownMenuLabel className="text-[#ABB8C4] text-xs font-normal px-4 py-2">
            {label}
          </DropdownMenuLabel>
        )}

        {items.map((item, index) => {
          if ("separator" in item && item.separator) {
            return (
              <DropdownMenuSeparator
                key={`separator-${index}`}
                className="bg-[#363A3D]"
              />
            );
          }

          if ("content" in item && item.content) {
            return (
              <DropdownMenuItem
                key={`content-${index}`}
                onClick={item.onClick}
                disabled={item.disabled}
                className="p-0 focus:bg-[#363A3D] focus:text-white"
                onSelect={(e) => {
                  if (item.onClick) {
                    item.onClick();
                  }
                  e.preventDefault(); // Prevent dropdown from closing
                }}
              >
                {item.content}
              </DropdownMenuItem>
            );
          }

          if ("label" in item) {
            if (item.subItems && item.subItems.length > 0) {
              return (
                <DropdownMenuSub key={`submenu-${index}`}>
                  <DropdownMenuSubTrigger className="focus:bg-[#363A3D] focus:text-white">
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-[#1A1D21] border-[#363A3D]">
                    {item.subItems.map((subItem, subIndex) => {
                      if ("separator" in subItem && subItem.separator) {
                        return (
                          <DropdownMenuSeparator
                            key={`sub-separator-${subIndex}`}
                            className="bg-[#363A3D]"
                          />
                        );
                      }

                      if ("label" in subItem) {
                        return (
                          <DropdownMenuItem
                            key={`subitem-${subIndex}`}
                            onClick={subItem.onClick}
                            disabled={subItem.disabled}
                            className="focus:bg-[#363A3D] focus:text-white"
                            onSelect={(e) => {
                              if (subItem.onClick) {
                                subItem.onClick();
                              }
                              e.preventDefault();
                            }}
                          >
                            {subItem.icon && (
                              <span className="mr-2">{subItem.icon}</span>
                            )}
                            {subItem.label}
                          </DropdownMenuItem>
                        );
                      }

                      return null;
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              );
            }

            return (
              <DropdownMenuItem
                key={`item-${index}`}
                onClick={item.onClick}
                disabled={item.disabled}
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#363A3D] focus:bg-[#363A3D] focus:text-white transition-colors"
                onSelect={(e) => {
                  if (item.onClick) {
                    item.onClick();
                  }
                  e.preventDefault(); // Keep dropdown open after selection
                }}
              >
                <div className="flex items-center gap-3">
                  {"avatar" in item && item.avatar && (
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold",
                        item.avatar === "SS" && "bg-blue-500",
                        item.avatar === "AW" && "bg-purple-500",
                        item.avatar === "AS" && "bg-red-500"
                      )}
                    >
                      {item.avatar}
                    </div>
                  )}
                  {item.icon && !("avatar" in item && item.avatar) && (
                    <span className="mr-2">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </div>
                {"selected" in item && item.selected && (
                  <Check size={16} className="text-[#24AE7C]" />
                )}
              </DropdownMenuItem>
            );
          }

          return null;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(CustomDropdown);
