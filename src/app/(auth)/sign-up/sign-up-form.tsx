"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ActionButton } from "@/components/action-button";
import { PasswordField } from "@/components/auth/password-field";
import { CustomLink } from "@/components/custom-link";
import { Alert } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/routes";
import { SignUpType, signUpSchema } from "@/lib/validation";

export function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  useEffect(() => {
    form.reset(form.formState.defaultValues);
  }, [form]);

  async function onSubmit({ email, password, name }: SignUpType) {
    setError(null);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      setError(error.message || "Something went wrong");
    } else {
      toast.success("Signed up successfully");
      router.push(ROUTES.VERIFY_EMAIL);
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-sm w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Create your <span className="text-brand">Careerly</span> account
          </CardTitle>
          <CardDescription>
            Fill in the fields below to sign up to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="error" className="mb-4 flex items-center flex-wrap">
              {error}
            </Alert>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="your@email.com"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <PasswordField
                    field={field}
                    fieldState={fieldState}
                    label="Password"
                    placeholder="Create a password"
                  />
                )}
              />

              <Controller
                name="passwordConfirmation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <PasswordField
                    field={field}
                    fieldState={fieldState}
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                  />
                )}
              />
            </FieldGroup>

            <ActionButton loading={loading} className="w-full mt-4">
              Create an account
            </ActionButton>
          </form>
        </CardContent>

        <CardFooter>
          <div className="flex w-full justify-center">
            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <CustomLink href="/sign-in" className="underline">
                Sign in
              </CustomLink>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
