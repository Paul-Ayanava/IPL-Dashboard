"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        className="p-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <div className="w-6 flex flex-col gap-1">
          <span className={`h-0.5 w-full bg-gray-800 transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`h-0.5 w-full bg-gray-800 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`h-0.5 w-full bg-gray-800 transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </button>

      {/* Menu Dropdown */}
      <div className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home</Link>
        <Link href="/pointstable" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Points Table</Link>
        <Link href="/schedule" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Schedule</Link>
      </div>
    </div>
  );
}