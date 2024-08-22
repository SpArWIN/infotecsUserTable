import { User } from "app/Shared/User/model";
import "./index.css";

interface ModalProps {
  user: User | null;
  onClose: () => void;
  isOpen: boolean;

}

const Modal: React.FC<ModalProps> = ({ user, onClose, isOpen }) => {
  return (
    <div className={`modal-overlay ${isOpen ? "active" : ""}`}>
      <div className="modal-content">
        {user ? (
          <>
            <h2>Информация о пользователе</h2>
            <div className="modal-item">
              <strong>ФИО:</strong>{" "}
              {`${user.firstName} ${user.lastName} ${user.maidenName}`}
            </div>
            <div className="divider" />
            <div className="modal-item">
              <strong>Возраст:</strong> {user.age}
            </div>
            <div className="divider" />
            <div className="modal-item">
              <strong>Адрес:</strong>{" "}
              {`${user.address.city}, ${user.address.address}`}
            </div>
            <div className="divider" />
            <div className="modal-item">
              <strong>Рост:</strong> {user.height} см
            </div>
            <div className="divider" />
            <div className="modal-item">
              <strong>Вес:</strong> {user.weight} кг
            </div>
            <div className="divider" />
            <div className="modal-item">
              <strong>Номер телефона:</strong> {user.phone}
            </div>
            <div className="divider" />
            <div className="modal-item">
              <strong>Email:</strong> {user.email}
            </div>
          </>
        ) : (
          <div>
            <h2>Нет данных о пользователе</h2>
          </div>
        )}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;