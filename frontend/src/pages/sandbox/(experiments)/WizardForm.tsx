import { useState } from "react";

export default function WizardForm() {
  const [currStep, setCurrStep] = useState(0);
  const steps: JSX.Element[] = [
    <fieldset key={0} title="General">
      0
    </fieldset>,
    <fieldset key={1} title="Maps">
      1
    </fieldset>,
    <fieldset key={2} title="PoI">
      2
    </fieldset>,
  ];

  const nextStep = () => {
    if (currStep < steps.length - 1) setCurrStep(currStep + 1);
  };
  const prevStep = () => {
    if (currStep > 0) setCurrStep(currStep - 1);
  };

  return (
    <form>
      <nav>
        <ul>
          {steps.map((step, idx) => {
            return <li key={idx}>{idx}</li>;
          })}
        </ul>
      </nav>
      {steps.filter((step, idx) => idx === currStep && step)}
      <button type="button" onClick={prevStep}>
        Prev
      </button>
      <button type="button" onClick={nextStep}>
        Next
      </button>
    </form>
  );
}
