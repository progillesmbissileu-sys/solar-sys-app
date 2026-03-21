'use client';

import { FormComponent,FormField, FormWrapper } from '@/shared/ui';

import loginAction from '../api/actions';
import { formOpts } from '../config/shared';

export default function LoginView({ redirectTo }: { redirectTo?: string }) {
  return (
    <div className="h-screen w-screen content-center">
      <div className="mx-auto flex h-2/3 flex-col justify-center gap-y-12 rounded-md p-3 xl:w-1/3">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100">login.pageTitle</h1>
        </div>
        <div className="mx-auto w-4/5">
          <FormWrapper formOptions={formOpts} serverAction={loginAction.bind(null, redirectTo)}>
            <div className="space-y-6">
              <div className="flex items-center space-x-2" data-testid="email">
                <div className="w-full">
                  <FormField.Email
                    name="email"
                    placeholder="common.emailAddress"
                    inputClassName="!h-12"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2" data-testid="password">
                <div className="w-full">
                  <FormField.Password
                    name="password"
                    placeholder="common.password"
                    inputClassName="!h-12"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 pt-3">
                <div className="flex items-center gap-x-2">
                  <FormField.Checkbox name="remember" />
                  <span className="text-sm text-gray-700 dark:text-gray-400">login.rememberMe</span>
                </div>
                <FormComponent.SubmitButton label="action.submit" className="!h-12 w-full" />
              </div>
            </div>
          </FormWrapper>
        </div>
        {/*<div className="pl-7">*/}
        {/*  <p className="text-center text-sm text-gray-400 dark:text-gray-600">*/}
        {/*    <a href="#" className="underline underline-offset-[3px]">*/}
        {/*      login.forgotPassword*/}
        {/*    </a>*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
