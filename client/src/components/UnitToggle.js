import React, { useState } from "react";
import Switch from "react-switch";

const UnitToggle = (props) => {
    const [checked, setChecked] = useState(props.units === 'kg' ? false : true);

    const handleChange = nextChecked => {
      setChecked(nextChecked);
      props.handleUnitChange();
    };
  
    return (
      <div className="unitToggle">
        <label className="unitToggleLabel">
          <span>kg</span>
          <Switch
            onChange={handleChange}
            checked={checked}
            className="react-switch"
            uncheckedIcon={false}
            checkedIcon={false}
            onColor="#c74343"
            offColor="#384fb0"
          />
          <span>lbs</span>
        </label>
      </div>
    );
  };

  export default UnitToggle;