import "./App.css";
import HomePage from "./pages/home/HomePage";
import CreateUsers from "./pages/users/CreateUsers";
import UserList from "./pages/users/UserList";
import { Router, Routes, Route, NavLink } from "./utils/commonImports";

function App() {
  return (
    <>
      <Router>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/createUser">Create Users</NavLink>
            </li>

            <li>
              <NavLink to="/users">UserList</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createUser" element={<CreateUsers />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
