import React from "react";
import useForm from "./useForm";
import { Typography, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const FirstStep = ({ activeStep, steps, handleNext }) => {

    const { t } = useTranslation();

    const stateSchema = {
        firstName: { value: "", error: "" },
        lastName: { value: "", error: "" },
    }

    const stateValidatorSchema = {
        firstName: {
            requried: true,
            validator: {
                func: value => /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-]+)*/.test(value),
                error: "First name must be more than 1 character."
            }
        },
        lastName: {
            requried: true,
            validator: {
                func: value => /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-])*/.test(value),
                error: "Last name must be more than 3 characters."
            }
        }
    }

    const { values, errors, dirty, handleOnChange } = useForm(stateSchema, stateValidatorSchema);
    const { firstName, lastName } = values;

    return (

        <div className="mainContainer">
            <Typography variant="h5"
                style={{ color: "rgba(128,64,64,255)", textAlign: "center" }}>
                {t('Fill the data to continue.1')}
            </Typography>

            <div className="formContainer">
                <form>
                    <TextField className="inputField"
                        style={{ width: "100%", margin: "1rem 0" }}
                        label={t('First Name.1')}
                        variant="outlined"
                        name="firstName"
                        value={firstName}
                        onChange={handleOnChange}
                    />
                    {errors.firstName && dirty.firstName && (
                        <Typography
                            style={{ marginTop: "0", color: "blue", fontWeight: "200" }}
                        >{errors.firstName}
                        </Typography>
                    )}
                    <TextField className="inputField"
                        style={{ width: "100%" }}
                        label={t('Last Name.1')}
                        variant="outlined"
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                    />
                    {errors.lastName && dirty.lastName && (
                        <Typography
                            style={{ marginTop: "0", color: "blue", fontWeight: "200" }}
                        >{errors.lastName}
                        </Typography>
                    )}
                    {
                        !firstName || !lastName
                            ?
                            (
                                // <>
                                <Button className="disabledButton" disabled variant="contained">
                                    {activeStep === steps.length ? "Finish" : "Continue"}
                                </Button>
                                // </>
                            ) : (
                                // <>
                                <Button className="button" onClick={handleNext} variant="contained">
                                    {activeStep === steps.length ? "Finish" : "Continue"}
                                </Button>
                                // </>
                            )
                    }
                </form>
            </div>
        </div >
    )
}

export default FirstStep;