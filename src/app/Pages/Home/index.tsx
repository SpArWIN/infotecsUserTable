import SearchInput from "app/components/SearchInput";
import "./index.css";
import UserTable from "app/components/Table";
import { User, userTable } from "app/Shared/User/model";
import { useEffect, useState } from "react";

import ToggleSwitch from "app/components/point search";
import SearchFieldSelect from "app/components/Select";

export const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Устанавливаем пользователей
  const [searchItem, setSearchItem] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [filterUser, setFilterUser] = useState<User[]>([]); // Фильтрованные данные
  const [toggleState, setToggleState] = useState(false); // Состояние для переключателя
  const [selectedField, setSelectedField] = useState("firstName"); //Состояние для точечного поиска

  const handleToggle = (state: boolean) => {
    setToggleState(state); //Переключатель 
  };
  const handleFieldChange = (value: string) => {
    setSelectedField(value); //Что выбрано из Select 
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userTable.getuserTable();
        setUsers(userData);
        setFilterUser(userData);
        setToggleState(false);
      } catch (error: any) {
        console.error(error.message);
        setError("Ошибка загрузки пользователей");
      }
    };
    fetchUser();
  }, []);

  const handleSearch = async (term: string) => {
    setSearchItem(term);

    if (term === "") {
      setError(null);
      setFilterUser(users);
      return;
    }

    // Если включён расширенный поиск и введено 3 или более символов, меняем запрос
    if (toggleState && term.length >= 3) {
      try {
        const response = await userTable.filterUser(selectedField, term);
        setFilterUser(response); // Устанавливаем пользователей, полученных с сервера
      } catch (error) {
        setError("Ошибка при фильтрации пользователей");
        setFilterUser([]);
      }
    } else {
      // Фильтруем пользователей на клиенте
      const filteredUsers = users.filter((user) => {
        return Object.values(user).some((value) =>
          String(value).toLowerCase().includes(term.toLowerCase())
        );
      });
      setFilterUser(filteredUsers);
    }
  };

  return (
    <div className="home">
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Список пользователей
      </h1>

      <div className="flex-container">
        <h3>Точечный поиск</h3>
        <ToggleSwitch onToggle={handleToggle} />
      </div>
      <div className={`fade-in ${toggleState ? "fade-in-active" : ""}`}>
        {toggleState && (
          <SearchFieldSelect
            selectedField={selectedField}
            onFieldChange={handleFieldChange}
          />
        )}
      </div>
      <div>
        <SearchInput
          currentToggleState={toggleState}
          value={searchItem}
          onSearch={handleSearch}
       
        />
        <UserTable users={filterUser} error={error} />
      </div>
    </div>
  );
};
