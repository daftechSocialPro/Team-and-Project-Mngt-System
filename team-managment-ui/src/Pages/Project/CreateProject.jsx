import React, { useState, useEffect} from "react";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { useDispatch } from "react-redux";
import {
  getProjectTeam,
  getProjectEmployee,
  createProject,
} from "../../api/projectApi";
import { createImagePath } from "../../api/commonApi";
import { setLoading } from "../../store/loadingReducer";
const MODAL_STAYL = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "900px",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#fff",
  zIndex: 1000,
  borderRadius: "5px",
};
const OVERLAY = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.8)",
  zIndex: 1000,
};
const CLOSEBUTTON = {
  width: "50px",
  height: "50px",
  paddingRight: "20px",
  cursor: "pointer",
};
const LINE = {
  width: "160px",
  height: "4px",
  backgroundColor: "#CCD8FD",
  marginLeft: "30px",
};
const LINEE = {
  width: "100%",
  height: "4px",
  backgroundColor: "#CCD8FD",
  marginTop: "5px",
};
const TOPER = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  top: 0,
};
const INPUTWRAP = {
  display: "flex",
  flexDirection: "column",
};
const INPUTWRAPS = {
  display: "flex",
};
const INPUTWRAPSS = {
  display: "flex",
  alignItems: "center",
  marginLeft: "300px",
};
const HTITLE = {
  color: "#000",
  opacity: 0.8,
  fontSize: "24px",
  paddingLeft: "20px",
  fontWeight: 500,
};
const COLU = {
  display: "flex",
  flexDirection: "column",
};

