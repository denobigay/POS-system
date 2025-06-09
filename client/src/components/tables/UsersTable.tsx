import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UserServices from "../../services/UserServices";
import AddUserModal from "../modals/AddUserModal";
import EditUserModal from "../modals/EditUserModal";
import DeleteUserModal from "../modals/DeleteUserModal";

interface UsersTableProps {
  refreshUsers: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ refreshUsers }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await UserServices.loadUsers();
      setUsers(response.data.users);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [refreshUsers]);

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  const handleEditSave = () => {
    loadUsers();
    handleEditClose();
  };

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    console.log("Deleting user:", userToDelete);
    console.log("User ID:", userToDelete?.user_id);

    try {
      await UserServices.deleteUser(userToDelete.user_id);
      toast.error("User deleted successfully");
      loadUsers();
      handleDeleteClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Users</h3>
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#addUserModal"
        >
          Add User
        </button>
      </div>

      <table className="table table-dark table-striped table-hover">
        <thead className="align-middle">
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : Array.isArray(users) && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.user_id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    className="rounded-circle"
                    src={
                      user.profile_image
                        ? `http://localhost:8000/${user.profile_image}`
                        : "https://via.placeholder.com/40"
                    }
                    alt={user.first_name + " " + user.last_name}
                    width="40"
                    height="40"
                  />
                </td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="badge bg-success">
                    {user.role?.role_name}
                  </span>
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AddUserModal
        onUserAdded={(message) => {
          toast.success(message);
          loadUsers();
        }}
      />

      <EditUserModal
        show={isEditModalOpen}
        onClose={handleEditClose}
        user={selectedUser}
        onSave={handleEditSave}
      />

      <DeleteUserModal
        show={showDeleteModal}
        onClose={handleDeleteClose}
        onDelete={handleDeleteConfirm}
        userName={`${userToDelete?.first_name} ${userToDelete?.last_name}`}
      />
    </div>
  );
};

export default UsersTable;
