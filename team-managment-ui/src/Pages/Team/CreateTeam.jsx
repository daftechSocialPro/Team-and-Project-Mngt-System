import React, { useState, useEffect, useRef } from "react";
import { MultiSelect } from "primereact/multiselect";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loadingReducer";
import { createTeam, getSelectedEmployee, getProject } from "../../api/teamApi";
import { createImagePath } from "../../api/commonApi";
const MODAL_STAYL = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "900px",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#fff",
  zIndex: 1000,
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
  padding: "10px",
  color: "black",
  fontSize: "25px",
  cursor: "Pointer",
  border: "1px solid f4f4f4",
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
  alignItems: "center",
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
  fontSize: "15px",
  paddingRight: "15px",
  fontWeight: 400,
  marginLeft: "10px",
  color: "#000",
  opacity: 0.9,
};

const INPUT = {
  width: "80%",
  height: "35px",
  backgroundColor: "#C1D0FC",
  opacity: 0.3,
  color: "#000",
  padding: "3px 10px",
  margin: "8px 0",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
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
const FORMWRAPP = {
  display: "flex",
  flexDirection: "column",
  padding: "30px",
};
const ONECOLE = {
  display: "flex",
  paddingBottom: "10px",
  flexDirection: "column",
};
const BTUNNES = {
  display: "flex",
  justifyContent: "end",
};
const CreateTeam = ({ open, onClose, show, user }) => {
  const [TeamMembers, setTeammembers] = useState([]);
  const [TeamProject, setTeamProject] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState();
  const [TeamName, setTeamName] = useState("");
  const selectRef = useRef(null);
  const CreatedById = user.user && user.user.userId;
  const dispatch = useDispatch();
  const getImage = (imagePath) => {
    return createImagePath(imagePath);
  };
  const fetchData = async () => {
    try {
      const memberData = await getSelectedEmployee();
      setMembers(memberData);
      const projectData = await getProject();
      setProjects(projectData);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleMemberSelect = (event) => {
    console.log(event);
    setSelectedMembers(event.value);
  };
  const handleProjectSelect = (event) => {
    setSelectedProjects(event.value);
  };
  const AddMembers = (option) => {
    return (
      <div className="flex align-items-center" style={{ display: "flex" }}>
        <img
          src={getImage(option.imagePath)}
          className="mr-2"
          style={{ width: "30px", marginRight: "20px", borderRadius: "50%" }}
        />
        <div>{option.name}</div>
      </div>
    );
  };
  const AddProject = (option) => {
    console.log("list of projects", option);
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

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.addEventListener("change", handleMemberSelect);
    }

    return () => {
      if (selectRef.current) {
        selectRef.current.removeEventListener("change", handleMemberSelect);
      }
    };
  }, [selectRef]);
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.addEventListener("change", handleProjectSelect);
    }

    return () => {
      if (selectRef.current) {
        selectRef.current.removeEventListener("change", handleProjectSelect);
      }
    };
  }, [selectRef]);

  const panelFooterTemplate = () => {
    const length = TeamMembers ? TeamMembers.length : 0;

    return (
      <div className="py-2 px-3">
        <b>{length}</b> Employee{length > 1 ? "s" : ""} selected.
      </div>
    );
  };
  const panelProjectTemplate = () => {
    const length = TeamProject ? TeamProject.length : 0;

    return (
      <div className="py-2 px-3">
        <b>{length}</b> Projects{length > 1 ? "s" : ""} selected.
      </div>
    );
  };
  const handleCreate = async (e) => {
    e.preventDefault();

    // dispatch(setLoading(true));

    if (selectedMembers&& selectedProjects) {
      const selectedMembersIds = [];

      selectedMembers.forEach((obj) => {
        selectedMembersIds.push(obj.id);
      });

      console.log(selectedMembersIds)


      const selectedProjectsIds = [];

      selectedProjects.forEach((obj) => {
        selectedProjectsIds.push(obj.id);
      });


      var teamPost = {
        TeamName : TeamName,
        TeamProjects :selectedProjectsIds,
        TeamEmployees :selectedMembersIds,
        CreatedById: CreatedById
      }

      console.log("teampost", teamPost)

      // const formData = new FormData()

      // formData.append("TeamName",TeamName)
      // formData.append("TeamProjects",selectedProjectsIds)
      // formData.append("TeamEmployees",selectedMembersIds)
      // formData.append("CreatedById",CreatedById)

    
    try {
      const response = await createTeam(teamPost);
      console.log(response)
      if (response.success) {
        show("success", "SUCCESS", response.message);
        onClose(false);
        dispatch(setLoading(false));
      } else {
        show("error", "ERROR", response.message);
        dispatch(setLoading(false));
      }
    } catch (error) {
      // Handle the error
      show("error", "ERROR", error);
      dispatch(setLoading(false));
    }
  }
  };
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY}></div>

      <div style={MODAL_STAYL}>
        <div style={TOPER}>
          <div style={COLU}>
            <h1 style={HTITLE}>Add New Team</h1>
            <div style={LINE}></div>
          </div>
          <button style={CLOSEBUTTON} onClick={() => onClose(false)}>
            <span className="pi pi-times" style={{ fontSize: "25px" }} />
          </button>
        </div>
        <form action="" onSubmit={handleCreate}>
          <div style={FORMWRAPP}>
            <div style={ONECOLE}>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Team Name:
                </label>
                <input
                  style={INPUT}
                  value={TeamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Select Team Member:
                </label>
                <div className="card flex justify-content-center">
                  <MultiSelect
                    value={selectedMembers}
                    options={members}
                    onChange={handleMemberSelect}
                    optionLabel="name"
                    placeholder="Select Team Member"
                    itemTemplate={AddMembers}
                    panelFooterTemplate={panelFooterTemplate}
                    className="w-full md:w-20rem"
                    display="chip"
                  />
                </div>
              </div>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Select Project to Assign:
                </label>
                <div className="card flex justify-content-center">
                  <MultiSelect
                    value={selectedProjects}
                    options={projects}
                    onChange={handleProjectSelect}
                    optionLabel="name"
                    placeholder=" Select Project"
                    itemTemplate={AddProject}
                    panelFooterTemplate={panelProjectTemplate}
                    className="w-full md:w-20rem"
                    display="chip"
                  />
                </div>
              </div>
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

export default CreateTeam;
