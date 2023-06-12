import { useState } from "react";
import skillsListJson from "./assets/skillsList.json";
import fieldsListJson from "./assets/fieldsList.json";
import InputBox from "./components/formComponents/inputBox";
import CustomRadioBox from "./components/formComponents/customRadioBox";
import SelectBox from "./components/formComponents/selectBox";
import Logo from "./components/logo";
const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://codersmeetbackend.vercel.app";
export default function SignUp() {
  const [selectedField, setSelectedField] = useState("Web Developer");
  const [radioBoxValues, setRadioBoxValues] = useState([]);

  const skillsListHandler = () => {
    if (selectedField == "Web Developer") {
      return skillsListJson.web_developer;
    } else if (selectedField == "App Developer") {
      return skillsListJson.app_developer;
    }
  };

  const fieldsList = fieldsListJson.fields;

  const loginFormHandler = (e) => {
    const formData = {
      usernameoremail: e.target.usernameoremail.value,
      password: e.target.password.value,
    };
    fetch(`${serverUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if(res.ok){
          return res.json();
        }
        throw new Error("Something wrong")
      })
      .then((resjson) => {
        console.log(resjson.success);
        return 
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signupFormHandler = (e) => {
    const formData = {
      fullname: e.target.fullname.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      profession: selectedField,
      skills: radioBoxValues,
    };
    fetch(`${serverUrl}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if(res.ok){
          return res.json();
        }
        throw new Error("Something wrong")
      })
      .then((resjson) => {
        console.log(resjson);
        return 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="bg-[#111] h-[100vh] w-full">
      <nav className="h-[6%] px-8 p-2 border-b border-[#333] w-full">
        <div className="flex flex-row justify-between items-center">
          <Logo />
        </div>
      </nav>
      <div className="bg-[#111] h-[94%] w-full flex flex-col gap-8 justify-center items-center">
        <h1 className="text-center text-2xl font-semibold text-white">
          CodersMeet
        </h1>
        <div className="h-[80%] border-2 border-[#222] w-[70%] p-4 rounded-2xl flex flex-row justify-center items-center">
          <div className="w-1/2">
            <form
              className="w-full flex flex-col gap-4 items-center justify-center max-w-max p-4 rounded-lg"
              onSubmit={(e) => {
                e.preventDefault();
                loginFormHandler(e);
              }}
            >
              <InputBox
                name="usernameoremail"
                type="text"
                id={"username"}
                label={"Username"}
              />
              <InputBox
                name="password"
                type="password"
                id={"Password"}
                label={"Password"}
              />
              <button
                type="submit"
                className="bg-white text-black rounded-lg px-3 p-1 mt-8 font-semibold"
              >
                SignIn
              </button>
            </form>
          </div>
          <div className="w-1/2">
            <form
              className="w-full flex flex-col gap-4 items-center justify-center max-w-max p-4 rounded-lg"
              onSubmit={(e) => {
                e.preventDefault();
                signupFormHandler(e);
              }}
            >
              <InputBox
                name="fullname"
                type="text"
                id={"fullname"}
                label={"Full Name"}
              />
              <InputBox
                name="username"
                type="text"
                id={"username"}
                label={"Username"}
              />
              <InputBox name="email" type="text" id={"email"} label={"Email"} />
              <SelectBox
                name="professsion"
                id={"profession"}
                label={"Profession"}
                options={fieldsList}
                setSelectedField={setSelectedField}
              />
              <CustomRadioBox
                id={"skills"}
                label={"Select Skills"}
                skillsList={skillsListHandler()}
                setRadioBoxValues={setRadioBoxValues}
                radioBoxValues={radioBoxValues}
              />

              <InputBox
                name="password"
                type="password"
                id={"Password"}
                label={"Password"}
              />

              <InputBox
                type="password"
                id={"Re-Type Password"}
                label={"Re-Type Password"}
              />
              <button className="bg-white text-black rounded-lg px-8 p-1 mt-8 font-semibold">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
