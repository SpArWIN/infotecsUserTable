import { useState } from "react";
import "./index.css";
type ToggleSwitchProps = {
     onToggle: (state: boolean) => void;
}
 const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle }) => {
  const [isChecked, setIsChekded] = useState(false);

  const handleToggle = () => {
    setIsChekded(!isChecked);
    onToggle(!isChecked);
  };
  return (
    <div className="toggle-switch">
      <div>
        <span style={{display:"flex", justifyContent:'center',whiteSpace:'nowrap'}}>{isChecked ? "Поиск по ключу" : "Стандартный поиск"}</span>
      </div>

      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        id="toggleSwitch"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label className="toggle-switch-label" htmlFor="toggleSwitch">
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};
export default ToggleSwitch;
