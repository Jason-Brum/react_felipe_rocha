// Button.jsx
import { useTheme } from "../context/ThemeContext";

function Button({ children, ...props }) {
  const { theme } = useTheme();

  return (
    <button
      {...props}
      className={`bg-${theme}-500 text-white px-4 py-2 rounded-md font-medium`}
    >
      {children}
    </button>
  );
}

export default Button;
