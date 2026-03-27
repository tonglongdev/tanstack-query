import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  return res.json();
}

function PostList() {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60,
    // gcTime: 1000 * 60, // 1 minute
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
  });
  return (
    <div className="section">
      <h2>1. Intro and Setup</h2>
      <p>This is the manual version without TanStack Query .</p>

      {isLoading && <p>Loading ...</p>}
      {isFetching && <p>Fetching ...</p>}

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

function CachingExample() {
  const [show, setShow] = useState(true);
  const queryClient = useQueryClient();

  function invalidateQuery() {
    // Invalidate the query to refetch data
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }

  return (
    <div className="section">
      <h2>3. Caching</h2>
      <p>
        Toggle this component off and on to show that TanStack Query keeps data
        in cache.
      </p>

      <button onClick={invalidateQuery}>Invalidate Query</button>

      <button onClick={() => setShow(!show)}>
        {show ? "Unmount Component" : "Mount Component"}
      </button>

      {show && <PostList />}
    </div>
  );
}

export default CachingExample;
