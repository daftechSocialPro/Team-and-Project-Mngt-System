import React, { useState, useEffect } from "react";
import { Ecard } from "../../component/EmployeeCard/Ecard";
import { Link } from "react-router-dom";
import CreateEmployee from "./CreateEmployee";
import Saidbar from "../../component/Saidbar";
import { useSelector } from "react-redux";
import { getEmployees } from "../../api/employeeAPi";
const Employee = ({ show }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
      setSearchResults(data);
      console.log("employee", data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isOpen]);
  const handleSearch = () => {
    console.log(searchQuery);
    const filteredResults = employees.filter((item) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <>
      <Saidbar />
      <div className="header">
        <div className="title">Employess</div>
        <div className="rightHeader">
          <div className="search">
            <div className="inp">
              <input
                type="text"
                placeholder="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch();
                }}
                className="searchh"
              />
              <a href="#" className="searchicon" onClick={handleSearch}>
                <img src="./img/search.svg" alt="" srcSet="" />
              </a>
            </div>
          </div>
          <div className="creatnew">
            {" "}
            <Link href="#" onClick={() => setIsOpen(true)}>
              <i
                className="pi pi-user-plus"
                style={{ color: "#06ecfe", fontSize: "30px" }}
              ></i>
            </Link>
          </div>

          <CreateEmployee
            open={isOpen}
            onClose={setIsOpen}
            show={show}
            user={user}
          ></CreateEmployee>
        </div>
      </div>

      <div className="line"></div>
      <Ecard searchResults={searchResults} show={show} />
    </>
  );
};

export default Employee;
