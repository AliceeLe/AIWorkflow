"use client";

import { useState } from "react";
import StepOne from "./StepOne";
import StepTwoA from "./StepTwoA";
import StepTwoB from "./StepTwoB";
import StepTwoC from "./StepTwoC";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import Result from "./Result";

type Step =
  | "step1"
  | "step2A"
  | "step2B"
  | "step2C"
  | "step3"
  | "step4"
  | "result";

export default function FlowContainer() {
  const [history, setHistory] = useState<Step[]>(["step2A"]);
  const [data, setData] = useState<any>({});

  const step = history[history.length - 1];

  const goForward = (newStep: Step, newData?: any) => {
    if (newData) {
      setData((prev: any) => ({ ...prev, ...newData }));
    }
    setHistory((prev) => [...prev, newStep]);
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const goToStep2 = (choice: string) => {
    if (choice === "A") goForward("step2A");
    if (choice === "B") goForward("step2B");
    if (choice === "C") goForward("step2C");
  };

  return (
    <div className="max-w-3xl mx-auto rounded-2xl shadow-lg relative">
      
      {history.length > 1 && (
        <button
          onClick={goBack}
          className="absolute left-6 top-6 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back
        </button>
      )}

      {step === "step1" && <StepOne onNext={goToStep2} />}
      {step === "step2A" && <StepTwoA onNext={(d) => goForward("step3", d)} />}
      {step === "step2B" && <StepTwoB onNext={(d) => goForward("step3", d)} />}
      {step === "step2C" && <StepTwoC onNext={(d) => goForward("step3", d)} />}
      {step === "step3" && <StepThree onNext={(d) => goForward("step4", d)} />}
      {step === "step4" && <StepFour onNext={(d) => goForward("result", d)} />}
      {step === "result" && <Result data={data} />}
    </div>
  );
}
