import Joi from "joi";
import Form from "./common/form";
import WithRouter from "./common/withRouter";
import { toast } from "react-toastify";
import usersService from "../services/usersService";
import { Navigate, Link } from "react-router-dom";

class Register extends Form {
  state = {
    form: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  };

  schema = {
    name: Joi.string().min(2).max(255).required(),
    phone: Joi.string()
      .min(9)
      .regex(/^0[2-9][ -]?\d{7}$|^0[2-9]\d[ -]?\d{7}$/)
      .message('"phone" must be a valid phone number')
      .required(),
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
  };

  async doSubmit() {
    const { form } = this.state;
    const body = { ...form };

    try {
      await usersService.createUser(body);
      toast.success("You are now registered.");
      this.props.navigate("/login");
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
      <div className="login-page">
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <h2>Register</h2>
          <p>You can open new account for free!</p>
          {this.renderInput({
            name: "name",
            label: "Name",
            required: true,
          })}
          {this.renderInput({
            name: "phone",
            label: "Phone:",
            required: true,
          })}
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
          {this.renderInput({
            name: "confirm_password",
            label: "Confirm Password:",
            type: "password",
            required: true,
          })}

          <div className="btn-row">{this.renderButton("Register")}</div>
          <div className="useful-row">
            <p>
              Have account already? <Link to="/login">Login</Link>.
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default WithRouter(Register);
