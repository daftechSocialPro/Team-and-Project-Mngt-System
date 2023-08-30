import React, { useState, useEffect } from "react";
import ProCard from "../component/EmployeeCard/ProCard";
import ProTable from "../component/EmployeeCard/ProTable";
import Saidbar from "../component/Saidbar";
import { getEmployeeDetails } from "../api/employeeAPi";
import { useParams } from "react-router-dom";
const EmpDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const fetchEmployeeDetails = async () => {
    try {
      const data = await getEmployeeDetails(id);
   
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };
  useEffect(() => {
 
    fetchEmployeeDetails();
    
  }, [id]);

  if (!employee) {
    return <div>Loading employee details...</div>;
  }

  return (
    <>
      
      {employee && (
        <>
          <Saidbar employee={employee}/>
          <ProCard employee={employee} />
          <ProTable employee={employee} />
        </>
      )}
    </>
  );
};

export default EmpDetail;
