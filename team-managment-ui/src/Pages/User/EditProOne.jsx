import React, {useState} from 'react'
import { MultiSelect } from 'primereact/multiselect';
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
    width: "300px",
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
  justifyContent:"space-between"
  
};
const SELECT = {
    backgroundColor: "#C1D0FC",
    padding: "5px",
    opacity: 0.5,
    borderRadius: "5px",
  };
const BTUNNES = {
  display: "flex",
  justifyContent: "end",
};
const EditProOne = ({open, onClose,}) => {
  if (!open) return null;
  return (
    <>
          <div style={OVERLAY}></div>

      <div style={MODAL_STAYL}>
        <div style={TOPER}>
          <div style={COLU}>
            <h1 style={HTITLE}>Update</h1>
            <div style={LINE}></div>
          </div>
          <button style={CLOSEBUTTON} onClick={() => onClose(false)}>
            <span className="pi pi-times" style={{ fontSize: "25px" }} />
          </button>
        </div>
        <form action="" >
          <div style={FORMWRAPP}>
            <div style={ONECOLE}>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Name:
                </label>
                <input
                  style={INPUT}
                  // value={FirstName}
                  // onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                />
              </div>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Email:
                </label>
                <input
                  style={INPUT}
                  // value={LastName}
                  // onChange={(e) => setLastName(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div style={ONECOLE}>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Phone:
                </label>
                <input
                  style={INPUT}
                  // value={FirstName}
                  // onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                />
              </div>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Employee Position:
                </label>
                <select
                  style={SELECT}
                  id="Position"
                  name="Position"
                //   value={EmploymentPosition}
                //   onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="DEPUTY_MANAGER">DEPUTY_MANAGER</option>
                  <option value="HRM">HRM</option>
                  <option value="FINANCE">FINANCE</option>
                  <option value="MARKETING">MARKETING</option>
                  <option value="DEVELOPER">DEVELOPER</option>
                </select>
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

export default EditProOne