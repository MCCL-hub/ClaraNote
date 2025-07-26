interface ProcessStepperProps {
  currentStep: number;
}

export function ProcessStepper({ currentStep }: ProcessStepperProps) {
  const steps = [
    { number: 1, label: "Upload" },
    { number: 2, label: "Transcription" },
    { number: 3, label: "Résumé" },
    { number: 4, label: "Export" },
  ];

  const getStepClass = (stepNumber: number) => {
    if (stepNumber < currentStep) return "step-completed";
    if (stepNumber === currentStep) return "step-active";
    return "step-inactive";
  };

  const getProgressWidth = (stepIndex: number) => {
    if (stepIndex < currentStep - 1) return "100%";
    if (stepIndex === currentStep - 1) return "50%";
    return "0%";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 md:space-x-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getStepClass(step.number)}`}>
                {step.number}
              </div>
              <span className={`ml-2 text-sm font-medium ${currentStep >= step.number ? 'text-primary' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 h-1 bg-gray-200 ml-4">
                <div 
                  className="h-full progress-bar transition-all duration-300" 
                  style={{ width: getProgressWidth(index) }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
