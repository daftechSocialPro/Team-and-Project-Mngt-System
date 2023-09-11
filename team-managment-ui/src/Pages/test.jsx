import React, {useState} from 'react'
import { MultiSelect } from 'primereact/multiselect';
const MODAL_STAYL = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "400px",
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
  flexDirection:"column"
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
const SUBMIT = {
  width: "20%",
  backgroundColor: "#C1D0FC",
  color: "#333",
  padding: "10px 6px",
  margin: "8px 10",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
//   marginLeft: "20px",
  marginTop: "30px",
};
const FORMWRAPP = {
  display: "flex",
  flexDirection: "column",
  padding: "30px",
};
const BTUNNES = {
  display: "flex",
  justifyContent: "end",
};
const AddMember = ({open, onClose,}) => {
  const [teammembers, setTeammembers] = useState(null);
  const members = [
      { name: 'Ekram kumdin'},
      { name: 'kirubel gizaw'},
      { name: 'yonas tatek'},
      { name: 'habteyes asfaw'},
  ];
  const AddMembers = (option) => {
    return (
        <div className="flex align-items-center " style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
            <img alt={option.name} src="./img/propic/kira.png"  style={{ width: '30px', marginRight:"20px",borderRadius:"50%" }} />
            <div>{option.name}</div>
        </div>
    );
};
const panelFooterTemplate = () => {
  const length = teammembers ? teammembers.length : 0;

  return (
      <div className="py-2 px-3">
          <b>{length}</b> Employee{length > 1 ? 's' : ''} selected.
      </div>
  );
};
  if (!open) return null;
  return (
    <>
          <div style={OVERLAY}></div>

      <div style={MODAL_STAYL}>
        <div style={TOPER}>
          <div style={COLU}>
            <h1 style={HTITLE}>Add New Member</h1>
            <div style={LINE}></div>
          </div>
          <button style={CLOSEBUTTON} onClick={() => onClose(false)}>
            <span className="pi pi-times" style={{ fontSize: "25px" }} />
          </button>
        </div>
        <form action="" >
          <div style={FORMWRAPP}>
            <div style={INPUTWRAP}>
              <label htmlFor="" style={LABEL}>
                  Select Team Member:
                </label>
                    <div className="card flex justify-content-center">
            <MultiSelect value={teammembers} options={members} onChange={(e) => setTeammembers(e.value)} optionLabel="name" 
                placeholder="Select Team Member" itemTemplate={AddMembers} panelFooterTemplate={panelFooterTemplate} className="w-full md:w-20rem" display="chip" />
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

export default AddMember