"use client";

import { useState } from "react";
import CustomRadioBox from "../components/formComponents/customRadioBox";
import InputBox from "../components/formComponents/inputBox";
import SelectBox from "../components/formComponents/selectBox";
import Logo from "../components/logo";
import skillsListJson from "../assets/skillsList.json";
import fieldsListJson from "../assets/fieldsList.json";
import Buttons from "../components/formComponents/buttons";
import Link from "next/link";

export default function SignUp() {
  const [selectedField, setSelectedField] = useState("Web Developer");

  const skillsList = () => {
    if (selectedField == "Web Developer") {
      return skillsListJson.web_developer;
    } else if (selectedField == "App Developer") {
      return skillsListJson.app_developer;
    }
  };

  const fieldsList = fieldsListJson.fields;
  return (
    <main className="bg-[#000] h-[100vh] w-full">
      <nav className="h-[6%] px-8 p-2 border-b-2 border-[#111] w-full">
        <div className="flex flex-row justify-between items-center">
          <Logo />
          <Link href={"/signup"} className="bg-[#1c72e9] text-white p-1 px-2 rounded-lg">Login  / Signup</Link>
        </div>
      </nav>
      <div className="bg-[#000] h-[94%] w-full flex flex-col justify-center items-center py-8">
      <div className="bg-[#181818] rounded-lg py-8 lg:w-1/2 w-4/5 flex flex-col gap-8 items-center justify-center">
        {/* <Logo /> */}
        <h1 className="text-2xl font-semibold text-white">
          Sign-up for CodersArena
        </h1>
        <form className="w-[70%] flex flex-col gap-4 items-center justify-center max-w-max p-4 rounded-lg">
          <InputBox type="text" id={"fullname"} label={"Full Name"} />
          <InputBox type="text" id={"username"} label={"Username"} />
          <InputBox type="text" id={"email"} label={"Email"} />
          <InputBox type="text" id={"profession"} label={"Profession"} />
          <SelectBox
            id={"field"}
            label={"Select Field"}
            options={fieldsList}
            setSelectedField={setSelectedField}
          />
          <CustomRadioBox
            id={"skills"}
            label={"Select Skills"}
            skillsList={skillsList()}
          />
          <button className="bg-blue-600 text-white rounded-lg px-3 p-1 mt-8">
            Signup
          </button>
        </form>
      </div>
    </div>
    </main>
  );
}
