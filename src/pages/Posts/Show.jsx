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
              <small className="text-xs text-slate-600">
                Created by {post.user.name} on{""}
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
                <button className="bg-red-500 text-white text-sm rounded-sm px-3 py-1">Delete</button>
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
