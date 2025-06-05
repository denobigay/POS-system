import { useState } from "react";
import DeleteRoleModal from "../modals/DeleteRoleModal";
import EditRoleModal from "../modals/EditRoleModal";

const RolesTable = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRole, setSelectedRole] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const handleOpenDelete = (roleName: string) => {
    setSelectedRole({ name: roleName, description: "" });
    setShowDelete(true);
  };

  const handleOpenEdit = (role: { name: string; description: string }) => {
    setSelectedRole(role);
    setShowEdit(true);
  };

  const handleCloseDelete = () => {
    setSelectedRole(null);
    setShowDelete(false);
  };

  const handleCloseEdit = () => {
    setSelectedRole(null);
    setShowEdit(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting role:", selectedRole?.name);
    setShowDelete(false);
  };

  const handleSaveEdit = (updatedName: string, updatedDesc: string) => {
    console.log("Updated Role:", updatedName, updatedDesc);
    setShowEdit(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-white">Roles</h3>
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#addRoleModal"
        >
          Add Role
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Admin</td>
              <td>Full access to system</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-light me-2"
                  onClick={() =>
                    handleOpenEdit({
                      name: "Admin",
                      description: "Full access to system",
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleOpenDelete("Admin")}
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Cashier</td>
              <td>Manage sales</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-light me-2"
                  onClick={() =>
                    handleOpenEdit({
                      name: "Cashier",
                      description: "Manage sales",
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleOpenDelete("Cashier")}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DeleteRoleModal
        show={showDelete}
        onClose={handleCloseDelete}
        onDelete={handleConfirmDelete}
        roleName={selectedRole?.name || ""}
      />

      <EditRoleModal
        show={showEdit}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        role={selectedRole}
      />
    </>
  );
};

export default RolesTable;
