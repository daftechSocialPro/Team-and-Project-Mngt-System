import React, {useState, useEffect} from 'react'
import { Button } from 'primereact/button';
import CreateProject from './CreateProject';
import Saidbar from '../../component/Saidbar';
import UpdateProject from './UpdateProject';
import { createImagePath } from "../../api/commonApi";
import { useSelector } from 'react-redux';
import { getProjects } from '../../api/projectApi';
import { ProgressBar } from 'primereact/progressbar';
const Project = ({show}) => {
  const user = useSelector((state) => state.user);
  const [proje, setProje] = useState(null);
  const handleUpdate = (project) => {
    setProje(project);
  };
  const getImage = (imagePath) => {
    return createImagePath(imagePath);
  };
  const [isOpen, setIsOpen] =useState(false);
  const [isUpdateOpen, setIsUpdateOpen] =useState(false);
  const [projects, setProjects]= useState([]);
  const fetchData = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  useEffect(() => {
    fetchData();

  }, [isOpen]);

  const getSeverity = (projectStatus) => {

    if (projectStatus === 'ONGOING') {
     return 'info'
    } 
    if(projectStatus === 'PENDING') {
    
      return 'warning'
    }
    if(projectStatus === 'COMPLETED') {
   
      return 'success'
    }
    if(projectStatus === 'CANCELD') {
 
      return 'danger'
    }
  };
  return (
    <>
      <Saidbar />
      <div className="header">
        <div className="title">Projects</div>
        <div className="rightHeader">
          <div className="search">
            <div className="inp">
              <input type="text" placeholder="search" className="searchh" />
              <a href="#" className="searchicon">
                <img src="./img/search.svg" alt="" srcSet="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="projectContainer">
        <div className="Cpro" onClick={() => setIsOpen(true)}>
          <span className="plus">+</span>
          <span className="createnew">Create New </span>
          <span className="createpro">Project</span>
        </div>
        <CreateProject
          open={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
          show={show}
        ></CreateProject>
        {projects.map((item, index) => (
          <div className="projectcard" key={index}>
            <div className="firstrow">
              <span className="proname">{item.projectName}</span>
              <Button
                icon="pi pi-pencil"
                rounded
                text
                raised
                severity="warning"
                aria-label="edit"
                style={{ position: "absolute", marginLeft: "340px" }}
                className=""
                onClick={() => {
                  handleUpdate(item)
                  setIsUpdateOpen(true);
                }}
              />
            </div>
            <div className="secondrow">
              <span className="proteam">
                <span className="teamtit">Assigned To:</span>
                {item.assignedTo}
              </span>
              <span className="descript">
                {" "}
                <span className="teamtit">Description:</span>
                {item.description}
              </span>
            </div>
            <div className="thiredrow">
              {item.projectEmployees.map((data, i)=>(
         <div className="proallpic proproject" key={i}>
         <img src={getImage(data.imagePath)} alt="" className="contproimg" />
         </div>

      ))} 
                 {item.teamProjects.map((data, i)=>(
         <div className="proallpic proproject" key={i}>
         <span> Team Name: {data.name}</span>
         </div>

      ))} 
              <Button
                label={item.projectStatus}
                severity={getSeverity(item.projectStatus)}
                outlined
                style={{ marginRight: "20px" }}
              />
            </div>
            <div className="">
            <ProgressBar value={50}></ProgressBar>
            </div>
          </div>
        ))}
   {proje &&    <UpdateProject
          open={isUpdateOpen}
          project={proje}
          show={show}
          user={user}
          onClose={() => setIsUpdateOpen(false)}
        ></UpdateProject>
   }
      </div>
    </>
  );
}

export default Project