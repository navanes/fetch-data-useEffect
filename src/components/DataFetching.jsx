import React, { useState, useEffect } from "react";
import axios from "axios";
function DataFetching() {
  const [post, setPost] = useState({});
  const [id, setId] = useState("");
  const [idFromClick, setIdFromClick] = useState("");

  const handleClick = () => {
    setIdFromClick(id);
  };
  useEffect(() => {
    if (idFromClick) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${idFromClick}`)
        .then((res) => {
          console.log(res);
          setPost(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [idFromClick]);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  if (!idFromClick) {
    return (
      <div>
        <input
          className="form-control"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary m-2"
          type="button"
          onClick={handleClick}
        >
          Fetch Post
        </button>
        <h1>{post.title}</h1>
        {
          <ol className="list-group list-group-numbered">
            {posts.map((post) => (
              <li
                className="list-group-item list-group-item-primary"
                key={post.id}
              >
                {post.title}
              </li>
            ))}
          </ol>
        }
      </div>
    );
  } else {
    return (
      <div>
        <input
          className="form-control"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary m-2"
          type="button"
          onClick={handleClick}
        >
          Fetch Post
        </button>
        <h1>{post.title}</h1>
        <h2>{post.body}</h2>
      </div>
    );
  }
}

export default DataFetching;
