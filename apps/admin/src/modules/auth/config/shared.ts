import { formOptions } from "@tanstack/react-form"
import { z } from "zod"

export const formOpts = formOptions({
  validators: {
    onSubmit: z.object({ email: z.email(), password: z.string().min(6) }),
  },
})
