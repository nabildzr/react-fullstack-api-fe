import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();

    if (res.ok) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="title">Latest Post </h1>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
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
                  <div className="flex flex-col justify-center items-start ">
                    Created by {post.user.name} on{""}{" "}
                    {new Date(post.created_at).toLocaleDateString()}{" "}
                    {new Date(post.created_at).toLocaleTimeString()}{" "}
                    {post.created_at !== post.updated_at && (
                      <div>
                        <span className=" text-xs text-blue-500">
                          (updated){" "}
                        </span>
                        {new Date(post.updated_at).toLocaleTimeString()}
                      </div>
                    )}{" "}
                  </div>
                </small>
              </div>
              <Link
                to={`/posts/${post.id}`}
                className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Read More
              </Link>
            </div>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <p>There are no posts</p>
      )}
    </>
  );
};

export default Home;
