import React from 'react'

const InputGroup = () => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="font-bold text-[14px]">მისამართი *</label>
      <input
        type="text"
        className="w-full rounded-md  border-[2px] border-[#c3c2c8] outline-none py-2 px-2"
      />
      <div className="flex items-center gap-3">
        <svg
          width="12"
          height="11"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ stroke: "black" }}
        >
          <path
            d="M11 1.40918L4.125 9.591L1 5.87199"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p className='font-medium text-[14px]"'>მინიმუმ ორი სიმბოლო</p>
      </div>
    </div>
  );
}

export default InputGroup