import React from 'react';

export default function Container({ children }) {
  return (
    <div className='w-full bg-black text-white mx-auto max-w-7xl p-4'>
      {children}
    </div>
  );
}
