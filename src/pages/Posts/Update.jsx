import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router";

const Update = () => {
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});

  const getPost = async () => {
    const res = await fetch(`/api/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      if (data.post.user_id !== user.id) {
        navigate("/");
      }
      setFormData({
        title: data.post.title,
        body: data.post.body,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // console.log(data);

    if (data.errors) {
      setErrors(data.errors);
      // console.log(errors);
    } else {
      navigate("/");
    }

    // console.log(formData);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1 className="title">Update your Post</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
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

export default Update;
