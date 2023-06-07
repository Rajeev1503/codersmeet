"use client";
import { useReducer, useState } from "react";

export default function CustomRadioBox(props) {
  function skillsSelectReducer(state, action) {
    switch (action.type) {
      case "ADD_SKILL":
        return [...state, action.skill];
      case "REMOVE_SKILL":
        const stateArr = state.filter((skills) => skills !== action.skill);
        return state = stateArr;
      default:
        return state;
    }
  }
  const [selectedSkillsState, selectedSkillsDispatch] = useReducer(
    skillsSelectReducer,
    []
  );
  function skillsSelectHandler(skill) {
    if (selectedSkillsState.includes(skill)) {
      console.log("triggered");
      selectedSkillsDispatch({ type: "REMOVE_SKILL", skill: skill });
      console.log(selectedSkillsState);
    }
    selectedSkillsDispatch({ type: "ADD_SKILL", skill: skill });
  }
  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:gap-4">
      <label
        htmlFor={props.id}
        className="self-start lg:w-[160px] w-full lg:text-end text-[#bbb] text-sm font-semibold"
      >
        {props.label}
      </label>
      <div className="w-full flex flex-row flex-wrap gap-1">
        {props.skillsList.map((skill, i) => {
          return (
            <div
              key={i}
              id={props.id}
              className={`${
                selectedSkillsState.includes(skill)
                  ? "bg-[#333] text-white"
                  : "bg-[#111] text-[#999]"
              } text-sm capitalize max-w-max rounded-lg px-4 p-2 outline-none font-semibold text-gray-600 cursor-pointer`}
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
