export default function SelectBox(props) {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:gap-4">
      <label
        htmlFor={props.id}
        className="lg:w-[160px] w-full lg:text-end text-[#bbb] text-sm font-semibold"
      >
        {props.label}
      </label>

      <select
      onChange={(e)=>props.setSelectedField(e.target.value)}
      className="w-full p-2 text-white px-3 border-2 border-[#333] bg-transparent rounded-lg outline-none">
        {props.options.map((option, i) => {
          return (
            <option
              key={i}
              className="w-full p-1 px-3 bg-[#111] !rounded-lg outline-none"
              value={option}
            >{option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
