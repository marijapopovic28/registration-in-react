import React, { useState } from "react";
import useForm from "./useForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Typography, Button, Checkbox, TextField, OutlinedInput, FormControl, InputLabel, InputAdornment, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

const SecondStep = ({ activeStep, steps, handleNext }) => {

    const { t } = useTranslation();

    const stateSchema = {
        username: { value: "", error: "" },
        email: { value: "", error: "" },
        password: { value: "", error: "" },
        confirmPassword: { value: "", error: "" },
        termsAndConditions: { value: "", error: "" }
    }

    const stateValidatorSchema = {
        username: {
            requried: true,
            validator: {
                func: value => /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-]+)*/.test(value),
                error: "Username must be more than 1 character."
            }
        },
        email: {
            requried: true,
            validator: {
                func: value => /^(?=.{1,81}$)[\w\.-]+@[\w\.-]+\.\w{2,4}$/.test(value),
                error: "Email format is not correct."
            }
        },
        password: {
            requried: true,
            validator: {
                func: value => /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(value),
                error: "At least one special charachter and minimum 6 characters."
            }
        },
        termsAndConditions: {
            requried: true,
            error: "You must agree with the terms and conditions",
        }
    }

    const { values, errors, dirty, handleOnChange } = useForm(stateSchema, stateValidatorSchema);
    const { username, email, password, confirmPassword, termsAndConditions } = values;

    const [showPasswordValue, setShowPasswordValue] = useState({
        showPassword: false
    });

    const [showConfirmPasswordValue, setShowConfirmPasswordValue] = useState({
        showConfirmPassword: false
    });

    const handleClickShowPassword = () => {
        setShowPasswordValue({
            showPassword: !showPasswordValue.showPassword
        })
    }

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPasswordValue({
            showConfirmPassword: !showConfirmPasswordValue.showConfirmPassword
        })
    }

    return (
        <div className="mainContainer">
            <Typography variant="h5"
                style={{ color: "#999", textAlign: "center" }}>
            </Typography>

            <div className="formContainer">
                <form>
                    <TextField className="inputField"
                        style={{ width: "100%", margin: "1rem 0" }}
                        label={t('Username.1')}
                        variant="outlined"
                        name="username"
                        value={username}
                        onChange={handleOnChange}
                    />
                    {errors.username && dirty.username && (
                        <Typography
                            style={{ marginTop: "0", color: "blue", fontWeight: "200" }}
                        >{errors.username}
                        </Typography>
                    )}
                    <TextField className="inputField"
                        style={{ width: "100%", marginBottom: "1rem" }}
                        label={t('Email.1')}
                        variant="outlined"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                    />
                    {errors.email && dirty.email && (
                        <Typography
                            style={{ marginTop: "0", color: "blue", fontWeight: "200" }}
                        >{errors.email}
                        </Typography>
                    )}

                    <FormControl className="inputField" variant="outlined">
                        <InputLabel> {t('Password.1')} </InputLabel>
                        <OutlinedInput
                            style={{ marginBottom: "1rem" }}
                            type={showPasswordValue.showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            endAdornment={
                                <InputAdornment
                                    position="end"
                                >
                                    <IconButton edge="end"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPasswordValue.showPassword ? <Visibility /> :
                                            <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {errors.password && dirty.password && (
                            <Typography
                                style={{ marginTop: "0", color: "blue", fontWeight: "200" }}
                            >{errors.password}
                            </Typography>
                        )}
                    </FormControl>

                    <FormControl className="inputField" variant="outlined">
                        <InputLabel> {t('Confirm Password.1')} </InputLabel>
                        <OutlinedInput
                            style={{ marginBottom: "1rem" }}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            type={showConfirmPasswordValue.showConfirmPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment
                                    position="end"
                                >
                                    <IconButton edge="end"
                                        onClick={handleClickShowConfirmPassword}
                                    >
                                        {showConfirmPasswordValue.showConfirmPassword ? <Visibility /> :
                                            <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                        {confirmPassword !== password ? (
                            <Typography style={{ color: "blue" }}> {t('Password do not match.1')} </Typography>
                        ) : null}

                    </FormControl>

                    <InputLabel>
                        <Checkbox type="checkbox"
                            name="termsAndConditions"
                            value={termsAndConditions}
                            onChange={handleOnChange}></Checkbox>
                        {t('I agree with terms & conditions.1')}

                    </InputLabel>

                    {errors.termsAndConditions && dirty.termsAndConditions && (
                        <Typography
                            style={{ marginTop: "0", color: "blue", fontWeight: "200" }}
                        >{errors.termsAndConditions}
                        </Typography>
                    )}

                    {
                        !username ||
                            !email ||
                            !password ||
                            !confirmPassword || confirmPassword !== password || termsAndConditions
                            ?
                            (
                                // <>
                                <Button className="disabledButton" disabled variant="contained">
                                    {activeStep === steps.length ? "Finish" : "Finish"}
                                </Button>
                                // </>
                            ) : (
                                // <>
                                <Button className="button" onClick={handleNext} variant="contained">
                                    {activeStep === steps.length ? "Finish" : "Finish"}
                                </Button>
                                // </>
                            )
                    }
                </form>
            </div >
        </div>
    )
}

export default SecondStep;