import './App.css'
import Home from './Home'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddEmployeePage from './AddEmployeePage';
import Nav1 from './Nav1';
import EditEmployeePage from './EditEmployeePage';
import HomePage from './HomePage';
function App() {

  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
  };

  const editEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    setEditingEmployee(null);
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        setEmployees(employees.filter((emp) => emp.id !== id));
      } else {
        console.error('Error deleting employee:', response.status);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  
  



  return (
    <div>
   <Nav1/>
     <Router  >
     <div style={{textAlign:'end',paddingRight:'20px',fontWeight:'bolder',color:'red',textDecoration:'none',fontSize:'20px'}}>
       <nav>
          <Link to="/">Home</Link> | <Link to="/add-employee">Add Employee</Link>
          {editingEmployee && (
            <>
              {' | '}
              <Link to={`/edit-employee/${editingEmployee.id}`}>Edit Employee</Link>
            </>
          )}
        </nav>
     </div>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              employees={employees} 
              deleteEmployee={deleteEmployee} 
             
              editingEmployee={editingEmployee}
              editEmployee={editEmployee}
            />
          } 
        />
        <Route 
          path="/add-employee" 
          element={<AddEmployeePage addEmployee={addEmployee} />} 
        />

 <Route path="/edit/:id" element={<EditEmployeePage />} />
      </Routes>
    </Router>
   

    </div>

   
  )
}

export default App
