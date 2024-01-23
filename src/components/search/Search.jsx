import { useState } from "react";
import "./Search.css"

export default function Search({ allPosts, setPosts }) {
  const [searchStr, setSearchStr] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    let list = allPosts.map((post) => {
      return { ...post, name: post.name.toLowerCase() };
    });
    let searchedStr = searchStr.toLowerCase();
    list = list.filter((item) => {
      const values = Object.values(item);
      if (values.includes(searchedStr)) {
        return item;
      }
    });
    setPosts(list);
    setSearchStr(" ")
  }

  return (
    <div className="search__container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by name, email ,role"
          onChange={(e) => setSearchStr(e.target.value)}
          value={searchStr}
        />
      </form>
    </div>
  );
}
