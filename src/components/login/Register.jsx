import React from "react";
import "./LoginRegistter.css";
import { FaUser, FaLock, FaEnvelope, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={`body-login wrapper active`}>
    

      <div className="form-box register">
        <form action="" className="formRegister">
        <Link to={"/"}>
        {" "}
        <FaHome className="ReturnToHome" />
      </Link> 
          <h1>registration </h1>
          <div className="input-box">
            <input type="text" placeholder="Username " required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="email " required />

            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="password " required />
            <FaLock className="icon" />
          </div>
          <div className="remeber-forgot">
            <label>
              {" "}
              <input type="checkbox" />I agree to the terms & conditions
            </label>
          </div>
          <button type="submit">register</button>
          <div className="register-link">
            <p>
              already have an account ?<Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
