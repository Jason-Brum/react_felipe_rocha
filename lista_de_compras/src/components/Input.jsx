function Input(props) {
  return (
    <input
      className={`border border-red-300 outline-red-400 px-4 py-2  rounded-md font-medium text-gray-700 ${props.className}`}
      {...props}
    />
  );
}

export default Input;
