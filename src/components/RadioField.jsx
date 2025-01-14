import React from "react";

const RadioField = ({ label, name, options, value, onChange }) => {
  return (
    <div className="form-item">
      <label>{label}</label>
      {options.map((option, index) => (
        <div key={index} className="radio-option">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioField;
