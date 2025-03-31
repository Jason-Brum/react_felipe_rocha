// Input.jsx
import { useTheme } from "../context/ThemeContext";

function Input(props) {
  const { theme } = useTheme();

  return (
    <input
      className={`border border-${theme}-300 outline-none px-4 py-2 rounded-md font-medium text-gray-700 w-full`}
      {...props}
    />
  );
}

export default Input;
