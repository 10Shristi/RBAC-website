// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Roles = () => {
//   const [roles, setRoles] = useState([]);
//   const [newRole, setNewRole] = useState("");

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     const res = await axios.get("http://localhost:5000/roles");
//     setRoles(res.data);
//   };

//   const handleAddRole = async () => {
//     await axios.post("http://localhost:5000/roles", { name: newRole });
//     fetchRoles();
//     setNewRole("");
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Roles</h1>
//       <div className="mb-4">
//         <input
//           className="border px-2 py-1 mr-2"
//           placeholder="Role Name"
//           value={newRole}
//           onChange={(e) => setNewRole(e.target.value)}
//         />
//         <button className="bg-blue-500 text-white px-3 py-1" onClick={handleAddRole}>
//           Add Role
//         </button>
//       </div>
//       <ul className="list-disc pl-5">
//         {roles.map((role) => (
//           <li key={role.id}>{role.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Roles;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import RoleForm from './RoleForm'; // Adjust the path if necessary


// const RoleManagement = () => {
  
//   const [roles, setRoles] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentRole, setCurrentRole] = useState(null);

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/roles');
//       setRoles(response.data);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//     }
//   };

//   const handleSave = async (role) => {
//     if (role.id) {
//       await axios.put(`http://localhost:5000/roles/${role.id}`, role);
//     } else {
//       await axios.post('http://localhost:5000/roles', role);
//     }
//     fetchRoles();
//     setModalOpen(false);
//   };

