import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="px-2 py-4 border-b">
      <div className="container flex justify-between">
        <h1 className="text-xl font-bold text-white">
          Country Info App
        </h1>
        <ul>
          <li>
            <Link to="/" className="hover:underline">
              countries
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

