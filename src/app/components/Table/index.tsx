import { User } from "app/Shared/User/model";

import "./index.css";
import { memo, useEffect, useState } from "react";
import Modal from "../Modal";
import Pagination from "../Pagination";

interface UserTableProps {
  users: User[];
  error: string | null;
}

const UserTable: React.FC<UserTableProps> = memo(({ users, error }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Состояние для выбранного пользователя
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия модального окна

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // Состояние для сортировки
  const [columnWidths, setColumnWidths] = useState<number[]>([
    150, 150, 150, 100, 100, 150, 150, 200, 100,
  ]); // Начальные ширины колонок

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20; // Количество пользователей на странице

  const handleSort = (field: string) => {
    let order: "asc" | "desc" | null = null;

    if (sortField === field) {
      // Если поле уже отсортировано, меняем порядок
      order = sortOrder === "asc" ? "desc" : "asc";
    } else {
      // Если новое поле, устанавливаем сортировку по возрастанию
      order = "asc";
    }

    setSortField(field);
    setSortOrder(order);
  };
  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = columnWidths[index];

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(50, startWidth + (e.clientX - startX));
      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths];
        newWidths[index] = newWidth;
        return newWidths;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField || !sortOrder) return 0;

    const aValue = a[sortField as keyof User];
    const bValue = b[sortField as keyof User];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const handleOpenModal = (user: User) => {
    setSelectedUser(user); // Устанавливаем выбранного пользователя
    setIsModalOpen(true); // Открываем модальное окно
  };

  //Блокировка модального окна
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
    setSelectedUser(null); // Сбрасываем выбранного пользователя
  };
  // Пагинация
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th
              onClick={() => handleSort("lastName")}
              style={{ position: "relative", width: columnWidths[0] }}
            >
              Фамилия{" "}
              {sortField === "lastName" && (sortOrder === "asc" ? "↑" : "↓")}
              <div
                onMouseDown={handleMouseDown(0)}
                style={{
                  cursor: "col-resize",
                  width: "5px",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
              />
            </th>
            <th
              onClick={() => handleSort("firstName")}
              style={{ position: "relative", width: columnWidths[1] }}
            >
              Имя{" "}
              {sortField === "firstName" && (sortOrder === "asc" ? "↑" : "↓")}
              <div
                onMouseDown={handleMouseDown(1)}
                style={{
                  cursor: "col-resize",
                  width: "5px",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
              />
            </th>
            <th
              onClick={() => handleSort("maidenName")}
              style={{ position: "relative", width: columnWidths[2] }}
            >
              Отчество{" "}
              {sortField === "maidenName" && (sortOrder === "asc" ? "↑" : "↓")}
              <div
                onMouseDown={handleMouseDown(2)}
                style={{
                  cursor: "col-resize",
                  width: "5px",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
              />
            </th>
            <th
              onClick={() => handleSort("age")}
              style={{ position: "relative", width: columnWidths[3] }}
            >
              Возраст {sortField === "age" && (sortOrder === "asc" ? "↑" : "↓")}
              <div
                onMouseDown={handleMouseDown(3)}
                style={{
                  cursor: "col-resize",
                  width: "5px",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
              />
            </th>
            <th
              onClick={() => handleSort("gender")}
              style={{ position: "relative", width: columnWidths[4] }}
            >
              Пол {sortField === "gender" && (sortOrder === "asc" ? "↑" : "↓")}
              <div
                onMouseDown={handleMouseDown(4)}
                style={{
                  cursor: "col-resize",
                  width: "5px",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
              />
            </th>
            <th style={{ position: "relative", width: columnWidths[5] }}>
              Номер телефона
              <div
                style={{
                  width: "5px",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
              />
            </th>
            <th
              onClick={() => handleSort("address.city")}
              style={{ position: "relative", width: columnWidths[6] }}
            >
              Город{" "}
              {sortField === "address.city" &&
                (sortOrder === "asc" ? "↑" : "↓")}
              <div
                onMouseDown={handleMouseDown(6)}
                style={{
                  cursor: "col-resize",
                  width: "5px",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
              />
            </th>
            <th
              onClick={() => handleSort("address.address")}
              style={{ position: "relative", width: columnWidths[7] }}
            >
              Адрес{" "}
              {sortField === "address.address" &&
                (sortOrder === "asc" ? "↑" : "↓")}
              <div
                onMouseDown={handleMouseDown(7)}
                style={{
                  cursor: "col-resize",
                  width: "5px",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
              />
            </th>
            <th style={{ position: "relative", width: columnWidths[8] }}>
              Действия
              <div
                style={{
                  width: "5px",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan={8} className="error">
                {error}
              </td>
            </tr>
          ) : paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.maidenName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.address.city}</td>
                <td>{user.address.address}</td>
                <td>
                  <button
                    onClick={() => handleOpenModal(user)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 15px",
                      fontSize: "16px",
                      cursor: "pointer",
                      transition: "background-color 0.3s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0056b3";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#007bff";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Открыть
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>Нет пользователей для отображения</td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Modal
        user={selectedUser}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      />
    </div>
  );
});
export default UserTable;
