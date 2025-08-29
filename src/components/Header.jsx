import React, { useEffect } from "react";
import { LOGO_URL, SUPPORTED_LANGUAGE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => [
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      }),
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch());
  };

  const handleLanguagechangeClick = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="bg-gradient-to-b from-black w-full py-2 px-8 absolute z-10 flex justify-between items-center">
      <img className="w-48 cursor-pointer" src={LOGO_URL} alt="Netflix Logo" />

      {user && (
        <div className="flex items-center gap-5">
          {showGptSearch && (
            <select
              className="cursor-pointer bg-gray-900 text-white px-3 py-2 rounded-md outline-none"
              onChange={handleLanguagechangeClick}
            >
              {SUPPORTED_LANGUAGE.map((language) => (
                <option value={language.identifier} key={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="bg-purple-500 text-white rounded-md px-2 py-1 cursor-pointer"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT search"}
          </button>
          <img
            className="w-10 rounded-full cursor-pointer"
            alt="Usericon"
            src={user?.photoURL}
          />
          <button
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 hover:font-semibold
          transition-all ease-in-out duration-300 rounded-lg text-black font-bold cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
