import Form from "./common/form";
import Joi from "joi";
import usersService from "../services/usersService";
import { Navigate } from "react-router-dom";
import WithRouter from "./common/withRouter";
import { toast } from "react-toastify";

class ResetPassword extends Form {
  state = {
    form: {
      password: "",
      confirm_password: "",
      token: this.props.token,
    },
  };

  schema = {
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
    confirm_password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/
      )
      .message(
        '"confirm_password" must be at least 1 uppercase, 1 lowercase, 4 numbers, 1 special symbol (_-*&^%$#@!) and length at least 8 characters long'
      )
      .required(),
    token: Joi.string(),
  };

  async doSubmit() {
    const { password, confirm_password, token } = this.state.form;

    try {
      await usersService.resetPassword(password, confirm_password, token);
      window.location = "/login";
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  }

  render() {
    if (usersService.getUser()) {
      return <Navigate to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <h2>Reset Password</h2>
        <p>Enter your new password.</p>
        {this.renderInput({
          name: "password",
          label: "Password:",
          type: "password",
          required: true,
        })}
        {this.renderInput({
          name: "confirm_password",
          label: "Confirm Password:",
          type: "password",
          required: true,
        })}
        <div className="btn-row">{this.renderButton("Reset Password")}</div>
      </form>
    );
  }
}

export default WithRouter(ResetPassword);
