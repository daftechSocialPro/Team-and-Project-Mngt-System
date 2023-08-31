import React, {useState} from "react";
import { Link } from "react-router-dom";
import { PrimeIcons } from 'primereact/api';
import "./ecard.css";
import { createImagePath } from "../../api/commonApi";
import UpdateEmployee from "../../Pages/UpdateEmployee";
export const Ecard = ({ searchResults,show,searchQuery}) => {



  const getImage = (imagePath) => {
  
    return createImagePath(imagePath);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [emp, setEmp] = useState(null);
  const handleUpdate = (employee) => {
    // updateEmployee(employeeId);
  
    setEmp(employee)
  };
  return (
    <div className="card-cont">
        {searchResults.map((item, index) => (
      <div className="Ecard" key={index}>
        <div className="card-image">
          <img src={getImage(item.imagePath)} alt="userpic" />
        </div>
        <Link to={`/empdetail/${item.id}`}>
          <p className="Ename">{item.firstName} {item.lastName}</p>
        </Link>
        <p className="email">{item.email}</p>
        <p className="occu">{item.employmentPosition}</p>
        {/* <i className="pi-user-edit" style={{ fontSize: '1rem' }}></i> */}
        <span style={{marginLeft:"50px", cursor:"pointer"}} onClick={() =>{setIsOpen(true); handleUpdate(item)}}  >Edit</span> 
       
      </div>
      
        ))}
       {emp && <UpdateEmployee open={isOpen} onClose={setIsOpen} employee={emp} show={show} /> }

    </div>
  );
};
