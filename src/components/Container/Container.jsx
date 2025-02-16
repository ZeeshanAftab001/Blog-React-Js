import React from 'react';

export default function Container({ children }) {
  return (
    <div className='w-full text-black mx-auto max-w-7xl p-4'>
      {children}
    </div>
  );
}
