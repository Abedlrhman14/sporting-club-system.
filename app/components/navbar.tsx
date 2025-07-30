// components/Navbar.tsx
'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-yellow-400 text-yellow-400 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Blue Ribbon Club</h1>
      <div className="space-x-4">
        <Link href="/" className="hover:underline hover:text-white transition">Home</Link>
        <Link href="/sports" className="hover:underline hover:text-white transition">Sports</Link>
        <Link href="/members" className="hover:underline hover:text-white transition">Members</Link>
        <Link href="/subscriptions" className="hover:underline hover:text-white transition">Subscriptions</Link>
      </div>
    </nav>
  );
};

export default Navbar;