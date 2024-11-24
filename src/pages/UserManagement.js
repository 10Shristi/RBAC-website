// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const res = await axios.get("http://localhost:5000/users");
//     setUsers(res.data);
//   };

//   const handleAddUser = async () => {
//     await axios.post("http://localhost:5000/users", newUser);
//     fetchUsers();
//     setNewUser({ name: "", email: "", role: "" });
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Users</h1>
//       <div className="mb-4">
//         <input
//           className="border px-2 py-1 mr-2"
//           placeholder="Name"
//           value={newUser.name}
//           onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//         />
//         <input
//           className="border px-2 py-1 mr-2"
//           placeholder="Email"
//           value={newUser.email}
//           onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//         />
//         <input
//           className="border px-2 py-1 mr-2"
//           placeholder="Role"
//           value={newUser.role}
//           onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//         />
//         <button className="bg-blue-500 text-white px-3 py-1" onClick={handleAddUser}>
//           Add User
//         </button>
//       </div>
//       <table className="table-auto border-collapse border border-gray-400">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Name</th>
//             <th className="border border-gray-300 px-4 py-2">Email</th>
//             <th className="border border-gray-300 px-4 py-2">Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td className="border border-gray-300 px-4 py-2">{user.name}</td>
//               <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//               <td className="border border-gray-300 px-4 py-2">{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UserForm from './UserForm'; // Adjust the path if necessary


// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/users/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const handleSave = async (user) => {
//     if (user.id) {
//       await axios.put(`http://localhost:5000/users/${user.id}`, user);
//     } else {
//       await axios.post('http://localhost:5000/users', user);
//     }
//     fetchUsers();
//     setModalOpen(false);
//   };

//   return (
//     <div>
//       <h1>User Management</h1>
//       <button onClick={() => setModalOpen(true)}>Add User</button>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Role</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.role}</td>
//               <td>{user.status}</td>
//               <td>
//                 <button onClick={() => { setCurrentUser(user); setModalOpen(true); }}>Edit</button>
//                 <button onClick={() => handleDelete(user.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {modalOpen && (
//         <UserForm
//           user={currentUser}
//           onClose={() => setModalOpen(false)}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// };

// export default UserManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm'; // Ensure this is imported correctly
import './UserManagement.css';  // Assuming your CSS file is named "styles.css"

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSave = async (newUser) => {
    if (newUser.id) {
      await axios.put(`http://localhost:5000/users/${newUser.id}`, newUser);
    } else {
      const response = await axios.post('http://localhost:5000/users', newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    }
    setModalOpen(false);
  };

  return (
    <div className="user-management-container">
      <h1 className="title">User Management</h1>
      <button className="btn-create" onClick={() => setModalOpen(true)}>
        Add User
      </button>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button 
                    className="btn-edit" 
                    onClick={() => { 
                      setCurrentUser(user); 
                      setModalOpen(true); 
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <UserForm
          user={currentUser}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserManagement;



