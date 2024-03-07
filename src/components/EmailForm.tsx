import React from "react";

interface EmailFormProps {
    handleInput: any;
    error: string;
    top: number;
    emailText: string;
}

const EmailForm: React.FC<EmailFormProps> = ({handleInput, error, top, emailText}) => {

    return (
        <div style={{width: '100%'}}>
            <input className="registration_input"
                   onInput={handleInput} name="email"/>
            <div className="login_form_label" style={{transform: emailText !== "" ? 'translate(-20px, -20px) scale(0.8)' : "none",
                top: top}}>Email</div>
            <div className="login_form_error" style={{display: error === "" ? "none" : "initial",
                top: top + 28}}>{error}</div>
        </div>
    )
}

export default EmailForm;