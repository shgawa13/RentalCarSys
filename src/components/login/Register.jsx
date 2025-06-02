import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
//import "/LoginRegister.css";
import { FaUser, FaLock, FaEnvelope, FaHome } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    UserName: "",
    Email: "",
    Password: "",
    IsAdmin: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!form.UserName || !form.Email || !form.Password) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(error || "Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/SmartKey/Backend/api/users/",
        {
          method: "POST",
          credentials: "same-origin", // Use include if the API is on a different port/domain
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const result = await response.json();
      toast.success("User registered successfully!", result);
      console.log("Registration successful:", result);
      alert("User registered successfully!", result.message);
      navigate("/login"); // Redirect to the login page after successful registration
    } catch (err) {
      console.error("Failed to register user:", err);
      toast.error(err.message || "Failed to register user.");
    }
  };

  return (
    <div className="body-login wrapper active">
      <div className="form-box register">
        <form onSubmit={handleSubmit} className="formRegister">
          <Link to="/">
            <FaHome className="ReturnToHome" />
          </Link>
          <h1>Registration</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="input-box">
            <input
              type="text"
              name="UserName"
              placeholder="Username"
              value={form.UserName}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={form.Email}
              onChange={handleChange}
              required
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={form.Password}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="remeber-forgot">
            <label>
              <input
                type="checkbox"
                name="IsAdmin"
                checked={form.IsAdmin}
                onChange={handleChange}
              />
              I agree to the terms & conditions
            </label>
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
