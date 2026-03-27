import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

async function createPost(newPost: { title: string; body: string }) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
}

export default function MutationExample() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { mutate, data, isPending } = useMutation({
    mutationFn: createPost,
  });

  return (
    <div className="section">
      <h2>2. Mutations</h2>
      <p>Mutations are used to create, update, or delete data .</p>

      <input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Post body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={() => mutate({ title, body })} disabled={isPending}>
        {isPending ? "Creating..." : "Create Post"}
      </button>
      
      {data && (
        <div className="card">
          <h4>{data.title}</h4>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}
