import React, {useState} from "react";

interface CalculatorDropdownProps {
    items: string[],
    handleSelectClick: any,
    selectTitle: string
}

const CalculatorDropdown: React.FC<CalculatorDropdownProps> = ({items, handleSelectClick, selectTitle}) => {

    const [open, setOpen] = useState("");

    function handleSelectTitle() {
        if (open === "") setOpen("active")
        if (open === "active") setOpen("")
    }
    
    return (
        <div className="select_calculator">
            <form>
                <div className="__select" data-state={open}>
                    <div className="__select__title"
                         onClick={handleSelectTitle}>
                        {selectTitle}
                    </div>
                    <div className="__select__content">
                        {items.map((value, index) => (
                            <div key={index}>
                                <input id="singleSelect" className="__select__input" type="radio"
                                       name="singleSelect"/>
                                <label htmlFor="singleSelect" className="__select__label"
                                       onClick={() => {setOpen(""); handleSelectClick(index)}}>{items[index]}</label>
                                <input id="singleSelect" className="__select__input" type="radio"
                                       name="singleSelect" checked readOnly/>
                                <label htmlFor="singleSelect" className="__select__label"
                                       onClick={() => {setOpen(""); handleSelectClick(index)}}>{items[index]}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CalculatorDropdown;