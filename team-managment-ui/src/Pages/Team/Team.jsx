import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Saidbar from "../../component/Saidbar";
import CreateTeam from "../Team/CreateTeam";
import AddMember from "./AddMember";
import { Button } from "primereact/button";
import { getTeams } from "../../api/teamApi";
import { createImagePath } from "../../api/commonApi";
import UpdateTeam from "../Team/UpdateTeam";
import { useSelector } from "react-redux";
import {getProject} from '../../api/teamApi'
const Team = ({ show }) => {
  const user = useSelector((state) => state.user);
  const getImage = (imagePath) => {
    return createImagePath(imagePath);
  };
  const [teamId, setTeamId] = useState(null);
  const [tem, setTem] = useState(null);
  const handleUpdate = (team) => {
    setTem(team);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpensmall, setIsOpensmall] = useState(false);
  const [isOpenedit, setIsOpenecit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] =useState([]);
  const fetchData = async () => {
    try {
      const data = await getTeams();
      const proData = await getProject();
      setTeams(data);
      setProjects(proData);
      console.log("proData", proData);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isOpen]);

  const handleSearch = () => {
    console.log(searchQuery);
    const filteredResults = teams.filter((item) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    if (teams.length > 0) {
      setTeamId(teams[0].id);
    }
  }, [teams]);

  return (
    <>
      <Saidbar />
      <div className="header">
        <div className="title">Teams</div>
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
        </div>
      </div>

      <div className="line"></div>
      <div className="teamcont">
      {teams.map((data, index) => (  <div className="teamcar" key={index}>
        <div className="cardContent">
        <div className="add-teamMember">
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    raised
                    severity="warning"
                    aria-label="edit"
                    style={{
                      position: "absolute",
                      marginLeft: "230px",
                      marginTop: "-5px",
                    }}
                    onClick={() => {
                      setIsOpenecit(true);
                      handleUpdate(data)
                    }}
                  />
                </div>
                <div className="teamTitle">
                  <span className="teamname">{data.teamName}</span>
                </div>
                <div className="assignedpro">
           {data.teamProjects.map((item,index)=>(
            <ul className="assignpro" key={index}>
                    <li className="projects">
                      <span className="pi pi-folder lisp"></span>{item.name}
                    </li>
                  </ul>
           ))}      
                </div>
        </div>
  
                <div className="proallpic">
                {data.teamEmployees.map((employee, i) => (
                  <img
                    key={employee.id}
                    src={getImage(employee.imagePath)}
                    className="contproimg"
                  />
                ))}
            <Button
                  icon="pi pi-user-plus"
                  rounded
                  text
                  raised
                  severity="warning"
                  aria-label="edit"
                  style={{
                    position: "absolute",
                    zIndex: 16,
                    left: "120px",
                    width: "40px",
                    height: "40px",
                    background: "#fff",
                  }}
                  onClick={() => {
                    setIsOpensmall(true);
                  }}
                />
              </div>
        </div>
            ))}
        </div>
      {teamId && (
        <AddMember
          open={isOpensmall}
          onClose={setIsOpensmall}
          teamId={teamId}
          user={user}
          show={show}
        />
      )}
    {tem &&   <UpdateTeam
        open={isOpenedit}
        onClose={setIsOpenecit}
        show={show}
        team={tem}
      ></UpdateTeam>}
      <CreateTeam open={isOpen} onClose={setIsOpen} show={show} user={user}></CreateTeam>
    </>
  );
};

export default Team;
