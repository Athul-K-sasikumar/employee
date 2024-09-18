import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployeePage = ({ addEmployee }) => {
  const [employee, setEmployee] = useState({ userName: '', email: '', status: 'Active' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await fetch(`http://localhost:3000/employees`, {
      method: 'POST',  // Use POST instead of PUT for creating new resources
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });

    navigate('/');  // Redirect back to home page after adding the employee
};


  return (
    <div>
      <h2 className='text-center pb-4 fw-bolder text-danger'>Add Employee</h2>
      <div  style={{justifyItems:'center',marginLeft:'30%'}}>
          <form onSubmit={handleSubmit}>
            <input 
            className='me-3 text-center'
              type="text" 
              name="userName" 
              placeholder="Username" 
              value={employee.userName} 
              onChange={handleChange} 
              required 
            />
            <input 
            className='me-3 text-center text-dark'
              type="email" 
              name="email" 
              placeholder="Email" 
              value={employee.email} 
              onChange={handleChange} 
              required 
            />
            <select 
            className='me-3'
              name="status" 
              value={employee.status} 
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className='btn btn-dark w-25 mt-2 mb-2' type="submit">Add Employee</button>
          </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
