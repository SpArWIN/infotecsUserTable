import "./index.css";
interface SearchInputProps {
  value: string;

  onSearch: (term: string) => void;
  currentToggleState: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onSearch,

  currentToggleState,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
    // toggleState(!currentToggleState);
  };

  //Меняем цвет рамки - определяем состояние
  const inputClass = currentToggleState
    ? "search-input active"
    : "search-input";

  return (
    <input
      type="text"
      className={inputClass}
      placeholder="Поиск по таблице..."
      value={value}
      onChange={handleChange}
    />
  );
};
export default SearchInput;
