import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef();

  // Code for generatoring password random
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "~!@#$%^&*()_+:|?<>,.";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const passwordCopyInClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-[100%] flex flex-col items-center justify-center absolute top-[5vh] bg-slate-600 p-10">
        <h1 className="text-white font-bold text-5xl my-5 text-center">
          Password Generator
        </h1>
        <div className="w-full flex items-center justify-center">
          <input
            type="text"
            className="w-[40%] py-4 pl-4 rounded-s-xl border-none outline-none"
            readOnly
            value={password}
            placeholder="Password"
            ref={passwordRef}
          />
          <button
            className="py-4 rounded-e-xl text-white font-bold text-md bg-blue-700 px-5"
            onClick={passwordCopyInClipboard}
          >
            Copy
          </button>
        </div>
        <div className="w-full flex items-center justify-center my-8">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => {
              setlength(e.target.value);
            }}
            className="cursor-pointer"
          />
          <label
            htmlFor="length"
            className="text-orange-500 text-lg font-semibold mx-4"
          >
            Length : {length}
          </label>
          <div>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label
              htmlFor="Numbers"
              className="text-orange-500 ml-1 text-lg font-semibold"
            >
              Numbers
            </label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
              className="ml-3"
            />
            <label
              htmlFor="Numbers"
              className="text-orange-500 ml-1 text-lg font-semibold"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
