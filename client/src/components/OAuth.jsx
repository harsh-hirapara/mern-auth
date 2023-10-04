import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signInSuccess } from "../redux/user/userSlice";

function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const payload = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      const res = await axios.post("/api/auth/google", payload);
      dispatch(signInSuccess(res.data.data));
    } catch (err) { 
      console.log("Could not login with google", err);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-2 rounded-lg uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
}

export default OAuth;
