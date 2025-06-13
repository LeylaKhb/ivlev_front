import React from "react";

interface BoxSizesProps {
    inputs: Array<inputOptions>;
    handleInputs: any
}

type inputOptions = {
    [key: string]: number
}

interface BoxInput {
    id: string; // уникальный идентификатор
    length: number;
    width: number;
    height: number;
    amount: number;
}

const BoxSizes: React.FC<BoxSizesProps> = ({inputs, handleInputs}) => {
    // Обработчик изменения значения инпута
    function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number, name: keyof BoxInput) {
        const {value} = e.target;
        // Проверка, что последний символ является числом
        let lastChar = value.charAt(value.length - 1);
        if (isNaN(Number(lastChar)) || lastChar === ' ') {
            return;
        }
        // Не разрешаем ввод "0" в одиночном символе
        if (value.length === 1 && value === '0') {
            return;
        }
        if (lastChar === '-' || lastChar === '+' || lastChar === 'e' || lastChar === '.' || lastChar === ',') {
            return;
        }
        const newValue = Number(value);
        // Создаем новый массив с измененным элементом
        const newInputs = inputs.map((input, i) => {
            if (i === index) {
                return {...input, [name]: newValue};
            }
            return input;
        });
        handleInputs(newInputs);
    }

    function handlePlusClick() {
        const newInput: BoxInput = {
            id: Date.now().toString(), // или другой генератор уникального id
            length: 0,
            width: 0,
            height: 0,
            amount: 0
        };
        handleInputs([...inputs, newInput]);
    }

    function handleMinusClick(index: number) {
        // Не удаляем последний элемент, если требуется всегда хотя бы один
        if (inputs.length <= 1) return;
        const newInputs = inputs.filter((_, i) => i !== index);
        handleInputs(newInputs);
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
                <div className="inputs_div" key={input.id}>
                    <input
                        className="sizes_input"
                        type="number"
                        onChange={(e) => handleChange(e, index, "length")}
                        value={input.length === 0 ? "" : input.length}
                        placeholder="0"
                    />
                    <input
                        className="sizes_input"
                        type="number"
                        onChange={(e) => handleChange(e, index, "height")}
                        value={input.height === 0 ? "" : input.height}
                        placeholder="0"
                    />
                    <input
                        className="sizes_input"
                        type="number"
                        onChange={(e) => handleChange(e, index, "width")}
                        value={input.width === 0 ? "" : input.width}
                        placeholder="0"
                    />
                    <input
                        className="sizes_input"
                        type="number"
                        onChange={(e) => handleChange(e, index, "amount")}
                        value={input.amount === 0 ? "" : input.amount}
                        placeholder="0"
                    />
                    {index !== 0 && (
                        <div className="minus_box" onClick={() => handleMinusClick(index)}>
                            -
                        </div>
                    )}
                </div>
            )}
            <div className="plus_box" onClick={handlePlusClick}>+</div>
        </div>
    );
}

export default BoxSizes;