const LABEL = {
  color: "#000",
  fontSize: "18px",
  paddingRight: "15px",
  fontWeight: 400,
  marginLeft: "10px",
  color: "#000",
  opacity: 0.9,
  margin: "8px 0",
};
const INPUT = {
  width: "250px",
  height: "38px",
  backgroundColor: "#C1D0FC",
  opacity: 0.3,
  color: "#000",
  padding: "3px 10px",
  margin: "8px 0",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "40px",
};
const INPUTT = {
  width: "100%",
  height: "38px",
  backgroundColor: "#C1D0FC",
  opacity: 0.3,
  color: "#000",
  padding: "3px 10px",
  margin: "8px 0",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "40px",
};
const FORMWRAPP = {
  padding: "30px",
};
const ONECOLE = {
  display: "flex",
  paddingBottom: "10px",
  justifyContent: "flex-start",
};
const ONECOLEE = {
  display: "flex",
  paddingBottom: "10px",
};
const SELECT = {
  backgroundColor: "#C1D0FC",
  padding: "5px",
  opacity: 0.5,
  borderRadius: "5px",
  marginRight: "20px",
};
const DRAGDROP = {
  marginTop: "10px",
  marginBottom: "10px",
  width: "100%",
};
const SUBMIT = {
  width: "10%",
  backgroundColor: "#C1D0FC",
  color: "#333",
  padding: "10px 6px",
  margin: "8px 10",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "20px",
  marginTop: "30px",
};
const BTUNNES = {
  display: "flex",
  justifyContent: "end",
};
const TEXTAREA = {
  width: "100%",
  height: "150px",
  padding: "12px 20px",
  boxSizing: "border-box",
  border: "1px solid #C1D0FC",
  borderRadius: "4px",
  backgroundColor: "#F6F8FF",
  fontSize: "16px",
  resize: "none",
  marginBottom: "10px",
};
const CreateProject = ({ open, onClose, user, show }) => {
  const dispatch = useDispatch();
  const CreatedById = user.user && user.user.userId;
  const getImage = (imagePath) => {
    return createImagePath(imagePath);
  };
  const [AssignedTo, setAssignedTo] = useState("");
  const [ProjectName, setProjectName] = useState("");
  const [Description, setDescription] = useState("");
  const [AssignedDate, setAssignedDate] = useState("");
  const [DueDate, setDueDate] = useState("");
  const [ProjectStatus, setProjectStatus] = useState("");
  const [members, setMembers] = useState([]);
  const [teamm, setTeamm] = useState();
  const [ProjectEmployees, setProjectEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const handleOptionChange = (event) => {
    const option = event.target.value;
    setAssignedTo(option);
    if (option === "Team") {
      setTeams(teamm);
    } else if (option === "Employee") {
      setEmployees(members);
    }
  };
  const fetchData = async () => {
    try {
      const EmployeeData = await getProjectEmployee();
      setMembers(EmployeeData);
      const projectData = await getProjectTeam();
      setTeamm(projectData);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const AddMembers = (option) => {
    return (
      <div
        className="flex align-items-center "
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          alt={option.name}
          src={getImage(option.imagePath)}
          style={{ width: "30px", marginRight: "20px", borderRadius: "50%" }}
        />
        <div>{option.name}</div>
      </div>
    );
  };
  const AddTeam = (option) => {
    return (
      <div
        className="flex align-items-center "
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>{option.name}</div>
      </div>
    );
  };
  const panelFooterTemplate = () => {
    const length = ProjectEmployees ? ProjectEmployees.length : 0;

    return (
      <div className="py-2 px-3">
        <b>{length}</b> Employee{length > 1 ? "s" : ""} selected.
      </div>
    );
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const selectedMembersIds = [];
    if (selectedEmployee) {
      selectedEmployee.forEach((obj) => {
        selectedMembersIds.push(obj.id);
      });
      console.log("selectedEmployeeID", selectedMembersIds);
    }
    if (selectedTeam) {
      var selectedProjectsId = "";
      selectedProjectsId = selectedTeam.id;
    }

    var projectPost = {
      projectName: ProjectName,
      description: Description,
      assignedDate: AssignedDate,
      dueDate: DueDate,
      projectStatus: ProjectStatus,
      assignedTo: AssignedTo,
      createdById: CreatedById,
      teamId: selectedProjectsId,
      projectEmployees: selectedMembersIds,
      taskLists: [],
    };
    console.log("formData", projectPost);
    try {
      const response = await createProject(projectPost);
      console.log(response);
      if (response.success) {
        show("success", "SUCCESS", response.message);
        onClose(false);
        dispatch(setLoading(false));
      } else {
        show("error", "ERROR", response.message);
        dispatch(setLoading(false));
      }
    } catch (error) {
      show("error", "ERROR", error);
      dispatch(setLoading(false));
    }
  };

  if (!open) return null;
  return (
    <>
      <div style={OVERLAY}></div>

      <div style={MODAL_STAYL}>
        <div style={TOPER}>
          <div style={COLU}>
            <h1 style={HTITLE}>Add New Project</h1>
            <div style={LINE}></div>
          </div>
          <button style={CLOSEBUTTON} onClick={onClose}>
            <img src="./img/close-3.png" />
          </button>
        </div>
        <form action="" onSubmit={handleCreate}>
          <div style={FORMWRAPP}>
            <div style={INPUTWRAP}>
              <label htmlFor="" style={LABEL}>
                Title:
              </label>
              <input
                style={INPUTT}
                type="text"
                value={ProjectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div style={INPUTWRAP}>
              <label htmlFor="" style={LABEL}>
                Description:
              </label>
              <textarea
                style={TEXTAREA}
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div style={ONECOLEE}>
              <div style={INPUTWRAPS}>
                <label htmlFor="" style={LABEL}>
                  Assigned Date:
                </label>
                <input
                  style={INPUT}
                  type="date"
                  id="AssignedDate"
                  name="AssignedDate"
                  value={AssignedDate}
                  onChange={(e) => setAssignedDate(e.target.value)}
                ></input>
              </div>
              <div style={INPUTWRAPS}>
                <label htmlFor="" style={LABEL}>
                  Due Date:
                </label>
                <input
                  style={INPUT}
                  type="date"
                  id="DueDate"
                  name="DueDate"
                  value={DueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                ></input>
              </div>
            </div>
            <div style={ONECOLEE}>
              <div style={INPUTWRAPS}>
                <label htmlFor="" style={LABEL}>
                  Assigned To:
                </label>
                <select
                  value={AssignedTo}
                  style={SELECT}
                  onChange={handleOptionChange}
                >
                  <option value="">Select an option</option>
                  <option value="TEAM">Team</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
              </div>
              {AssignedTo === "EMPLOYEE" && (
                <div className="card flex justify-content-center">
                  <MultiSelect
                    value={selectedEmployee}
                    options={members}
                    onChange={(e) => setSelectedEmployee(e.value)}
                    optionLabel="name"
                    placeholder="Select Employee"
                    itemTemplate={AddMembers}
                    panelFooterTemplate={panelFooterTemplate}
                    className="w-full md:w-20rem"
                    display="chip"
                  />
                </div>
              )}
              {AssignedTo === "TEAM" && (
                <div className="card flex justify-content-center">
                  <Dropdown
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.value)}
                    options={teamm}
                    optionLabel="name"
                    placeholder="Select a Team"
                    itemTemplate={AddTeam}
                    className="w-full md:w-14rem"
                  />
                </div>
              )}
            </div>
            <div style={INPUTWRAPS}>
              <label htmlFor="" style={LABEL}>
                Status:
              </label>
              <select
                style={SELECT}
                id="status"
                name="status"
                value={ProjectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
              >
                <option value="PENDING">PENDING</option>
                <option value="ONGOING">ONGOING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELD">CANCELD</option>
              </select>
            </div>

            <div style={LINEE}></div>
            <div style={BTUNNES}>
              <input style={SUBMIT} type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
