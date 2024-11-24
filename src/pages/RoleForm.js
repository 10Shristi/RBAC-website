// import React from "react";

// const Dashboard = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <p>Welcome to the RBAC Admin Dashboard!</p>
//     </div>
//   );
// };

// export default Dashboard;
// const RoleForm = ({ role, onSave, onClose }) => {
//   const [name, setName] = useState(role?.name || '');
//   const [permissions, setPermissions] = useState(role?.permissions || []);

//   const allPermissions = ['Read', 'Write', 'Delete']; // Example permissions

//   const togglePermission = (perm) => {
//     if (permissions.includes(perm)) {
//       setPermissions(permissions.filter(p => p !== perm));
//     } else {
//       setPermissions([...permissions, perm]);
//     }
//   };

//   const handleSubmit = () => {
//     onSave({ id: role?.id, name, permissions });
//   };

//   return (
//     <div>
//       <h2>{role ? 'Edit Role' : 'Add Role'}</h2>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Role Name"
//       />
//       <div>
//         <h3>Permissions</h3>
//         {allPermissions.map(perm => (
//           <label key={perm}>
//             <input
//               type="checkbox"
//               checked={permissions.includes(perm)}
//               onChange={() => togglePermission(perm)}
//             />
//             {perm}
//           </label>
//         ))}
//       </div>
//       <button onClick={handleSubmit}>Save</button>
//       <button onClick={onClose}>Cancel</button>
//     </div>
//   );
// };
// import React, { useState } from 'react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';



const RoleForm = ({ role, onSave, onClose }) => {
  const [name, setName] = useState(role?.name || '');
  const [permissions, setPermissions] = useState(role?.permissions || []);

  const allPermissions = ['Read', 'Write', 'Delete'];

  const togglePermission = (perm) => {
    setPermissions(
      permissions.includes(perm)
        ? permissions.filter(p => p !== perm)
        : [...permissions, perm]
    );
  };

  const handleSubmit = () => {
    onSave({ id: role?.id, name, permissions });
  };

  return (
    <div className="modal">
      <h3>{role ? 'Edit Role' : 'Add Role'}</h3>
      <input
        type="text"
        placeholder="Role Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <h4>Permissions</h4>
        {allPermissions.map(perm => (
          <label key={perm}>
            <input
              type="checkbox"
              checked={permissions.includes(perm)}
              onChange={() => togglePermission(perm)}
            />
            {perm}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default RoleForm;


