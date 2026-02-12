"use client"

import { FormField, FormWrapper } from "@/shared/ui/organisms/Form"
import { z } from "zod"
import { SubmitButton } from "@/shared/ui/organisms/Form/SubmitButton"

export default function LoginView() {
  return (
    <div className="h-screen w-screen content-center">
      <div className="mx-auto rounded-md border bg-white p-3 xl:w-[30%]">
        <FormWrapper
          schema={z.object({ email: z.email(), password: z.string() })}
          onSubmit={async (payload) => console.log(payload)}
        >
          <FormField.Email name="email" label="Email" />
          <FormField.Password name="password" label="Password" />
          <SubmitButton label="action.submit" />
        </FormWrapper>
      </div>
    </div>
  )
}
