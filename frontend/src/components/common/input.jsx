import { Alert } from "@mui/material";

const Input = ({ required = false, label, name, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>
        {required && <span className="required">*</span>}
        {label}
      </label>
      <input {...rest} id={name} name={name} />
      {error && (
        <Alert
          style={{ margin: 15 }}
          elevation={10}
          severity="error"
          variant="filled"
        >
          {error}
        </Alert>
      )}
    </div>
  );
};

export default Input;
