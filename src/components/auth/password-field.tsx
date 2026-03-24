"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

import { CustomLink } from "../custom-link";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type PasswordFieldProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, any>;
  fieldState: ControllerFieldState;
  label?: string;
  showForgotPassword?: boolean;
  placeholder?: string;
};

export function PasswordField<T extends FieldValues>({
  field,
  fieldState,
  label = "Password",
  showForgotPassword = false,
  placeholder,
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    if (!e.target.value) {
      setShowPassword(false);
    }
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

        {showForgotPassword && (
          <CustomLink href="/forgot-password" className="underline text-sm">
            Forgot your password?
          </CustomLink>
        )}
      </div>

      <div className="relative">
        <Input
          {...field}
          id={field.name}
          type={showPassword ? "text" : "password"}
          aria-invalid={fieldState.invalid}
          placeholder={placeholder}
          autoComplete="off"
          onChange={handleChange}
          className="pr-10"
        />

        {field.value && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
