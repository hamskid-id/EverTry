"use client";

import {
  Controller,
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
  FieldPath,
} from "react-hook-form";
import { memo, ReactNode, useState } from "react";
import Image from "next/image";
import { Eye, EyeClosed } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormFieldType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = string | { label: string; value: string };
type OptionArray = Option[] | readonly Option[];

interface CustomProps<T extends FieldValues> {
  control?: Control<T>;
  fieldType: FormFieldType;
  name: Path<T>;
  label?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  options?: OptionArray;
  iconSrc?: string;
  iconAlt?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  className?: string;
  renderSkeleton?: (field: ControllerRenderProps<T, FieldPath<T>>) => ReactNode;
  min?: number;
  max?: number;
  step?: number;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyPress?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: () => void;
}

interface RenderFieldProps<T extends FieldValues> {
  field?: ControllerRenderProps<T, FieldPath<T>>;
  props: CustomProps<T>;
}

const InputWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={cn(
      "relative p-[1px] rounded-[8px] h-[48px] bg-[#363A3D] transition-all duration-200",
      "focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C]",
      className
    )}
  >
    <div className="w-full h-full bg-[#1A1D21] rounded-[7px] px-4 flex items-center gap-x-4">
      {children}
    </div>
  </div>
);

const RenderField = <T extends FieldValues>({
  field,
  props,
}: RenderFieldProps<T>) => {
  const {
    fieldType,
    disabled,
    placeholder,
    options,
    className,
    icon,
    iconSrc,
    iconAlt,
    min,
    max,
    step,
    value: externalValue,
    onChange: externalOnChange,
    onKeyPress,
    onBlur: externalOnBlur,
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const renderIcon = () => {
    if (!icon && !iconSrc) return null;

    return typeof iconSrc === "string" ? (
      <Image
        src={iconSrc}
        height={20}
        width={20}
        alt={iconAlt || "icon"}
        className="flex-shrink-0"
      />
    ) : (
      <div className="flex-shrink-0 text-[#A3A3A3]">{icon}</div>
    );
  };

  const commonProps = {
    disabled,
    placeholder,
    className:
      "w-full h-full bg-transparent text-white text-[14px] placeholder:text-[#A3A3A3] placeholder:font-light outline-none focus:bg-gradient-to-r focus:from-[#82DBF7] focus:to-[#B6F09C] focus:bg-clip-text focus:text-transparent",
  };

  const getInputProps = () => {
    if (field) {
      return {
        ...field,
        ...commonProps,
      };
    }

    return {
      ...commonProps,
      value: externalValue,
      onChange: externalOnChange,
      onKeyPress,
      onBlur: externalOnBlur,
    };
  };

  const getTextareaProps = () => {
    const baseProps = getInputProps();
    return {
      ...baseProps,
      className:
        "w-full px-3 py-2 text-[12px] min-h-[9rem] border border-[#363A3D] rounded-lg bg-[#1A1D21] overflow-y-auto resize-none text-white placeholder:text-[#a3a3a3] placeholder:font-normal outline-none focus:border-transparent focus:ring-2 focus:ring-transparent relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-[#82DBF7] before:to-[#B6F09C] focus:before:opacity-100 before:opacity-0",
    };
  };

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <InputWrapper className={className}>
          {renderIcon()}
          <input {...getInputProps()} />
        </InputWrapper>
      );

    case FormFieldType.EMAIL:
      return (
        <InputWrapper className={className}>
          {renderIcon()}
          <input type="email" {...getInputProps()} />
        </InputWrapper>
      );

    case FormFieldType.PASSWORD:
      return (
        <InputWrapper className={className}>
          <input
            type={isPasswordVisible ? "text" : "password"}
            {...getInputProps()}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <Eye className="text-[#A3A3A3]" size={20} />
            ) : (
              <EyeClosed className="text-[#A3A3A3]" size={20} />
            )}
          </button>
        </InputWrapper>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <InputWrapper className={className}>
          {renderIcon()}
          <input type="tel" {...getInputProps()} />
        </InputWrapper>
      );

    case FormFieldType.NUMBER:
      return (
        <InputWrapper className={className}>
          {renderIcon()}
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            {...getInputProps()}
          />
        </InputWrapper>
      );

    case FormFieldType.DATE:
      return (
        <InputWrapper className={className}>
          {renderIcon()}
          <input type="date" {...getInputProps()} />
        </InputWrapper>
      );

    case FormFieldType.TEXTAREA:
      return <textarea {...getTextareaProps()} />;

    case FormFieldType.SELECT:
      return (
        <InputWrapper className={className}>
          {field ? (
            <Select
              onValueChange={field.onChange}
              value={field.value || ""}
              disabled={disabled}
            >
              <SelectTrigger className="w-full border-none bg-none h-12 p-0 rounded-lg text-left bg-transparent focus:ring-0 focus:ring-none">
                <SelectValue
                  placeholder={placeholder || "Select an option..."}
                />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => {
                  const value =
                    typeof option === "string" ? option : option.value;
                  const label =
                    typeof option === "string" ? option : option.label;
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          ) : (
            <Select
              onValueChange={(value) => {
                if (externalOnChange) {
                  externalOnChange({ target: { value } } as any);
                }
              }}
              value={externalValue || ""}
              disabled={disabled}
            >
              <SelectTrigger className="w-full border-none bg-none h-12 p-0 rounded-lg text-left bg-transparent focus:ring-0 focus:ring-none">
                <SelectValue
                  placeholder={placeholder || "Select an option..."}
                />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => {
                  const value =
                    typeof option === "string" ? option : option.value;
                  const label =
                    typeof option === "string" ? option : option.label;
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </InputWrapper>
      );

    default:
      return null;
  }
};

const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, fieldType, label, name } = props;

  return (
    <div className="flex flex-col gap-y-2">
      {fieldType !== FormFieldType.CHECKBOX && label && (
        <label className="text-sm capitalize font-[400] text-[#ABB8C4]">
          {label}
        </label>
      )}

      {control ? (
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <>
              <RenderField field={field} props={props} />
              {fieldState.error && (
                <p className="text-sm font-normal text-red-400">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      ) : (
        <RenderField props={props} />
      )}
    </div>
  );
};

export default memo(CustomFormField) as typeof CustomFormField;
