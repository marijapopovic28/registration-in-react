import React from "react";
import monkey from './monkeyy.gif';
import { useTranslation } from "react-i18next";

const FinalStep = () => {

    const { t } = useTranslation();

    return (
        <div className="monkey">
            <div className="success">
                <h2>{t('Registration successful!.1')}</h2>
            </div>
                <img src={monkey} alt="monkey" loop="infinite" />
        </div>
    )
}

export default FinalStep;