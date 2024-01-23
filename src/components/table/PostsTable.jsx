
import { useEffect, useState } from "react";
import "./PostsTable.css"
import { MdDelete } from "react-icons/md";

export default function PostsTable({ posts, loading, setPosts, allPosts }) {
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectRows, setSelectedRows] = useState(false)

  useEffect(() => {
    setRows(posts);
  }, [posts]);

  function nameChangeHandler(e, indx) {
    const name = e.target.value;
    const list = [...rows];
    list[indx].name = name;
    setRows(list);
  }
  function mailChangeHandler(e, indx) {
    const mail = e.target.value;
    const list = [...rows];
    list[indx].email = mail;
    setRows(list);
  }
  function roleChangeHandler(e, indx) {

    const list = [...rows];
    list[indx].role = role;
    setRows(list);
  }

  function removeHandler(name) {
    let list = [...rows];
    list = list.filter((item) => item.name != name);
    setRows(list);
    list = allPosts.filter((item) => item.name != name);
    setPosts(list);
  }

  function deleteSelected() {
    let list = allPosts;
    list = list.filter((item) => {
      if (selected.indexOf(item.name) == -1) {
        return item;
      }
    });
    setPosts(list);
  }



  


  if (loading) {
    return <h1>table is loading...</h1>;
  }

  return (
    <div className="table__container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                style={{cursor:"pointer"}}
                onClick={() => setSelected(posts.map((post) => post.name))}
                onClickCapture={() => setSelectedRows(!selectRows)}
              />
            </th>
            <th>name</th>
            <th>email</th>
            <th>role</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>
          {rows?.map((value, indx) => (
            <tr key={value.id} style={selectRows ? {backgroundColor:"gray"}:{backgroundColor:"whitesmoke"}}>
              <td>
                <input
                  type="checkbox"
                  style={{cursor:"pointer"}}
                  onClick={() => setSelected([...selected, value.name])}
                />
              </td>
              <td>
                {" "}
                {edit ? (
                  <input
                    value={value.name}
                    onChange={(e) => nameChangeHandler(e, indx)}
                  />
                ) : (
                  value.name
                )}{" "}
              </td>
              <td>
                {edit ? (
                  <input
                    value={value.email}
                    onChange={(e) => mailChangeHandler(e, indx)}
    
                  />
                ) : (
                  value.email
                )}
              </td>
              <td>
                {edit ? (
                  <input
                    value={value.role}
                    onChange={(e) => roleChangeHandler(e, indx)}
                  />
                ) : (
                  value.role
                )}
              </td>
              <td onClick={() => removeHandler(value.name)}>
                <button className="remove_button delete">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bottom_buttons_container">
        <div onClick={() => setEdit(!edit)} >
          <button className="bottom_buttons edit save">{edit ? "save" : "edit table"}</button>
        </div>
        <div onClick={deleteSelected} >
          <button className="bottom_buttons delete">delete selected</button>
        </div>
      </div>
    </div>
  );
}
