import AddRoleModal from "../../modals/AddRoleModal";
import RolesTable from "../../tables/RolesTable";

const Roles = () => {
  return (
    <div className="container mt-4">
      <RolesTable />

      <AddRoleModal />
    </div>
  );
};

export default Roles;
