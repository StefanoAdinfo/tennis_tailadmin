import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Accedi
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Inserisci il tuo indirizzo email e la tua password
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="inserisci la tua email" />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="inserisci la tua password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-3 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="stroke-gray-500 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Link to="/">
                    <Button className="w-full" size="sm">
                      Acccedi
                    </Button>
                  </Link>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  Non ha ancora un account?{" "}
                  <Link
                    to="/signup"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Registrati
                  </Link>
                </p>
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Password dimenticata?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
