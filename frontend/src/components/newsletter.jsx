import { Send } from "@mui/icons-material";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <h1>Newsletter</h1>
      <div className="description">
        Get timely updates from your favorite products.
      </div>
      <div className="form-container">
        <input placeholder="Enter Email" />
        <button>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
