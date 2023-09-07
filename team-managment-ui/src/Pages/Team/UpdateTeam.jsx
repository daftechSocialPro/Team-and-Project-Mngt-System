import React, { useState} from "react";
import { createImagePath } from "../../api/commonApi";
import { setLoading } from "../../store/loadingReducer";
import { useDispatch} from "react-redux";
import { updateTeam } from "../../api/teamApi";
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
  flexDirection:"column"
};
const BTUNNES = {
  display: "flex",
  justifyContent: "end",
};
const UpdateTeam = ({open, onClose,team, show}) => {
  const dispatch = useDispatch();
  const [TeamName, setTeamName] = useState(team && team.teamName);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
      var teamPut = {
        id:team.id,
        TeamName : TeamName,
      }
      console.log(teamPut)
    try {
      const response = await updateTeam(teamPut);
      if (response.success) {
        show("success", "SUCCESS", response.message);
        dispatch(setLoading(false));
        onClose(false);
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
            <h1 style={HTITLE}>Update Team</h1>
            <div style={LINE}></div>
          </div>
          <button style={CLOSEBUTTON} onClick={() => onClose(false)}>
            <span className="pi pi-times" style={{ fontSize: "25px" }} />
          </button>
        </div>
        <form action="" onSubmit={handleSubmit} >
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
        
        
            <div style={LINEE}></div>
            <div style={BTUNNES}>
              <input style={SUBMIT} type="submit" value="Submit" />
            </div>
          </div>
        </form>
        </div>
    </>
  )
}

export default UpdateTeam