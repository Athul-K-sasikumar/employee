import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {

    const [employees, setEmployees] = useState([]);

  // Fetch employees from JSON Server
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees'); // Use your deployed JSON Server URL here
        const data = await response.json();
        setEmployees(data); // Set the employee data to state
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

      
      
        

  return (
    <div  style={{textAlign:'center',justifyContent:'center'}}>
      <h2>Employee List</h2>
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
        <tbody style={{color:'brown'}}>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.userName}</td>
              <td>{emp.email}</td>
              <td>{emp.status}</td>
              <td>
              <button onClick={() => navigate(`/edit/${emp.id}`)}>Edit</button>

                <button className='btn btn-success ms-2 mb-2 mt-2' onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home