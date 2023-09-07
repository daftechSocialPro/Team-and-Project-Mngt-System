import React, { useState, useEffect } from "react";
import { PickList } from "primereact/picklist";
import {
  getEmployeeNotInTeam,
  getTeamMembersSelectList,
  addTeamMember,
  removeTeamMember,
} from "../../api/teamApi";
import { createImagePath } from "../../api/commonApi";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loadingReducer";
const MODAL_STAYL = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "900px",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#fff",
  zIndex: 1000,
  padding: "0px 20px",
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
  marginBottom: "10px",
};
const LINE = {
  width: "160px",
  height: "4px",
  backgroundColor: "#CCD8FD",
  marginLeft: "30px",
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
  flexDirection: "column",
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
const AddMember = ({ open, onClose, teamId, user, show }) => {
  const dispatch = useDispatch();
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState(null);

  const CreatedById = user.user && user.user.userId;
  const getImage = (imagePath) => {
    return createImagePath(imagePath);
  };
  const fetchData = async () => {
    try {
      const employees = await getEmployeeNotInTeam(teamId);
      const teamMembers = await getTeamMembersSelectList(teamId);
      setSource(employees || []);
      setTarget(teamMembers || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, teamId]);

  const onChange = (event) => {
    setSource(event.source);
    setTarget(event.target);
  };
  const handleMoveRight = async (event) => {
    setSelectedEmployees(event.value);
    if (selectedEmployees) {
      const selectedEmployyeIds = [];

      selectedEmployees.forEach((obj) => {
        selectedEmployyeIds.push(obj.id);
      });
  
      dispatch(setLoading(true));
      var teamMember = {
        teamId: teamId,
        employeeList: selectedEmployyeIds,
        createdBy: CreatedById,
      };
      const response = await addTeamMember(teamMember);

      if (response.success) {
        show("success", "SUCCESS", response.message);

        dispatch(setLoading(false));
      } else {
        show("error", "ERROR", response.message);
        dispatch(setLoading(false));
      }
    }
  };

  const handleMoveLeft = async(event) => {
    setSelectedMembers(event.value);
    console.log("selectedMember", selectedMembers)
    if (selectedMembers) {
      const selectedMembersIds = selectedMembers.map((obj) => {
        return obj.id;
      });

    dispatch(setLoading(true));
    var employeess = {
      teamId: teamId,
      employeeList: selectedMembersIds,
    };
    console.log(selectedMembersIds)
    const response = await removeTeamMember(employeess);

    if (response.success) {
      show("success", "SUCCESS", response.message);

      dispatch(setLoading(false));
    } else {
      show("error", "ERROR", response.message);
      dispatch(setLoading(false));
    }
  }
  }
  const itemTemplate = (item) => {
    return (
      <div
        className="flex flex-wrap p-2 align-items-center gap-3"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          className="w-4rem h-4rem shadow-2 flex-shrink-0 border-round rounded-full"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            marginRight: "5px",
          }}
          src={getImage(item.imagePath)}
        />
        <div className="flex-1 flex gap-2">
          <span className="font-bold">{item.name}</span>
        </div>
      </div>
    );
  };
  if (!open) return null;

  return (
    <>
      {open && (
        <>
          <div style={OVERLAY}></div>
          <div style={MODAL_STAYL}>
            <div style={TOPER}>
              <div style={COLU}>
                <h1 style={HTITLE}>Manage Members</h1>
                <div style={LINE}></div>
              </div>
              <button style={CLOSEBUTTON} onClick={() => onClose(false)}>
                <span className="pi pi-times" style={{ fontSize: "25px" }} />
              </button>
            </div>
            <div className="card">
              <PickList
                source={source}
                target={target}
                sourceFilterValue=""
                onChange={onChange}
                itemTemplate={itemTemplate}
                filter
                filterBy="name"
                responsive="true"
                sourceHeader="Employees"
                targetHeader="Team Members"
                sourceStyle={{ height: "30rem" }}
                targetStyle={{ height: "30rem" }}
                sourceFilterPlaceholder="Search by name"
                targetFilterPlaceholder="Search by name"
                showSourceControls={false}
                showTargetControls={false}

               
                
                className="custom-picklist"
                sourceSelection={selectedEmployees}
                targetSelection={selectedMembers}
                onMoveToTarget={handleMoveRight}
                onMoveToSource={handleMoveLeft}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddMember;
