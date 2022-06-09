import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalState } from "./common/globalState";
import UserManagement from "./userManagement";
import usersService from "../services/usersService";
import { toast } from "react-toastify";
import moment from "moment";
import { Save } from "@mui/icons-material";

const UserDetails = () => {
  const state = useContext(GlobalState);
  const [users] = state.usersApi.users;
  const [userDetails, setUserDetails] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      users.forEach((user) => {
        if (user._id === params.id) {
          setUserDetails(user);
        }
      });
    }
  }, [params.id, users]);

  const handleChangeSelect = (e) => {
    setUserDetails({ ...userDetails, isAdmin: e.target.value });
  };

  const handleStatus = async (id, status) => {
    try {
      if (window.confirm("Are you sure you want to update user status?")) {
        await usersService.editStatus(id, status);
        toast.info("User status updated.");
        navigate("/users");
      }
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  if (userDetails.length === 0) {
    return <UserManagement />;
  }

  return (
    <div className="history-page">
      <h2>User Details</h2>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="text" value={userDetails._id} disabled />
            </td>
            <td>
              <input type="text" value={userDetails.name} disabled />
            </td>
            <td>
              <input type="text" value={userDetails.phone} disabled />
            </td>
            <td style={{ textTransform: "none" }}>
              <input type="text" value={userDetails.email} disabled />
            </td>
            <td>
              <select
                name="isAdmin"
                value={userDetails.isAdmin}
                onChange={handleChangeSelect}
              >
                <option value="false">User</option>
                <option value="true">Admin</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                value={moment(userDetails.createdAt).format("L")}
                disabled
              />
            </td>
            <td>
              <button
                onClick={() =>
                  handleStatus(userDetails._id, userDetails.isAdmin)
                }
              >
                <Save color="success" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
