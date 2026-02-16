"use client"

import {
  FormField,
  FormWrapper,
  FormComponent,
} from "@/shared/ui/organisms/Form"
import { AtSign, KeyRound } from "lucide-react"
import loginAction from "../api/actions"
import { formOpts } from "../config/shared"

export default function LoginView() {
  return (
    <div className="h-screen w-screen content-center">
      <div className="mx-auto flex h-2/3 flex-col justify-center gap-y-12 rounded-md bg-white p-3 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_0px_0px_1px_rgba(27,31,35,0.15)] xl:w-1/3 dark:bg-dark">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100">
            login.pageTitle
          </h1>
        </div>
        <div className="mx-auto w-4/5">
          <FormWrapper formOptions={formOpts} serverAction={loginAction}>
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
              <div className="flex flex-col items-center gap-2 pl-7 pt-3">
                <div className="flex items-center gap-x-2">
                  <FormField.Checkbox name="remember" />
                  <span className="text-sm text-gray-700 dark:text-gray-400">
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
          <p className="text-center text-sm text-gray-400 dark:text-gray-600">
            <a href="#" className="underline underline-offset-[3px]">
              login.forgotPassword
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
