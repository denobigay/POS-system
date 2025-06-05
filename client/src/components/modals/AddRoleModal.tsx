const AddRoleModal = () => {
  return (
    <div
      className="modal fade"
      id="addRoleModal"
      tabIndex={-1}
      aria-labelledby="addRoleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title" id="addRoleModalLabel">
              Add Role
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="roleName" className="form-label">
                  Role Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  placeholder="Enter role name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roleDesc" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="roleDesc"
                  rows={3}
                  placeholder="Enter role description"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger">
              Save Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;
