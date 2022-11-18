import React, { useState } from "react";
import { Stepper, Step, Button, StepLabel, Typography } from "@mui/material";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import FinalStep from "./FinalStep";
import { useTranslation } from "react-i18next";

const MultistepForm = () => {

    //react hooks

    const [activeStep, setActiveStep] = useState(0);

    function getSteps() {
        return ["START REGISTRATION", "CONTINUE", "COMPLETE"];
    }

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    function getStepsContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <FirstStep
                    handleNext={handleNext}
                    activeStep={activeStep}
                    steps={steps}
                />
            case 1:
                return <SecondStep
                    handleNext={handleNext}
                    activeStep={activeStep}
                    steps={steps} />
            case 2:
                return <FinalStep />
            default:
                return "Uncknown step";
        }
    }

    const { t, i18n } = useTranslation();

    function clickLanguage(lang) {
        i18n.changeLanguage(lang);
    }

    return (
        <div className="backgroundImage">

            <nav className="navigation">
                <Button onClick={() => clickLanguage('en')}> {t('English.1')} </Button>
                <Button onClick={() => clickLanguage('srb')}> {t('Serbian.1')} </Button>
                <Button onClick={() => clickLanguage('es')}> {t('Spanish.1')} </Button>
            </nav>

            <div className="Stepper">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    {activeStep === steps.length ? (
                        <Typography className="instructions">
                            All steps completed
                        </Typography>
                    ) : (
                            <div className="instructions">
                                {getStepsContent(activeStep)}
                            </div>
                        )}
                </>
            </div>
        </div>
    )
}

export default MultistepForm;