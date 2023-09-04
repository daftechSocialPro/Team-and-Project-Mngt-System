import React, { useEffect, useState } from "react";
import { getEmployeeNoUser } from "../api/employeeAPi";
import {getUserRoles,createUser} from '../api/authApi'
import { useDispatch } from "react-redux";
import { setLoading } from '../store/loadingReducer'
const MODAL_STAYL = {
    position: 'fixed',
    top: "50%",
    left: '50%',
    // display:"flex",
    // alignItems: "center",
    // justifyContent: "center",
    width: "900px",
    transform: 'translate(-50%,-50%)',
    backgroundColor: "#fff",
    // paddingLeft:"50px",
    zIndex: 1000
}
const OVERLAY = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.8)',
    zIndex: 1000
}
const CLOSEBUTTON = {
    width: "50px",
    height: "50px",
    paddingRight: "20px"
}
const LINE = {
    width: "160px",
    height: "4px",
    backgroundColor: "#CCD8FD",
    marginLeft: "30px"
}
const LINEE = {
    width: "100%",
    height: "4px",
    backgroundColor: "#CCD8FD",
    marginTop: "5px"

}
const TOPER = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    top: 0
}
const INPUTWRAP = {
    display: "flex",
    flexDirection: "column",
    marginBottom:'20px'
    
}
const INPUTWRAPP = {

}
const HTITLE = {
    color: "#000",
    opacity: 0.8,
    fontSize: "24px",
    paddingLeft: "20px",
    fontWeight: 500
}
const COLU = {
    display: "flex",
    flexDirection: "column"
}

const LABEL = {
    color: "#000",
    fontSize: "15px",
    paddingRight: "15px",
    fontWeight: 400,
    marginLeft: "10px",
    color: "#000",
    opacity: 0.9,
}

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
    cursor: "pointer"
}

const FORMWRAPP = {
    display: "flex",
    flexDirection: "column",
    padding: "30px"
}
const ONECOLE = {
    display: "flex",
    paddingBottom: "10px",
    justifyContent: "space-between",
}
const SELECT = {
    backgroundColor: "#C1D0FC",
    padding: "5px",
    opacity: 0.5,
    borderRadius: "5px",
    width: "300px",
    marginLeft: "10px",
    height:'40px'
}


const SUBMIT = {
    width: "10%",
    backgroundColor: "#C1D0FC",
    color: "#000",
    padding: "10px 6px",
    margin: "8px 10",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "20px",
    marginTop: "30px",
}

const BTUNNES = {
    display: "flex",
    justifyContent: "end"
}
const ERROR_MESSAGE = {
    color: 'red',
    fontSize: '14px',
    marginTop: '8px',
  };
const CreateUser = ({ open, onClose,show }) => {

    const dispatch = useDispatch()
    const [employees, setEmployees] = useState([{}])
    const [userRoles, setUserRoles ] = useState([{}])
    const [employeeId,setEmployeeId]= useState('')
    const [userName,setUserName]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [roles , setRoles] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getEmployees()    
    }, [open])



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        dispatch(setLoading(true));
    
        // Check if the password and confirm password match
        if (password !== confirmPassword) {
          setErrorMessage("Password and confirm password do not match");
          dispatch(setLoading(false));
          return;
        }
        if (!roles) {
            setErrorMessage("Role is not selected");
            dispatch(setLoading(false));
            return;
          }
          if (!employeeId) {
            setErrorMessage("Employee is not selected");
            dispatch(setLoading(false));
            return;
          }
    
        const value ={
            employeeId:employeeId,
            userName:userName,
            password:password,
            roles :roles,
        }
        try {
            // Make the Axios request
            const response = await createUser(value);
        
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

        // Rest of the submit logic here, such as creating the user
    
        // Reset form fields and error message
        setEmployeeId('');
        setUserName('');
        setPassword('');
        setConfirmPassword('');
        setRoles([]);
        setErrorMessage('');
    
        // Close the modal
        onClose();
      };
  
    const getEmployees = async () => {

        const response = await getEmployeeNoUser();
        const response1 = await getUserRoles();
        setEmployees(response.data)
        setUserRoles(response1)
    }
    if (!open) return null

    return (
        <>
            <div style={OVERLAY}></div>
            <div style={MODAL_STAYL}>
                <div style={TOPER}>
                    <div style={COLU}><h1 style={HTITLE}>Add New User </h1>
                        <div style={LINE}></div></div>
                    <button style={CLOSEBUTTON} onClick={onClose}><img src='./img/close-3.png' /></button>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div style={FORMWRAPP}>
                        <div style={ONECOLE}>
                            <div style={INPUTWRAP}>
                                <div style={INPUTWRAP}>
                                    <label htmlFor="" style={LABEL}>Employee:</label>
                                    <select style={SELECT} id="Employee" name="Employee" value={employeeId} onChange={(e)=>{setEmployeeId(e.target.value)}} >
                                    <option >--Select User---</option>
                                        {employees &&
                                         employees.map((item) =>
                                         <option key={item.id} value={item.id}>{item.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div style={INPUTWRAP}>
                                    <label htmlFor="" style={LABEL}>User Roles:</label>
                                    <select style={SELECT} id="role" name="role" value={roles} onChange={(e)=>{setRoles(e.target.value)}} >
                                    <option >--Select a role---</option>
                                        {userRoles &&
                                         userRoles.map((item) =>
                                         <option key={item.id} value={item.name}>{item.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>

                            <div >
                                <div style={INPUTWRAPP}>
                                    <label htmlFor="" style={LABEL}>User Name:</label>
                                    <input style={INPUT} type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}}  />
                                </div>
                                <div style={INPUTWRAPP}>
                                    <label htmlFor="" style={LABEL}>Password:</label>
                                    <input style={INPUT} type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
                                </div>
                                <div style={INPUTWRAPP}>
                                    <label htmlFor="" style={LABEL}>Confirm Password:</label>
                                    <input style={INPUT} type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                                </div>
                            </div>
                        </div>
                        <div style={LINEE}></div>
                        {errorMessage && <p style={ERROR_MESSAGE}>{errorMessage}</p>}
                        <div style={BTUNNES}>
                            <input style={SUBMIT} type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        </>

    )
}

export default CreateUser