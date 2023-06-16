import { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../context/user-context";
import serverUrl from "../../assets/serverUrl";
import { useCookies } from "react-cookie";

export default function UserQuestionScreen(props) {
  const { userData, setUserData } = useContext(userContext);
  const [cookie] = useCookies(["token"]);

  function inputBoxSubmitHandler(e) {
    fetch(`${serverUrl}/user/addquestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({ question: e.target.value }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setUserData(response.data.user);
        e.target.blur();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleKeyDown(e) {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      inputBoxSubmitHandler(e);
    }
  }

  function auto_grow(e) {
    if (e.target.style.height !== "120px") {
      e.target.style.height = "5px";
      e.target.style.height = e.target.scrollHeight + "px";
    } else {
      e.target.style.overflowY = "scroll";
    }
  }

  return (
    <form className="h-full w-full flex flex-row justify-start items-center">
      <textarea
        id="userQuestionInput"
        name="questionInput"
        autoComplete="off"
        rows={3}
        className="h-full w-full text-white font-semibold bg-transparent px-4 outline-none"
        placeholder="Enter your question. Press Enter to send. Use Shift + Enter for new line"
        onInput={(e) => auto_grow(e)}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        defaultValue={userData? userData.currentQuestion?.length == 0 ?'': userData.currentQuestion : ''}
      />
    </form>
  );
}
