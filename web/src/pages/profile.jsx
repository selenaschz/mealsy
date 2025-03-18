import { useForm } from "react-hook-form";
import * as MealsyAPI from "../services/api-service";
import { useAuthContext } from "../contexts/auth-context";
import { useEffect, useState } from "react";

function ProfilePage() {
  const { user, logout } = useAuthContext();
  const [avatar, setAvatar] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);

  const { register, handleSubmit, watch, formState, setError } = useForm();
  const errors = formState.errors;

  const avatarFile = watch("avatar");

  useEffect(() => {
    setAvatar(user?.avatar || null);
  }, [user]);

  useEffect(() => {
    if (avatarFile && avatarFile[0]) {
      const file = avatarFile[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  }, [avatarFile]);

  // Update profile
  const handleUpdateProfile = async (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("avatar", data.avatar[0]);

    try {
      console.log(data.avatar[0]);
      console.log(formData);
      await MealsyAPI.updateUser(formData);
      setUpdateMessage("Profile updated successfully!");
    } catch (error) {
      setError("api", { message: error.message });
    }

    setTimeout(() => {
      setUpdateMessage(null); // remove message
    }, 3000);
  };

  return (
    <div className="bg-beige-light p-8 rounded-lg shadow-lg max-w-2xl mx-auto my-10">
      <h2 className="text-center font-heading text-8xl text-brown-dark mb-8">
        Profile
      </h2>
      
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="space-y-6 pt-6 flex flex-col justify-center items-center"
      >
        <div className="flex justify-center mb-4">
          <input
            type="file"
            id="avatarInput"
            className="hidden"
            {...register("avatar")}
          />
          <label htmlFor="avatarInput" className="cursor-pointer">
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-40 h-40 rounded-full border-4 border-brown-medium shadow-md object-cover hover:opacity-75 bg-gray-200"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-brown-light flex items-center justify-center text-brown-dark text-lg">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Chef-Hat-Heart--Streamline-Solar"
                  className="w-16 h-16"
                >
                  <desc>
                    Chef Hat Heart Streamline Icon: https://streamlinehq.com
                  </desc>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.333 6.667c0-1.841 1.492-3.333 3.333-3.333.167 0 .331.012.492.036C5.56 2.185 6.68 1.333 8 1.333s2.44.852 2.842 2.036c.16-.026.324-.038.491-.038 1.841 0 3.333 1.492 3.333 3.333 0 1.367-.823 2.542-2 3.056v1.777H3.333V9.723c-1.177-.514-2-1.688-2-3.056ZM7.362 9.113C6.777 8.683 6 7.99 6 7.334c0-1.115 1.1-1.532 2-.67.9-.862 2-.445 2 .67 0 .656-.777 1.35-1.362 1.78-.28.205-.42.308-.638.308s-.358-.103-.638-.308Z"
                    fill="#EDE0D4"
                    strokeWidth="0.6667"
                  />
                  <path
                    d="M3.724 14.276c-.335-.335-.383-.845-.39-1.776h9.332c-.007.931-.054 1.441-.39 1.776-.39.39-1.018.39-2.276.39H6c-1.257 0-1.886 0-2.276-.39Z"
                    fill="#EDE0D4"
                    strokeWidth="0.6667"
                  />
                </svg>
              </div>
            )}
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-center font-heading text-6xl font-bold text-brown-dark">
            {user?.username}
          </p>
          <p className="text-center text-brown-dark"> {user?.email} </p>
        </div>
        <div className="w-full">
          <label className="block text-md font-medium text-brown-dark">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName")}
            defaultValue={user?.firstName}
            className="w-full mt-2 px-4 py-3 border border-brown-medium rounded-lg text-brown-dark bg-white focus:outline-none focus:ring-2 focus:ring-brown-dark"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-md font-medium text-brown-dark">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName")}
            defaultValue={user?.lastName}
            className="w-full mt-2 px-4 py-3 border border-brown-medium rounded-lg text-brown-dark bg-white focus:outline-none focus:ring-2 focus:ring-brown-dark"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-auto p-3 rounded-lg bg-brown-dark text-white font-semibold hover:bg-brown-medium active:scale-95 transition-transform duration-150 cursor-pointer"
        >
          Save Changes
        </button>
        {updateMessage && (
          <p className="text-green-800 mt-4 font-bold" >
            {updateMessage}
          </p>
        )}

        {errors.api && (
          <p className="text-red-500 mt-4 font-bold">{errors.api.message}</p>
        )}
      </form>
      <div className="flex justify-center pt-8 mb-4">
        <button 
          onClick={logout}
          className="px-4 py-2 bg-beige-medium text-white rounded-lg hover:bg-brown-medium transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
