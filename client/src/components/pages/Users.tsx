import { useState } from "react";
import AlertMessage from "../AlertMessage";
import UsersTable from "../tables/UsersTable";
import AddUserModal from "../modals/AddUserModal";

const Users = () => {
  const [refreshUsers, setRefreshUsers] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleShowAlertMessage = (
    message: string,
    isSuccess: boolean,
    isVisible: boolean
  ) => {
    setMessage(message);
    setIsSuccess(isSuccess);
    setIsVisible(isVisible);
  };

  const handleCloseAlertMessage = () => {
    setMessage("");
    setIsSuccess(false);
    setIsVisible(false);
  };

  return (
    <>
      <AlertMessage
        message={message}
        isSuccess={isSuccess}
        isVisible={isVisible}
        onClose={handleCloseAlertMessage}
      />
      <div className="container mt-4">
        <AddUserModal
          onUserAdded={(message) => {
            handleShowAlertMessage(message, true, true);
            setRefreshUsers(!refreshUsers);
          }}
        />
        <UsersTable refreshUsers={refreshUsers} />
      </div>
    </>
  );
};

export default Users;
