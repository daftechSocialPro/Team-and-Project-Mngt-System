import React from 'react'
import ReactDOM from 'react-dom';

const portal = ReactDOM.createRoot(document.getElementById('portal'));
const MODAL_STAYL={
    position:'fixed',
    top: "50%",
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:"#fff",
    padding:"50px",
    zIndex:1000
}
const OVERLAY={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.6)',
    zIndex:1000
}
const CreateEmployee = ({open, children, onClose}) => {
    if(!open) return null
  portal.render (
    <>
    <div style={OVERLAY} ></div>
       <div style={MODAL_STAYL}>CreateEmployee, {children}
       <button onClick={onClose}>close</button>
       </div>
     
    </>
 
  )
}

export default CreateEmployee