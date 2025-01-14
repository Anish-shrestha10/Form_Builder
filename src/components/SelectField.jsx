import React from "react";

const SelectField = ({ label, name, options, value, onChange }) => {
  return (
    <div className="form-item">
      <label>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
