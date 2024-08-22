interface SearchFieldSelectProps {
  selectedField: string;
  onFieldChange: (field: string) => void;
  
}
import "./index.css";

const SearchFieldSelect: React.FC<SearchFieldSelectProps> = ({
  selectedField,
  onFieldChange,
}) => {
  return (
    <div className="select-container">
      <label className="select-label">Поиск по полю:</label>
      <select
        className="select"
        value={selectedField}
        onChange={(e) => onFieldChange(e.target.value)}
      >
        <option value="firstName">Имя</option>
        <option value="lastName">Фамилия</option>
        <option value="maidenName">Отчество</option>
        <option value="age">Возраст</option>
        <option value="gender">Пол</option>
        <option value="phone">Номер телефона</option>
        <option value="address.city">Город</option>
        <option value="address.address">Улица</option>
      </select>
    </div>
  );
};

export default SearchFieldSelect;
