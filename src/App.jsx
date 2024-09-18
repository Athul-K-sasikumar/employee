import './App.css'
import Home from './Home'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddEmployeePage from './AddEmployeePage';
import Nav1 from './Nav1';
import EditEmployeePage from './EditEmployeePage';
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

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
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
            <Home 
              employees={employees} 
              deleteEmployee={deleteEmployee} 
              handleEditClick={handleEditClick}
              editingEmployee={editingEmployee}
              editEmployee={editEmployee}
            />
          } 
        />
        <Route 
          path="/add-employee" 
          element={<AddEmployeePage addEmployee={addEmployee} />} 
        />

<Route 
          path="/edit-employee/:id" 
          element={<EditEmployeePage employees={employees} editEmployee={editEmployee} />} 
        />
      </Routes>
    </Router>
   

    </div>

   
  )
}

export default App
