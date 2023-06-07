"use client";

export default function InputBox(props) {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:gap-4">
      {props.label && (
        <label
          htmlFor={props.id}
          className="lg:w-[160px] w-full lg:text-end text-[#bbb] text-sm font-semibold"
        >
          {props.label}
        </label>
      )}

      <input
        id={props.id}
        className="w-full bg-[#111] rounded-lg p-2 text-black px-3 outline-none font-semibold text-white"
        placeholder={props.placeholder}
      />
    </div>
  );
}
