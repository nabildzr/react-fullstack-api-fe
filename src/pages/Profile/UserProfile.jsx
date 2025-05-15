import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";

export const UserProfile = () => {
  const { user, token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    image: user?.image || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg",
    imageFile: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file), // preview
        imageFile: file, // for upload
      }));
    }
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    if (formData.password) payload.append("password", formData.password);
    if (formData.imageFile) payload.append("image", formData.imageFile);

    const res = await fetch(`/api/profile/${user.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <h1 className="title">Edit Profile</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-1/2 mx-auto space-y-6"
      >
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={formData.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <label
              htmlFor="profileImageInput"
              className="absolute inset-0 flex items-center justify-center bg-black opacity-0 group-hover:opacity-60 cursor-pointer transition-opacity w-32 h-32 rounded-full"
              style={{ borderRadius: "9999px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                viewBox="0 0 24 24"
                className="text-white"
              >
                <circle cx={12} cy={6} r={4} fill="currentColor"></circle>
                <path
                  fill="currentColor"
                  d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                ></path>
              </svg>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        <div>
          <label>Name</label>
          <input
            className="border rounded px-2 py-1 mb-2 w-full"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            className="border rounded px-2 py-1 w-full"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>
        <div>
          <label>New Password</label>
          <input
            className="border rounded px-2 py-1 w-full"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="New Password"
          />
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>
        <div>
          <button className="primary-btn">Update</button>
        </div>
      </form>
    </>
  );
};
