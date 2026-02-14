"use server"

import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form-nextjs"
import { formOpts } from "../config/shared"

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: () => {},
})

export default async function loginAction(_prev: unknown, formData: FormData) {
  console.log("FORM DATA", formData.get("email"), formData.get("password"))
  try {
    await serverValidate(formData)
  } catch (error) {
    if (error instanceof ServerValidateError) {
      return error.formState
    }

    throw error
  }
}
