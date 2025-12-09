import React from "react";

type TextareaProps = Omit<React.ComponentProps<"textarea">, "className">;

export default function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      rows={4}
      className="block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-700 text-white"
    />
  );
}