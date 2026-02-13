"use client"

import {
  FormField,
  FormWrapper,
  FormComponent,
} from "@/shared/ui/organisms/Form"
import { z } from "zod"
import { AtSign, KeyRound } from "lucide-react"

export default function LoginView() {
  return (
    <div className="h-screen w-screen content-center">
      <div className="mx-auto flex h-2/3 flex-col justify-center gap-y-12 rounded-md border bg-white p-3 xl:w-1/3">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100">
            login.pageTitle
          </h1>
        </div>
        <div className="mx-auto w-4/5">
          <FormWrapper
            schema={z.object({ email: z.email(), password: z.string() })}
            onSubmit={async (payload) => console.log(payload)}
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-2" data-testid="email">
                <div>
                  <AtSign
                    size={20}
                    className="text-gray-400 dark:text-gray-600"
                  />
                </div>
                <div className="w-full">
                  <FormField.Email
                    name="email"
                    placeholder="common.emailAddress"
                  />
                </div>
              </div>
              <div
                className="flex items-center space-x-2"
                data-testid="password"
              >
                <div>
                  <KeyRound
                    size={20}
                    className="text-gray-400 dark:text-gray-600"
                  />
                </div>
                <div className="w-full">
                  <FormField.Password
                    name="password"
                    placeholder="common.password"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 pl-7 pt-6">
                <div className="flex items-center gap-x-2">
                  <FormField.Checkbox name="remember" />
                  <span className="text-sm text-gray-700">
                    login.rememberMe
                  </span>
                </div>
                <FormComponent.SubmitButton
                  label="action.submit"
                  className="w-full"
                />
              </div>
            </div>
          </FormWrapper>
        </div>
        <div className="pl-7">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="underline">
              login.forgotPassword
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
