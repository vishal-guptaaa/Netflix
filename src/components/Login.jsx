import React, { useState } from "react";
import { Background_URL, User_Icon } from "../utils/constants";
import { useRef } from "react";
import checkValidData from "../utils/Validate";
import Header from "./Header";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInFrom, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignForm(!isSignInFrom);
  };

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign Up Logic
    if (!isSignInFrom) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: User_Icon,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":- " + errorMessage);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":- " + errorMessage);
        });
    }
  };

  return (
      <div>
        <Header />
        <div className="absolute">
          <img 
          className="h-screen object-cover md:h-full"
           src={Background_URL} alt="background image" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-black/80 absolute p-12 text-white w-[90%] md:w-3/12 my-36 mx-auto right-0 left-0 rounded-lg"
        >
          <h1 className="text-3xl font-bold py-4">
            {isSignInFrom ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInFrom && (
            <input
              ref={name}
              className="p-4 my-4  border rounded-md w-full bg-gray-700 cursor-pointer"
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            ref={email}
            className="p-4 my-4  border rounded-md w-full bg-gray-700 cursor-pointer"
            type="text"
            placeholder="Email Address"
          />
          <input
            ref={password}
            className="p-4 my-4  border rounded-md w-full bg-gray-700 cursor-pointer"
            type="password"
            placeholder="Password"
          />

          <p className="text-red-500 font-bold text-lg">{errorMessage}</p>

          <button
            className="my-6 p-4 border bg-red-500 rounded-md w-full cursor-pointer"
            onClick={handleButtonClick}
          >
            {isSignInFrom ? "Sign In" : "Sign Up"}
          </button>

          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInFrom
              ? "New to Netflix?Sign Up now."
              : "Already Registered?Sign In now."}
          </p>
        </form>
      </div>
  );
};

export default Login;
