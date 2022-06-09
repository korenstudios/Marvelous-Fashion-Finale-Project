import { Error } from "@mui/icons-material";
import notFoundImage from "../images/deadpool-not-found.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={notFoundImage} alt="Not Found" />
      <h1>
        <Error /> Something went wrong <Error />
      </h1>
      <h2>The page you are looking for does not exist.</h2>
      <p>Status code: 404.</p>
      <Link to="/">Back To Home Page</Link>
    </div>
  );
};

export default NotFound;
