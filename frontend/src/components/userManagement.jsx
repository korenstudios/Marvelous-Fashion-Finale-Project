import { useContext, useEffect } from "react";
import { GlobalState } from "./common/globalState";
import usersService from "../services/usersService";
import { toast } from "react-toastify";
import moment from "moment";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const state = useContext(GlobalState);
  const [users, setUsers] = state.usersApi.users;
  const [callback, setCallback] = state.usersApi.callback;

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await usersService.getUsers();
      setUsers(data);
    };
    getUsers();
  }, [setUsers, callback]);

  const removeUser = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        await usersService.removeUser(id);
        toast.warning("User deleted.");
        setCallback(!callback);
      }
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  return (
    <div className="history-page">
      <h2>Users</h2>

      <h4>You have {users.length} Users.</h4>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td style={{ textTransform: "none" }}>{user.email}</td>
              <td>{user.isAdmin ? "Admin" : "User"}</td>
              <td>{moment(user.createdAt).format("L")}</td>
              <td>
                <Link to={`/users/${user._id}`}>
                  <Edit color="warning" />
                </Link>
              </td>
              <td>
                <button onClick={() => removeUser(user._id)}>
                  <Delete color="error" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
