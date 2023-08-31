import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ecard.css";
import { Button } from 'primereact/button';
import { createImagePath } from "../../api/commonApi";
import UpdateEmployee from "../../Pages/Employee/UpdateEmployee";
export const Ecard = ({ searchResults, show, searchQuery }) => {
  const getImage = (imagePath) => {
    return createImagePath(imagePath);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [emp, setEmp] = useState(null);
  const handleUpdate = (employee) => {
    setEmp(employee);
  };
  return (
    <div className="card-cont">
      {searchResults.map((item, index) => (
        <div className="Ecard" key={index}>
          <div className="card-image">
            <img src={getImage(item.imagePath)} alt="userpic" />
          </div>
          <Button icon="pi pi-pencil" rounded text raised severity="warning" aria-label="edit" style={{position:"absolute", top:"5px", right:"5px"}} className=""  onClick={() => {
              setIsOpen(true);
              handleUpdate(item);
            }} />
          <Link className="LINKE" to={`/empdetail/${item.id}`}>
            <p className="Ename">
              {item.firstName} {item.lastName}
            </p>
          </Link>
          <p className="email">{item.email}</p>
          <p className="occu">{item.employmentPosition}</p>
      
        
        </div>
      ))}
      {emp && (
        <UpdateEmployee
          open={isOpen}
          onClose={setIsOpen}
          employee={emp}
          show={show}
        />
      )}
    </div>
  );
};
