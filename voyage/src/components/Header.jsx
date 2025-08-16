import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold">Voyage</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/reports" className="hover:underline">Reports</Link>
          <Link to="/settings" className="hover:underline">Settings</Link>
        </nav>
      </div>
    </header>
  );
}
