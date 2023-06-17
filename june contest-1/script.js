let employees = [];

function displayEmployees() {
  const addedEmployeesDiv = document.getElementById('added-employees');
  addedEmployeesDiv.innerHTML = '';
  
  employees.forEach((employee) => {
    const employeeDiv = document.createElement('div');
    employeeDiv.innerHTML = `ID: ${employee.id}, Name: ${employee.name}, Profession: ${employee.profession}, Age: ${employee.age}`;
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteEmployee(employee.id);
      employeeDiv.remove();
    });
    
    employeeDiv.appendChild(deleteButton);
    addedEmployeesDiv.appendChild(employeeDiv);
  });
}

function addEmployee(name, profession, age) {
  const id = employees.length + 1;
  const employee = { id, name, profession, age };
  employees.push(employee);
  displayEmployees();
  
  const successMessage = document.getElementById('success-message');
  successMessage.innerText = 'Employee added successfully.';
  successMessage.classList.add('success');
  
  const errorMessage = document.getElementById('error-message');
  errorMessage.innerText = '';
  errorMessage.classList.remove('error');
  
  document.getElementById('employee-form').reset();
}

function deleteEmployee(id) {
  employees = employees.filter((employee) => employee.id !== id);
  displayEmployees();
}
document.getElementById('employee-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const profession = document.getElementById('profession').value.trim();
    const age = parseInt(document.getElementById('age').value);
    
    if (name === '' || profession === '' || isNaN(age)) {
      const errorMessage = document.getElementById('error-message');
      errorMessage.innerText = 'Please fill in all required fields.';
      errorMessage.classList.add('error');
      
      const successMessage = document.getElementById('success-message');
      successMessage.innerText = '';
      successMessage.classList.remove('success');
    } else {
      addEmployee(name, profession, age);
    }
  });