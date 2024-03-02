import React from "react";

interface BoxSizesProps {
    inputs: Array<inputOptions>;
    handleInputs: any
}

type inputOptions = {
    [key: string]: number
}

const BoxSizes: React.FC<BoxSizesProps>= ({inputs,handleInputs}) => {
    function handle(e: React.ChangeEvent<HTMLInputElement>, index: number, name: string) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if (isNaN(Number(lastChar)) || (lastChar === ' ')) {
            e.target.value = inputValue.slice(0, -1);
            return;
        }
        if (inputValue.length === 1 && inputValue === '0') {
            e.target.value = inputValue.slice(0, -1);
            return;
        }
        inputs[index][name as keyof inputOptions] = Number(e.target.value)
    }

    function handlePlusClick() {
        let copy = Object.assign([], inputs);
        copy.push({length: 0, width: 0, height: 0, amount: 0})
        handleInputs(copy);
    }

    return (
        <div className="boxes_div">
            <div className="boxes_labels">
                <label style={{position: "absolute", top: -10}}>Ширина:</label>
                <label style={{position: "absolute", top: -10, left: '31%'}}>Длина:</label>
                <label style={{position: "absolute", top: -10, left: '59%'}}>Высота:</label>
                <label style={{position: "absolute", top: -10, left: '87%'}}>Количество:</label>
            </div>
            {inputs.map((input, index) =>
                <div className="inputs_div" key={index}>
                    <input className="sizes_input" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handle(e, index, "length")} defaultValue={input["length"]}/>
                    <input className="sizes_input" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handle(e, index, "height")} defaultValue={input["height"]}/>
                    <input className="sizes_input" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handle(e, index, "width")} defaultValue={input["width"]}/>
                    <input className="sizes_input" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handle(e, index, "amount")} defaultValue={input["amount"]}/>
                </div>
            )}
            <div className="plus_box" onClick={handlePlusClick}>+</div>
        </div>
    )
}

export default BoxSizes;