import React from "react";

export const Input = ({ name, handleChange, type, label }) => {
  return (
    <div>
      <label>
        {label}: <input type={type} name={name} onChange={handleChange} />
      </label>
    </div>
  );
};
