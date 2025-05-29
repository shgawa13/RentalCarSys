// import React from "react";
// import "./LoginRegistter.css";
// import { FaUser, FaLock, FaHome } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Login = () => {
//   return (
//     <div className={`body-login wrapper`}>

//       <div className="form-box login">
//         <form action="" className="formLogin">
//           <Link to={"/"}>
//         {" "}
//         <FaHome className="ReturnToHome" />
//       </Link>
//           <h1>Login </h1>
//           <div className="input-box">
//             <input type="text" placeholder="Username " required />
//             <FaUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input type="password" placeholder="password " required />
//             <FaLock className="icon" />
//           </div>
//           <div className="remeber-forgot">
//             <label>
//               {" "}
//               <input type="checkbox" />
//               Remember me
//             </label>
//             <a href="#">Forgot password?</a>
//           </div>
//           <button type="submit">Login</button>
//           <div className="register-link">
//             <p>
//               Don't have an account ?<Link to={"/register"}>Rrgister</Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import "./LoginRegistter.css";
import { FaUser, FaLock, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://YOUR_SERVER_DOMAIN/backend/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");
        // يمكنك هنا تحويل المستخدم لصفحة أخرى مثلاً:
        // navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error(error);
    }
  };

  return (
    <div className="body-login wrapper">
      <div className="form-box login">
        <form className="formLogin" onSubmit={handleLogin}>
          <Link to={"/"}>
            <FaHome className="ReturnToHome" />
          </Link>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="remeber-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Do not have an account? <Link to={"/register"}>Register</Link>
            </p>
          </div>
          <Link to={"/Dashboard"}> Dash</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
