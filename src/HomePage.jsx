import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serverUrl from './serverUrl';

const HomePage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${serverUrl}/employees`); 
        const data = await response.json();
        setEmployees(data); 
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);


  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${serverUrl}/employees/${id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete employee with id ${id}`);
      }
  
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  

  return (
    <div>
      <h2 className='text-center text-danger'>Employee List</h2>
      <table border="1px" style={{paddingLeft:'40px',marginTop:'40px',marginLeft:'15%',width:'70%'}}>
        <thead style={{color:'red',textAlign:'center',fontWeight:'bolder'}}>
          <tr style={{paddingRight:'20px' }}>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{textAlign:'center'}}>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.userName}</td>
              <td>{emp.email}</td>
              <td>{emp.status}</td>
              <td>
<button className='btn btn-danger me-2 mb-2 mt-2' onClick={() => navigate(`/edit/${emp.id}`)}>Edit</button>

                
                <button  className='btn btn-success ms-2 mb-2 mt-2'  onClick={() => deleteEmployee(emp.id)}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
