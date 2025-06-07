import { useEffect, useState } from "react";
import type { Roles } from "../../interfaces/Roles";
import RoleServices from "../../services/RoleServices";
import ErrorHandler from "../../handler/ErrorHandler";
import Spinner from "./Spinner";

interface RolesTableProps {
  refreshRoles: boolean;
}

const RolesTable = ({ refreshRoles }: RolesTableProps) => {
  const [state, setState] = useState({
    loadingRoles: true,
    roles: [] as Roles[],
  });

  const handleLoadRoles = () => {
    RoleServices.loadRoles()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            roles: res.data.roles,
          }));
        } else {
          console.error("Unexpected status error loading Roles:", res.status);
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingRoles: false,
        }));
      });
  };

  useEffect(() => {
    handleLoadRoles();
  }, [refreshRoles ]);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Roles</h3>
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#addRoleModal"
        >
          Add Role
        </button>
      </div>

      <table className="table table-dark table-striped table-hover">
        <thead className="align-middle">
          <tr className="align-middle">
            <th>ID</th>
            <th>Role Name</th>
            <th>Description</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.loadingRoles ? (
            <tr className="align-middle">
              <td colSpan={4} className="text-center">
                <Spinner />
              </td>
            </tr>
          ) : (
            state.roles.map((role, index) => (
              <tr className="" key={index}>
                <td>{index + 1}</td>
                <td>{role.role_name}</td>
                <td>{role.description}</td>

                <td>
                  <div className="btn-group">
                    <button type="button" className="btn btn-success">
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
          {/* Add more rows manually if needed */}
        </tbody>
      </table>
    </div>
  );
};

export default RolesTable;
