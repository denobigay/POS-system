import React, { useState, useEffect } from "react";
import UserServices from "../../services/UserServices";
import RoleServices from "../../services/RoleServices";
import ErrorHandler from "../../handler/ErrorHandler";
import type { User } from "../../interfaces/User";
import type { Roles } from "../../interfaces/Roles";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  user: User | null;
}

const EditUserModal: React.FC<Props> = ({ show, onClose, onSave, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffixName: "",
    age: "",
    gender: "male",
    contact: "",
    address: "",
    roleId: "",
    email: "",
    password: "",
    loading: false,
    errors: {} as any,
    roles: [] as Roles[],
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Load roles when component mounts
    RoleServices.loadRoles()
      .then((res) => {
        if (res.status === 200) {
          setState((prev) => ({
            ...prev,
            roles: res.data.roles,
          }));
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      });
  }, []);

  // Reset form when modal opens/closes or user changes
  useEffect(() => {
    if (user) {
      setState((prev) => ({
        ...prev,
        firstName: user.first_name,
        middleName: user.middle_name || "",
        lastName: user.last_name,
        suffixName: user.suffix_name || "",
        age: user.age,
        gender: user.gender,
        contact: user.contact,
        address: user.address,
        roleId: user.role_id.toString(),
        email: user.email,
        password: "",
        errors: {},
      }));
      if (user.profile_image) {
        setPreviewImage(user.profile_image);
      }
    }
  }, [user, show]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (data: any) => {
    if (!user) return;

    setState((prev) => ({ ...prev, loading: true, errors: {} }));

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("role", data.role);
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      const response = await UserServices.updateUser(user.user_id, formData);

      if (response.status === 200) {
        toast.success("User updated successfully");
        onSave();
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating user");
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    if (user) {
      setState((prev) => ({
        ...prev,
        firstName: user.first_name,
        middleName: user.middle_name || "",
        lastName: user.last_name,
        suffixName: user.suffix_name || "",
        age: user.age,
        gender: user.gender,
        contact: user.contact,
        address: user.address,
        roleId: user.role_id.toString(),
        email: user.email,
        password: "",
        errors: {},
      }));
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Role</option>
              {state.roles.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs italic">
                {errors.role.message as string}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="edit-address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address
            </label>
            <textarea
              id="edit-address"
              {...register("address", { required: "Address is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.address && (
              <p className="text-red-500 text-xs italic">
                {errors.address.message as string}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            {state.loading ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
