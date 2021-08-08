import React, { useState, useEffect } from "react";
import OneRepMaxForm from '../components/OneRepMaxForm';

const AddButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = (event) => {
        if (isOpen) setIsOpen(false);
        else setIsOpen(true);
    }

    return (
        <div>
        {!isOpen ? <div onClick={handleButtonClick} className="addButton collapsed">
                <h2>Add Lift</h2>
                <div className="addButtonSymbol">
                    <h2>+</h2>
                </div>
              </div>
            : <div onClick={handleButtonClick} className="addButton">
            <h2>Expanded</h2>
          </div>}
        </div>
    )
}

export default AddButton;