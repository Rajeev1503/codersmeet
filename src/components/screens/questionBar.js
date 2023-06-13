// import { useState } from "react";

import { useContext, useEffect } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { userContext } from "../../context/user-context";
const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://codersmeetbackend.vercel.app";
export default function QuestionBar(props) {
  const { userData } = useContext(userContext);

  function inputBoxSubmitHandler(e) {
    e.preventDefault();
    e.target.elements.questionInput.blur();
    fetch(`${serverUrl}/user/addquestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: e.target.questionInput.value }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        // setRemoteUserData(response.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function auto_grow(e) {
    if(e.target.style.height !== "120px"){
      e.target.style.height = "5px";
      e.target.style.height = e.target.scrollHeight + "px";
    }
    else{
      e.target.style.overflowY = "scroll"
    }
  }

  return (
    <div className="h-full w-full flex flex-row justify-start items-start">
      <button className="mt-2 h-min min-w-max text-sm font-semibold border-none bg-white outline-none px-3 p-1 rounded-2xl flex flex-row gap-2 items-center justify-center">
        Solve <BiRightArrowAlt />
      </button>
      <form
        className="h-min w-[80%] p-2 flex flex-row justify-start items-center"
        onSubmit={(e) => inputBoxSubmitHandler(e)}
      >
        <textarea
          name="questionInput"
          autoComplete="off"
          className="h-full w-full text-white font-semibold bg-transparent px-4 outline-none"
          placeholder={props.placeholder}
          onInput={(e) => auto_grow(e)}
        />
      </form>
    </div>
  );
}
