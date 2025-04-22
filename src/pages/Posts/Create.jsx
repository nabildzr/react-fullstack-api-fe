import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";

const Create = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});

  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // console.log(data);

    if (data.errors) {
      setErrors(data.errors);
      // console.log(errors)
    } else {
      navigate("/");
    }

    // console.log(formData);
  };

  return (
    <>
      <h1 className="title">Create a new post</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div className="">
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
        </div>
        <div className="">
          <textarea
            type="text"
            placeholder="Write your thoughts"
            value={formData.body}
            onChange={(e) =>
              setFormData({
                ...formData,
                body: e.target.value,
              })
            }
          />
          {errors.body && <p className="error">{errors.body[0]}</p>}
        </div>

        <button className="primary-btn">Create</button>
      </form>
    </>
  );
};

export default Create;
