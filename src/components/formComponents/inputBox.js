
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
        name={props.name}
        type={props.type}
        className="w-full bg-transparent rounded-lg p-2 border border-[#333] px-3 outline-none font-semibold text-white"
        placeholder={props.placeholder}
      />
    </div>
  );
}