//   return (
//     <div>
//       <h1>Role Management</h1>
//       <button onClick={() => setModalOpen(true)}>Add Role</button>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Permissions</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {roles.map(role => (
//             <tr key={role.id}>
//               <td>{role.name}</td>
//               <td>{role.permissions.join(', ')}</td>
//               <td>
//                 <button onClick={() => { setCurrentRole(role); setModalOpen(true); }}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {modalOpen && (
//         <RoleForm
//           role={currentRole}
//           onClose={() => setModalOpen(false)}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// };
// export default RoleManagement; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './RoleManagement.css';  // Assuming your CSS file is named "styles.css"

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [roleForm, setRoleForm] = useState({
    id: null,
    name: '',
    permissions: [],
    customAttributes: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setRoles(savedRoles);
  }, []);

  const saveRolesToLocalStorage = (updatedRoles) => {
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
  };

  const openModal = (role = null) => {
    setShowModal(true);
    if (role) {
      setIsEditing(true);
      setRoleForm(role);
    } else {
      setIsEditing(false);
      setRoleForm({ id: null, name: '', permissions: [], customAttributes: '' });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setRoleForm({ id: null, name: '', permissions: [], customAttributes: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (perm) => {
    setRoleForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const saveRole = () => {
    if (isEditing) {
      const updatedRoles = roles.map((role) =>
        role.id === roleForm.id ? roleForm : role
      );
      setRoles(updatedRoles);
      saveRolesToLocalStorage(updatedRoles);
    } else {
      const newRole = { ...roleForm, id: Date.now() };
      const updatedRoles = [...roles, newRole];
      setRoles(updatedRoles);
      saveRolesToLocalStorage(updatedRoles);
    }
    closeModal();
  };

  const deleteRole = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles);
    saveRolesToLocalStorage(updatedRoles);
  };

  return (
    <div className="role-management-container">
      <h2 className="title">Role Management</h2>

      <button
        onClick={() => openModal()}
        className="btn-create"
      >
        Create New Role
      </button>

      <div className="role-cards-container">
        {roles.map((role) => (
          <div key={role.id} className="role-card">
            <h3 className="role-name">{role.name}</h3>
            <p className="role-permissions">
              <strong>Permissions:</strong> {role.permissions.join(', ')}
            </p>
            <p className="role-custom-attributes">
              <strong>Attributes:</strong> {role.customAttributes}
            </p>
            <div className="role-actions">
              <button onClick={() => openModal(role)} className="btn-edit">
                <FaEdit />
              </button>
              <button onClick={() => deleteRole(role.id)} className="btn-delete">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{isEditing ? 'Edit Role' : 'Create Role'}</h3>
            <div className="form-group">
              <label>Role Name</label>
              <input
                type="text"
                name="name"
                value={roleForm.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Permissions</label>
              {['Read', 'Write', 'Delete'].map((perm) => (
                <div key={perm} className="permission-checkbox">
                  <input
                    type="checkbox"
                    checked={roleForm.permissions.includes(perm)}
                    onChange={() => handlePermissionChange(perm)}
                  />
                  <label>{perm}</label>
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Custom Attributes</label>
              <input
                type="text"
                name="customAttributes"
                value={roleForm.customAttributes}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="modal-actions">
              <button onClick={closeModal} className="btn-cancel">Cancel</button>
              <button onClick={saveRole} className="btn-save">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './RoleManagement.css';

// import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// const RoleManagement = () => {
//   const [roles, setRoles] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterPermissions, setFilterPermissions] = useState([]);
//   const [selectedRoles, setSelectedRoles] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rolesPerPage = 5;

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/roles');
//       setRoles(response.data);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//     }
//   };

//   const sortRoles = (field) => {
//     const sortedRoles = [...roles].sort((a, b) => {
//       if (field === 'name') {
//         return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
//       } else if (field === 'permissions') {
//         return sortOrder === 'asc' ? a.permissions.length - b.permissions.length : b.permissions.length - a.permissions.length;
//       }
//     });
//     setRoles(sortedRoles);
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');  // Toggle sort order
//   };

//   const handleFilterChange = (perm) => {
//     setFilterPermissions(prev =>
//       prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]
//     );
//   };

//   const handleRoleSelect = (roleId) => {
//     setSelectedRoles(prevSelected =>
//       prevSelected.includes(roleId) ? prevSelected.filter(id => id !== roleId) : [...prevSelected, roleId]
//     );
//   };

//   const handleBulkDelete = async () => {
//     try {
//       await axios.delete('http://localhost:5000/roles', { data: { ids: selectedRoles } });
//       fetchRoles(); // Refresh roles after delete
//       setSelectedRoles([]); // Clear selected roles
//     } catch (error) {
//       console.error('Error deleting roles:', error);
//     }
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const filteredRoles = roles
//     .filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     .filter(role => filterPermissions.every(perm => role.permissions.includes(perm)));

//   const rolesToDisplay = filteredRoles.slice((currentPage - 1) * rolesPerPage, currentPage * rolesPerPage);
//   const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

//   return (
//     <div>
//       <h2>Role Management</h2>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search roles by name"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       {/* Permissions Filter */}
//       <div>
//         <h3>Filter by Permissions</h3>
//         <label>
//           <input
//             type="checkbox"
//             checked={filterPermissions.includes('Read')}
//             onChange={() => handleFilterChange('Read')}
//           />
//           Read
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             checked={filterPermissions.includes('Write')}
//             onChange={() => handleFilterChange('Write')}
//           />
//           Write
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             checked={filterPermissions.includes('Delete')}
//             onChange={() => handleFilterChange('Delete')}
//           />
//           Delete
//         </label>
//       </div>

//       {/* Sort Buttons */}
//       <button onClick={() => sortRoles('name')}>Sort by Name</button>
//       <button onClick={() => sortRoles('permissions')}>Sort by Permissions</button>

//       {/* Bulk Delete Button */}
//       {/* <button onClick={handleBulkDelete} disabled={selectedRoles.length === 0}>
//         Delete Selected Roles
//       </button> */}

//       {/* Roles Table */}
//       <table>
//         <thead>
//           <tr>
//             <th>Select</th>
//             <th>Name</th>
//             <th>Permissions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rolesToDisplay.map((role) => (
//             <tr key={role.id}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedRoles.includes(role.id)}
//                   onChange={() => handleRoleSelect(role.id)}
//                 />
//               </td>
//               <td>{role.name}</td>
//               <td>{role.permissions.join(', ')}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div>
//         <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;


