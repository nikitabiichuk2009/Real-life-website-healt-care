"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Control } from "react-hook-form";
import { Input } from "./ui/input";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Ensure you have this imported
import { E164Number } from "libphonenumber-js/core";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  placeholder?: string;
  name: string;
  label?: string;
  iconSrc?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  iconAlt?: string;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              alt={props.iconAlt || "icons"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              className="shad-input border-0"
              {...field}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            onChange={field.onChange}
            defaultCountry="UA"
            international
            withCountryCallingCode
            value={field.value as E164Number}
            className="input-phone"
          />
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, placeholder, name, label, iconSrc, iconAlt } =
    props;
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
