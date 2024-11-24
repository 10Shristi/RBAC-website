// import React, { useState } from 'react';

import React, { useState } from 'react';
import './UserForm.css'; // Ensure you import the CSS file

const UserForm = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || '');
  const [status, setStatus] = useState(user?.status || 'Active');

  const handleSubmit = async () => {
    const newUser = { id: user?.id, name, role, status };
    await onSave(newUser);  // This will call the save function from UserManagement
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{user ? 'Edit User' : 'Add User'}</h3>
        <form className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              placeholder="Enter role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="save-btn" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

