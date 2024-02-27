import React from "react";

interface PriceFormProps {
    setTelInputToParent: any
    error: string;
    spanClass: string;
    inputClass: string
}

const PhoneForm: React.FC<PriceFormProps> = ({setTelInputToParent, error, spanClass, inputClass}) => {
    function handleTelInput(e: React.ChangeEvent<HTMLInputElement>) {

        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if (isNaN(Number(lastChar)) || (lastChar === ' ') || (inputValue.length === 16)) {
            e.target.value = inputValue.slice(0, -1);
            if (inputValue.endsWith(") "))
                e.target.value = inputValue.slice(0, -2);
            return;
        }

        setTelInputToParent(lastChar);
        if (inputValue.length === 1)
            e.target.value = '(' + inputValue;
        if (inputValue.length === 5)
            e.target.value = inputValue.slice(0,4) + ") " + lastChar;
        if (inputValue.length === 10)
            e.target.value = inputValue.slice(0, -1) + "-" + lastChar;
        if (inputValue.length === 13)
            e.target.value = inputValue.slice(0, -1) + "-" + lastChar;
    }
    return (
        <div>
            <div>
                <input type="text" className={inputClass} placeholder="(999) 999-99-99"
                       onInput={handleTelInput} />
                <div className="form_error">{error}</div>
                <span className={spanClass}>+7</span>
            </div>
        </div>
    )
}

export default PhoneForm;