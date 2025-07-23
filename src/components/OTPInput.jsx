import React, { useRef } from "react";

const OTPInput = ({ length = 6, onChange }) => {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers and only 1 character
    if (!/^\d$/.test(value)) return;

    // Set the value
    inputs.current[index].value = value;

    // Move to next input
    if (index < length - 1) {
      inputs.current[index + 1].focus();
    }

    // Update OTP value
    const otp = inputs.current.map((input) => input.value).join("");
    onChange(otp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-4 my-8 justify-center items-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          ref={(el) => (inputs.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-14 h-16 text-center text-white text-2xl rounded-xl outline-none bg-[#1e1e1e] border border-[#ccc] shadow-[3px_3px_0px_#00000066]"
        />
      ))}
    </div>
  );
};

export default OTPInput;
