import Link from 'next/link';
import React from 'react';
import Logo from './Logo';

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
    <Link href="/">
      <Logo/>
    </Link>
    <Link href="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
  </header>
  );
}

export default Navbar;
