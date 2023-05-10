import React from "react";
import "./index.scss";
import Collection from "./Collection";
const categoryName = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];
function App() {
  const [categoryId, setCaregoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  React.useEffect(() => {
    setLoading(true);
    const category = categoryId ? `category=${categoryId}` : "";
    fetch(
      `https://645b66d0a8f9e4d6e76762dd.mockapi.io/photo-coll?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("err");
      })
      .finally(() => setLoading(false));
  }, [categoryId, page]);
  console.log(collections);
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categoryName.map((obj, i) => (
            <li
              onClick={() => setCaregoryId(i)}
              className={categoryId === i ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="content">
        {loading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection name={obj.name} key={index} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
