import Form from "./common/form";
import ResetPassword from "./resetPassword";
import Joi from "joi";
import usersService from "../services/usersService";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

class ForgotPassword extends Form {
  state = {
    form: {
      email: "",
    },
    token: "",
    reset_password: false,
  };

  schema = {
    email: Joi.string()
      .min(6)
      .max(255)
      .email({ tlds: { allow: false } })
      .required(),
  };

  async doSubmit() {
    const { email } = this.state.form;

    try {
      await usersService.forgotPassword(email);
      toast.success("Password reset has been Sent! check out your email.");
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  }

  componentDidMount() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    const token = params.token;

    if (token) {
      this.setState({ reset_password: true, token });
    }
  }

  render() {
    if (usersService.getUser()) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-page">
        {this.state.reset_password ? (
          <ResetPassword token={this.state.token} />
        ) : (
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <h2>Forgot Password</h2>
            <p>
              Enter your email, you will receive a link via email to create a
              new password.
            </p>
            {this.renderInput({
              name: "email",
              label: "Email:",
              type: "email",
              required: true,
            })}
            <div className="btn-row">{this.renderButton("Send Email")}</div>
          </form>
        )}
      </div>
    );
  }
}

export default ForgotPassword;
