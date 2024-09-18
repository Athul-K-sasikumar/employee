import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployeePage = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    userName: '',
    email: '',
    status: 'Active'
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employees`);
        const data = await response.json();
        setEmployee(data);  
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await fetch(`http://localhost:3000/employees`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      });

      navigate('/');  
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h2 className='text-center text-danger fw-bolder pb-3'>Edit Employee</h2>
     <div style={{justifyItems:'center',marginLeft:'30%'}} >
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
             className='me-3 '
              type="email" 
              name="email" 
              placeholder="Email" 
              value={employee.email} 
              onChange={handleChange} 
              required 
            />
            <select 
              name="status" 
              value={employee.status} 
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className='btn btn-success ms-2 ' type="submit">Save Changes</button>
          </form>
     </div  >
    </div>
  );
};

export default EditEmployeePage;
