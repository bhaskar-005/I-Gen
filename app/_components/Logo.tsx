import React from 'react';

const Logo = () => {
  return (
    <div className='flex flex-row items-end '>
    <div className='h-8'>
      <img className='h-full w-full' src="https://static.thenounproject.com/png/6056251-200.png" alt="logo" />
    </div>
    <h2 className='text-black font-[1000] -mb-1 text-2xl font-serif'>
       <span className='text-[#6469ff]'>I</span> Gen
    </h2>
    </div>
  );
}

export default Logo;
