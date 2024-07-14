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
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

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
  className?: string;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div
          className={`flex rounded-md border border-dark-500 bg-dark-400 ${props.className}`}
        >
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              alt={props.iconAlt || "icons"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl className="flex-grow">
            <Input
              placeholder={props.placeholder}
              className="shad-input border-0 w-full"
              {...field}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl className="flex-grow">
          <PhoneInput
            onChange={field.onChange}
            defaultCountry="UA"
            international
            withCountryCallingCode
            value={field.value as E164Number}
            className="input-phone border-dark-500 border w-full"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div
          className={`flex rounded-md border border-dark-500 bg-dark-400 ${props.className}`}
        >
          <Image
            src={"/assets/icons/calendar.svg"}
            width={24}
            height={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl className="flex-grow">
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={props.showTimeSelect}
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              timeInputLabel="Time:"
              wrapperClassName="date-picker w-full"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? (
        props.renderSkeleton(field)
      ) : (
        <div>Hello skeleton</div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            className="shad-textArea"
            placeholder={props.placeholder}
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const {
    control,
    fieldType,
    placeholder,
    name,
    label,
    iconSrc,
    iconAlt,
    className,
  } = props;
  // Check if the field is optional and add "(optional)" to the label if it is.
  const isOptional = [
    "allergies",
    "currentMedication",
    "familyMedicalHistory",
    "pastMedicalHistory",
    "identificationType",
    "identificationNumber",
    "identificationDocumentUrl",
  ].includes(name);
  return (
    <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>
                {label} {isOptional && "(optional)"}
              </FormLabel>
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
