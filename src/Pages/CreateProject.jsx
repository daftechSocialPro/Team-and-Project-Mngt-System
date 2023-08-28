import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF","PDF"];
const MODAL_STAYL={
    position:'fixed',
    top: "50%",
    left:'50%',
    width:"900px",
    transform:'translate(-50%,-50%)',
    backgroundColor:"#fff",
    zIndex:1000,
    borderRadius:"5px"
}
const OVERLAY={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.8)',
    zIndex:1000
}
const CLOSEBUTTON={
   width:"50px",
   height:"50px",
   paddingRight:"20px"
}
const LINE={
    width: "160px",
    height: "4px",
    backgroundColor: "#CCD8FD",
    marginLeft: "30px"
}
const LINEE={
    width: "100%",
    height: "4px",
    backgroundColor: "#CCD8FD",
    marginTop:"5px"
}
const TOPER={
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    top: 0
}
const INPUTWRAP={
    display: "flex",
    flexDirection: "column",
}
const INPUTWRAPS={
    display: "flex",
   
}
const INPUTWRAPSS={
    display: "flex",
    alignItems: "center",
    marginLeft:"300px"
}
const HTITLE={
    color: "#000",
    opacity: 0.8,
    fontSize: "24px",
    paddingLeft: "20px",
    fontWeight: 500
}
const COLU={
    display: "flex",
    flexDirection: "column"
}

const LABEL={
    color: "#000",
    fontSize: "18px",
    paddingRight: "15px",
    fontWeight: 400,
      marginLeft:"10px",
      color: "#000",
      opacity: 0.9,  
      margin: "8px 0",
}
const INPUT={
    width: "250px",
    height:"38px",
    backgroundColor: "#C1D0FC",
    opacity:0.3,
    color: "#000",
    padding: "3px 10px",
    margin: "8px 0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer", 
    marginRight:"40px",
}
const INPUTT={
    width: "100%",
    height:"38px",
    backgroundColor: "#C1D0FC",
    opacity:0.3,
    color: "#000",
    padding: "3px 10px",
    margin: "8px 0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer", 
    marginRight:"40px",
}
const FORMWRAPP={
    padding:"30px"
}
const ONECOLE={
    display: "flex", 
    paddingBottom:"10px",
    justifyContent: "space-between", 
}
const ONECOLEE={
    display: "flex", 
    paddingBottom:"10px",
}
const SELECT={
    backgroundColor: "#C1D0FC",
    padding:"5px",
    opacity:0.5,
    borderRadius:"5px"
}
const DRAGDROP={
    marginTop:"10px",
    marginBottom:"10px",
    width:"100%"
}
const SUBMIT={
    width: "10%",
    backgroundColor: "#C1D0FC",
    color: "#333",
    padding: "10px 6px",
    margin: "8px 10",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft:"20px", 
    marginTop:"30px",  
}
const BTUNNES={
    display:"flex",
    justifyContent:"end"
}
const TEXTAREA={
    width: "100%",
    height: "150px",
    padding: "12px 20px",
    boxSizing: "border-box",
    border: "1px solid #C1D0FC",
    borderRadius: "4px",
    backgroundColor: "#F6F8FF",
    fontSize: "16px",
    resize: "none",
    marginBottom:"10px"
}
const CreateProject = ({open, onClose}) => {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };
    if(!open) return null
    
  return (
    <>
    <div style={OVERLAY} ></div>
    
       <div style={MODAL_STAYL}>
        <div style={TOPER}>
            <div style={COLU}><h1 style={HTITLE}>Add New Project</h1>
        <div style={LINE}></div></div>
       <button style={CLOSEBUTTON}  onClick={onClose}><img src='./img/close-3.png'/></button>
        </div>
        <form action="">
            <div style={FORMWRAPP}>
                
                <div style={INPUTWRAP}>
            <label htmlFor="" style={LABEL}>Title:</label>
            <input style={INPUTT} type="text" />
                </div>
                <div style={INPUTWRAP}>
            <label htmlFor="" style={LABEL}>Description:</label>
            <textarea style={TEXTAREA}></textarea>
                </div>
                <div style={DRAGDROP}>
                <FileUploader  handleChange={handleChange} name="file" types={fileTypes} />
                </div>
                <div style={ONECOLEE}>
                <div style={INPUTWRAPS}>
            <label htmlFor="" style={LABEL}>Assigned Date:</label>
            <input style={INPUT} type="date" id="birthday" name="birthday"></input>
         
            </div>
            <div style={INPUTWRAPS}>
            <label htmlFor="" style={LABEL}>Due Date:</label>
            <input style={INPUT} type="date" id="birthday" name="birthday"></input>
      
            </div>
                </div>
                <div style={ONECOLEE}>
                <div style={INPUTWRAPS}>
            <label htmlFor="" style={LABEL}>Assigned To:</label>
            <select style={SELECT}  id="gender" name="Gender">
      <option value="team">Team</option>
      <option value="employee">Employee</option> 
    </select>
            </div>
            <div style={INPUTWRAPSS}>
            <label htmlFor="" style={LABEL}>Status:</label>
            <select style={SELECT}  id="status" name="status">
      <option value="team">Pending</option>
      <option value="employee">Ongoing</option> 
      <option value="employee">Completed</option> 
    </select>
            </div>
                </div>
              
                <div style={LINEE}></div>
           <div style={BTUNNES}>
           <input style={SUBMIT} type="submit" value="Submit"/>
           {/* <input style={CANCEL} type="cancel" value="Cancel" onClick={onClose}/>1 */}
           </div>
                
            </div>
           
          
        </form>

       </div>
     
    </>
 
  )
}

export default CreateProject