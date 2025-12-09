import React from "react";

type InputProps = Omit<React.ComponentProps<"input">, "className">;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      value={props.value || ""}
      className="block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-700 text-white"
    />
  );
}