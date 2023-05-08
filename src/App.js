import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, isloading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении пользователей");
      })
      .finally(() => isloading(false));
  }, []);
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="App">
      <Users
        items={users}
        loading={loading}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
      />
      {/* <Success /> */}
    </div>
  );
}

export default App;
