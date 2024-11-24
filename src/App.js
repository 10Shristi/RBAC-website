// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import React from "react";
// import { Routes, Route, NavLink } from "react-router-dom";
// import Dashboard from "./pages/RoleForm";
// import Users from "./pages/Users";
// import Roles from "./pages/Roles";

// const App = () => {
//   return (
//     <div className="p-5">
//       <nav className="flex space-x-4 border-b pb-2">
//         <NavLink to="/" className="text-blue-600" end>Dashboard</NavLink>
//         <NavLink to="/users" className="text-blue-600">Users</NavLink>
//         <NavLink to="/roles" className="text-blue-600">Roles</NavLink>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/users" element={<Users />} />
//         <Route path="/roles" element={<Roles />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;
import React, { useState } from 'react';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import './App.css';  // Ensure your styles are imported correctly

const App = () => {
  const [view, setView] = useState('users'); // 'users' or 'roles'

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">RBAC Management System</h1>
        <nav className="nav-buttons">
          <button 
            className={`nav-button ${view === 'users' ? 'active' : ''}`} 
            onClick={() => setView('users')}
          >
            User Management
          </button>
          <button 
            className={`nav-button ${view === 'roles' ? 'active' : ''}`} 
            onClick={() => setView('roles')}
          >
            Role Management
          </button>
        </nav>
      </header>
      <main className="main-content">
        {view === 'users' ? <UserManagement /> : <RoleManagement />}
      </main>
    </div>
  );
};

export default App;



