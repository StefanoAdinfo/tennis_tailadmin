import { useEffect, useState } from "react";

import PageMeta from "../../components/common/PageMeta";
import { Separator } from "../../components/ui/separator/Separator";
import Button from "../../components/ui/button/Button";
import Step1 from "../../components/reservation/step1";
import Step2 from "../../components/reservation/step2";
import Step3 from "../../components/reservation/step3";

export default function Reservation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  useEffect(() => {
    if (currentStep) {
      if (currentStep > 1) setPrevBtnDisabled(false);
      else setPrevBtnDisabled(true);
      if (currentStep == 3) setNextBtnDisabled(true);
      else setNextBtnDisabled(false);
    }
  }, [currentStep]);
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };
  return (
    <>
      <Separator color="gray" className="my-5" />
      <div className="flex w-full mb-5 gap-4 justify-between">
        {[
          { step: 1, label: "Seleziona un giorno" },
          { step: 2, label: "Seleziona un orario" },
          { step: 3, label: "Completa e Prenota!" },
        ].map(({ step, label }) => (
          <ol
            className="justify-center w-full flex items-center mb-5"
            key={step}
          >
            <li
              className={`${
                currentStep === step
                  ? "text-brand-500 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              } flex-1 flex flex-col md:flex-row gap-2.5 justify-center items-center`}
            >
              <span
                className={`${
                  currentStep == step
                    ? " border-brand-500 dark:border-white"
                    : " border-gray-400 "
                } flex items-center justify-center w-8 h-8 border rounded-full shrink-0 `}
              >
                {step}
              </span>
              <span>
                <h3 className="font-medium leading-tight text-center">
                  {label}
                </h3>
              </span>
            </li>
          </ol>
        ))}
      </div>

      <div className="w-full mb-5">{renderStepContent()}</div>

      <div className="flex justify-between ">
        <Button
          disabled={prevBtnDisabled}
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
        >
          Indietro
        </Button>
        <Button
          disabled={nextBtnDisabled}
          onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
        >
          Avanti
        </Button>
      </div>
    </>
  );
}
