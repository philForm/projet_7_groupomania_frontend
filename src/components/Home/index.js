import PostCreate from "../PostCreate";
import Posts from "../Posts";

import "./posts.css"

function Home() {
  return (
    <div className="App">
      <PostCreate />
      <Posts />
      <Posts />
      <Posts />
    </div>
  );
}

export default Home;
