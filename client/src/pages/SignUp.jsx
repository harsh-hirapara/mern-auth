import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/sign-up", formData);
      setLoading(false);
      setError(false);
      navigate("/sign-in");
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-3">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
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
          {loading ? "loading..." : "sign up"}
        </button>
      </form>
      <div className="flex gap-2 p-1">
        <span>Have an account?</span>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-600 mt-3">{error ? error.message || "Something went wrong!" : ""}</p>
    </div>
  );
}

export default SignUp;
