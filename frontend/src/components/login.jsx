import Joi from "joi";
import Form from "./common/form";
import usersService from "../services/usersService";
import { toast } from "react-toastify";
import { Navigate, Link } from "react-router-dom";
import WithRouter from "./common/withRouter";
import { Google, Facebook, GitHub } from "@mui/icons-material";
import config from "../config.json";

class Login extends Form {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string()
      .min(6)
      .max(255)
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/
      )
      .message(
        '"password" must be at least 1 uppercase, 1 lowercase, 4 numbers, 1 special symbol (_-*&^%$#@!) and length at least 8 characters long'
      )
      .required(),
  };

  async doSubmit() {
    const { email, password } = this.state.form;

    try {
      await usersService.login(email, password);
      window.location = "/products";
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  }

  google = (e) => {
    e.preventDefault();

    window.open(`${config.apiUrl}/auth/google`, "_self");
  };

  facebook = (e) => {
    e.preventDefault();

    window.open(`${config.apiUrl}/auth/facebook`, "_self");
  };

  github = (e) => {
    e.preventDefault();

    window.open(`${config.apiUrl}/auth/github`, "_self");
  };

  render() {
    if (usersService.getUser()) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-page">
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <h2>Login</h2>
          <p>Login with your account.</p>
          {this.renderInput({
            name: "email",
            label: "Email:",
            type: "email",
            required: true,
          })}
          {this.renderInput({
            name: "password",
            label: "Password:",
            type: "password",
            required: true,
          })}
          <div className="btn-row">{this.renderButton("Login")}</div>

          <div className="center">
            <div className="or">or</div>
          </div>

          <div className="social-media-wrapper">
            <button className="social-media-btn google" onClick={this.google}>
              <Google style={{ marginRight: 10 }} /> Google
            </button>
            <button
              className="social-media-btn facebook"
              onClick={this.facebook}
            >
              <Facebook style={{ marginRight: 10 }} /> Facebook
            </button>
            <button className="social-media-btn github" onClick={this.github}>
              <GitHub style={{ marginRight: 10 }} /> GitHub
            </button>
          </div>

          <div className="useful-row">
            <p>
              Don't have an account? <Link to="/register">Register</Link>.
            </p>
            <p>
              Forgot password? <Link to="/forgot-password">Click Here</Link>.
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default WithRouter(Login);
