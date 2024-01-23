import { useState, useEffect } from "react";
import PostsTable from "./components/table/PostsTable";
import Pagination from "./components/pagination/Pagination";
import Search from "./components/search/Search";
import "./App.css"

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
        );
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    }
    getPosts();
  }, []);

  function handlePagination(pageNumber) {
    if (pageNumber > 0 && pageNumber <= Math.ceil(posts.length / postsPerPage))
      setCurrentPage(pageNumber);
  }

  let currentPosts;

  function calCurrentPosts() {
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    return currentPosts;
  }

  currentPosts = calCurrentPosts();

  return (
    <div className="home__container">
      <Search allPosts={posts}  setPosts={setPosts}/>
      <PostsTable
        posts={currentPosts}
        loading={loading}
        calCurrentPosts={calCurrentPosts}
        setPosts={setPosts}
        allPosts={posts}
      />
      <Pagination
        postsPerPage={postsPerPage}
        length={posts.length}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
