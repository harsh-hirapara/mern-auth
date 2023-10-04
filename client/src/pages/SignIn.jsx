import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/api/auth/sign-in", formData);
      dispatch(signInSuccess(res.data.data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err));
    }
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-3">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-2 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "sign in"}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex gap-2 p-1">
        <span>Don't have an account?</span>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-600 mt-3">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}

export default SignIn;
