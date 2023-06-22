import { useReducer, useState } from "react";

export default function CustomRadioBox(props) {
  // function skillsSelectReducer(state, action) {
  //   switch (action.type) {
  //     case "ADD_SKILL":
  //       return [...state, action.skill];
  //     case "REMOVE_SKILL": {
  //       return state.filter((x) => x !== action.skill);
  //     }
  //     default:
  //       return state;
  //   }
  // }
  // const [selectedSkillsState, selectedSkillsDispatch] = useReducer(
  //   skillsSelectReducer,
  //   []
  // );
  function skillsSelectHandler(skill) {
    if (props.radioBoxValues.includes(skill)) {
      props.setRadioBoxValues((items) => items.filter((x) => x !== skill));
    } else {
      props.setRadioBoxValues((items) => [...items, skill]);
    }
    return;
  }
  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:gap-4">
      <label
        htmlFor={props.id}
        className="self-start lg:w-[160px] w-full lg:text-end text-[#bbb] text-sm font-semibold"
      >
        {props.label}
      </label>
      <div className="w-full flex flex-row flex-wrap gap-2">
        {props.skillsList.map((skill, i) => {
          return (
            <div
              key={i}
              id={props.id}
              className={`${
                props.radioBoxValues.includes(skill)
                  ? "bg-[#fff] text-black"
                  : "bg-[#222] text-white"
              } select-none text-sm capitalize max-w-max rounded-lg px-3 p-1 outline-none font-semibold cursor-pointer`}
              onClick={() => skillsSelectHandler(skill)}
            >
              {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
}
