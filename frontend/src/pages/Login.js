import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [copiedField, setCopiedField] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoEmail = "admin@test.com";
  const demoPassword = "123456";

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // clear old error

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      login(res.data.token);
      navigate("/");

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials. Try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);

    setTimeout(() => {
      setCopiedField("");
    }, 1500); // resets after 1.5 sec
  };

  const autofillDemo = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">🔐 Welcome Back</h2>
        <p className="login-subtitle">Analytics Dashboard Login</p>

        <div className="demo-box">
          <h4>🚀 Demo Account</h4>

          <div className="demo-row">
            <span>Email:</span>
            <strong>{demoEmail}</strong>
            <button onClick={() => copyToClipboard(demoEmail, "email")}>
              {copiedField === "email" ? "Copied ✓" : "Copy"}
            </button>
          </div>

          <div className="demo-row">
            <span>Password:</span>
            <strong>{demoPassword}</strong>
            <button onClick={() => copyToClipboard(demoPassword, "password")}>
              {copiedField === "password" ? "Copied ✓" : "Copy"}
            </button>
          </div>

          <button className="demo-fill-btn" onClick={autofillDemo}>
            Use Demo Account
          </button>
        </div>
        {error && <div className="error-message" >Invalid Credentials.. Try Again</div>}
        <p></p>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;