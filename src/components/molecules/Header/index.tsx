import HamburgerMenu from "@/components/atoms/Hamburger";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Side - Hamburger Menu (mobile only) */}
        <div className="flex items-center md:hidden">
          <HamburgerMenu />
        </div>

        {/* Centered Heading */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-30 md:transform-none">
          <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">
            IPL 2023 Dashboard
          </h1>
        </div>

        {/* Right Side - Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/pointstable"
            className="text-gray-700 hover:text-blue-600"
          >
            Points Table
          </Link>
          <Link href="/schedule" className="text-gray-700 hover:text-blue-600">
            Schedule
          </Link>
        </nav>

        {/* Right Side Spacer (mobile only) */}
        <div className="w-6 md:hidden"></div>
      </div>
    </header>
  );
}
