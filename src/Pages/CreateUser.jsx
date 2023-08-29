import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];
const MODAL_STAYL={
    position:'fixed',
    top: "50%",
    left:'50%',
    // display:"flex",
    // alignItems: "center",
    // justifyContent: "center",
    width:"900px",
    transform:'translate(-50%,-50%)',
    backgroundColor:"#fff",
    // paddingLeft:"50px",
    zIndex:1000
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
    // marginLeft: "120px",
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
    alignItems: "center",
    justifyContent: "space-between", 
}
const INPUTWRAPS={
    display: "flex",
    alignItems: "center",
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
    fontSize: "15px",
    paddingRight: "15px",
    fontWeight: 400,
      marginLeft:"10px",
      color: "#000",
      opacity: 0.9,
}

const INPUT={
    width: "300px",
    height:"35px",
    backgroundColor: "#C1D0FC",
    opacity:0.3,
    color: "#000",
    padding: "3px 10px",
    margin: "8px 0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
}
const INPUTT={
    width: "350px",
    height:"35px",
    backgroundColor: "#C1D0FC",
    opacity:0.3,
    color: "#000",
    padding: "1px 1px",
    margin: "8px 0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft:"30px"
}
const FORMWRAPP={
    display: "flex",
    flexDirection: "column",
    padding:"30px"
}
const ONECOLE={
    display: "flex", 
    paddingBottom:"10px",
    justifyContent: "space-between", 
}
const SELECT={
    backgroundColor: "#C1D0FC",
    padding:"5px",
    opacity:0.5,
    borderRadius:"5px"
}
const DRAGDROP={
    marginLeft:"10px",
    width:"70%"
}
const SOCIALIMAGE={
    width:"30px",
    height:"30px",
    marginLeft:"10px",   
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
const CANCEL={
    width: "10%",
    backgroundColor:"#333",
    color:  "#FF5722",
    padding: "10px 15px",
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
const CreateUser = ({open, onClose}) => {
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
            <div style={COLU}><h1 style={HTITLE}>Add New </h1>
        <div style={LINE}></div></div>
       <button style={CLOSEBUTTON}  onClick={onClose}><img src='./img/close-3.png'/></button>
        </div>
        {/* <form action="">
            <div style={FORMWRAPP}>
                <div style={ONECOLE}>
                <div style={INPUTWRAP}>
            <label htmlFor="" style={LABEL}>Employee:</label>
            <input style={INPUT} type="text" />
            </div>
            <div style={INPUTWRAP}>
            <label htmlFor="" style={LABEL}>Last Name:</label>
            <input style={INPUT} type="text" />
            </div>
                </div>
                <div style={ONECOLE}>
                <div style={DRAGDROP}>
                <FileUploader  handleChange={handleChange} name="file" types={fileTypes} />
                </div>
                <div style={INPUTWRAP}>
            <label htmlFor="" style={LABEL}>Gender:</label>
            <select style={SELECT}  id="gender" name="Gender">
      <option value="male">Male</option>
      <option value="female">Female</option>
     
    </select>
            </div>
                </div>
              
                <div style={ONECOLE}>
                <div style={INPUTWRAP}>
            <label htmlFor="" style={LABEL}>Birth Day:</label>
            <input style={INPUT} type="date" id="birthday" name="birthday"></input>
            </div>
            <div style={INPUTWRAP}>
            <label htmlFor="" style={LABEL}>Phone:</label>
            <input style={INPUT} type="text" />
            </div>
                </div>
             
                <div style={LINEE}></div>
           <div style={BTUNNES}>
           <input style={SUBMIT} type="submit" value="Submit"/>
          
           </div>
                
            </div>
           
          
        </form> */}

       </div>
     
    </>
 
  )
}

export default CreateUser