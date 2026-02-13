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
      <div className="mx-auto rounded-md border bg-white p-3 py-48 xl:w-1/3">
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
                  <FormField.Email name="email" placeholder="Addresse e-mail" />
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
                    placeholder="Mot de passe"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 pl-7 pt-6">
                <div className="flex items-center gap-x-2">
                  <FormField.Checkbox name="remember" />
                  <span className="text-sm text-gray-700">
                    Se souvenir de moi
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
      </div>
    </div>
  )
}
