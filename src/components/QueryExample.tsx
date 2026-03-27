import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  return res.json();
}

export default function QueryExample() {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  return (
    <div className="section">
      <h2>1. Intro and Setup</h2>
      <p>This is the manual version without TanStack Query .</p>

      {isPending && <p>Loading ...</p>}
      {error && <p>Something went wrong</p>}

      {data &&
        data.map((post) => (
          <div key={post.id} className="card">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
}
