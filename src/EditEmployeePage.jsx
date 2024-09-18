import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployeePage = ({ employees, editEmployee }) => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const emp = employees.find(emp => emp.id === parseInt(id));
    if (emp) {
      setEmployee(emp);
    }
  }, [id, employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editEmployee(employee);  
    navigate('/');  
  };

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div style={{justifyContent:'center'}}>
      <h2 className='text-center'>Edit Employee</h2>
      <div  style={{justifyItems:'center',marginLeft:'30%'}}>
          <form  onSubmit={handleSubmit}>
            <input
              className='me-3 text-center '
              type="text" 
              name="userName" 
              placeholder="Username" 
              value={employee.userName} 
              onChange={handleChange} 
              required 
            />
            <input 
             className='me-3 '
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
            <button  className='btn btn-primary  mt-2 mb-2' type="submit">Save Changes</button>
          </form>
      </div>
    </div>
  );
};

export default EditEmployeePage;
