import React from "react";

const Input = ({ type, icon, required, placeholder, name, register }) => {
  return (
    <div className="input-field">
      {icon}
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        {...(register ? register(name) : {})}
        className="w-full outline-none"
      />
    </div>
  );
};

export default Input;
