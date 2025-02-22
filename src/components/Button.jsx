import React from 'react';

export default function Button({
  value,
  label,
  className = "",
  type = "submit",
}) {
  return (
    <button
      type={type}
      className={`inline-block rounded-xl bg-amber-400 p-3 duration-200 hover:bg-orange-600 ${className}`}
    >
      {value || label}
    </button>
  );
}
