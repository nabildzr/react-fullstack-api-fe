import { Link, useNavigate, useParams } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { user, token } = useContext(AppContext);

  const getPost = async () => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    if (res.ok) {
      setPost(data.post);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (user && user.id === post.user_id) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // const data = await res.json();
      if (res.ok) {
        navigate("/");
      }
      // console.log(data);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1 className="title"> </h1>

      {post ? (
        <div
          key={post.id}
          className="mt-4 p-4 border rounded-md border-dashed border-slate-400"
        >
          <div className="mb-2 flex items-start justify-between">
            <div className="">
              <h2 className="font-bold text-2xl">{post.title}</h2>
              <small className="text-xs text-slate-600 flex items-center gap-2">
                {post.user.image ? (
                  <img
                    src={post.user.image}
                    alt={post.user.name}
                    className="w-8 h-8 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <circle cx={12} cy={6} r={4} fill="currentColor"></circle>
                    <path
                      fill="currentColor"
                      d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                    ></path>
                  </svg>
                )}
                Created by {post.user.name} on{""}{" "}
                {new Date(post.created_at).toLocaleTimeString()}
              </small>
            </div>
          </div>
          <p>{post.body}</p>

          {user && user.id === post.user_id && (
            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/posts/update/${post.id}`}
                className="bg-green-500 text-white text-sm rounded-sm px-3 py-1"
              >
                Update
              </Link>

              <form onSubmit={handleDelete}>
                <button className="bg-red-500 text-white text-sm rounded-sm px-3 py-1">
                  Delete
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <h1 className="title">Page not Found!</h1>
      )}
    </>
  );
};

export default Show;
