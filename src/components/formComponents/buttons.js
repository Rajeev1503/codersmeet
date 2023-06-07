'use client'
export default function Buttons (props) {
    return (
      <button className="bg-white text-black px-3 p-1 rounded-lg">
        {props.children}
      </button>
    );
  };