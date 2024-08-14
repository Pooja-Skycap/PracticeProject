import "./App.css";
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
              <NavLink to="/">UserList</NavLink>
            </li>
            <li>
              <NavLink to="/createUser">Create Users</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/createUser" element={<CreateUsers />} />
          <Route path="/createUser/:userId" element={<CreateUsers />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
