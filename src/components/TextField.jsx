import React from "react";

const TextField = ({ label, name, value, onChange }) => {
  return (
    <div className="form-item">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
};

export default TextField;
