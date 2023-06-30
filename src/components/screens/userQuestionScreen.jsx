import { useContext } from "react";
import { userContext } from "../../context/user-context";
import serverUrl from "../../assets/serverUrl";
import { useCookies } from "react-cookie";

export default function UserQuestionScreen(props) {
  const { userData, setUserData, remoteUserData } = useContext(userContext);
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
    <div className="h-full w-full relative">

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
    {props.confirmationModal && (
        <div className="z-50 absolute top-10 text-[#fff] bg-[#222] p-4 w-[90%] rounded-2xl font-semibold">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-lg">Did you understand the {remoteUserData?.fullname}'s answer?</h1>
            </div>
            <div className="flex flex-row gap-2 justify-start">
              <button
                className="h-min min-w-max text-sm font-semibold border-none bg-white text-black outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center"
                onClick={() => {
                  props.confirmationHandler("rejected");
                }}
              >
                no
              </button>
              <button
                className="h-min min-w-max text-sm font-semibold border-none bg-white text-black outline-none px-3 p-1 rounded-2xl flex flex-row items-center justify-center"
                onClick={() => {
                  props.confirmationHandler("approved");
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
  );
}
