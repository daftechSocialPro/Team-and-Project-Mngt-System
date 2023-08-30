import React, { useState, useRef} from "react";
import { FileUploader } from "react-drag-drop-files";
import { createEmployee } from "../api/employeeAPi";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { createImagePath } from "../api/commonApi";
const fileTypes = ["JPG", "PNG", "GIF"];
const MODAL_STAYL = {
  position: "fixed",
  top: "50%",
  left: "50%",
  // display:"flex",
  // alignItems: "center",
  // justifyContent: "center",
  width: "900px",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#fff",
  // paddingLeft:"50px",
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
  width: "50px",
  height: "50px",
  paddingRight: "20px",
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
  // marginLeft: "120px",
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
  justifyContent: "space-between",
};
const INPUTWRAPS = {
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
const INPUTT = {
  width: "350px",
  height: "35px",
  backgroundColor: "#C1D0FC",
  opacity: 0.3,
  color: "#000",
  padding: "1px 1px",
  margin: "8px 0",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginLeft: "30px",
};
const FORMWRAPP = {
  display: "flex",
  flexDirection: "column",
  padding: "30px",
};
const ONECOLE = {
  display: "flex",
  paddingBottom: "10px",
  justifyContent: "space-between",
};
const SELECT = {
  backgroundColor: "#C1D0FC",
  padding: "5px",
  opacity: 0.5,
  borderRadius: "5px",
};
const DRAGDROP = {
  marginLeft: "10px",
  width: "70%",
  marginTop:"30px"
};
const SOCIALIMAGE = {
  width: "30px",
  height: "30px",
  marginLeft: "10px",
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
const UPImage = {
Width:"100px",
height:"100px",
borderRadius:"50%"
};

const BTUNNES = {
  display: "flex",
  justifyContent: "end",
};
const UpdateEmployee = ({ open, onClose ,employee }) => {


    const getImage = (imagePath) => {
  
        return createImagePath(imagePath);
      };
  
  const toast = useRef(null);

  const show = (severity, summary, message) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: message,
    });
  };

  const [ImagePath, setFile] = useState(employee && employee.imagePath);
  const [FirstName, setFirstName] = useState(employee && employee.firstName);
  const [LastName, setLastName] = useState(employee && employee.lastName);
  const [Gender, setGender] = useState(employee && employee.gender);
  const [BirthDate, setBirthday] = useState(employee && employee.birthDate);
  const [PhoneNumber, setPhone] = useState(employee && employee.phoneNumber);
  const [Email, setEmail] = useState(employee && employee.email);
  const [Address, setAddress] = useState(employee && employee.address);
  const [EmploymentDate, setHireDate] = useState(employee && employee.employmentDate);
  const [Telegram, setTelegram] = useState(employee && employee.telegram);
  const [Twitter, setTwitter] = useState(employee && employee.twitter);
  const [Facebook, setFacebook] = useState(employee && employee.facebook);
  const [Instagram, setInstagram] = useState(employee && employee.instagram);
  const [EmploymentPosition, setPosition] = useState(employee && employee.rmploymentPosition);
  const CreatedById = useSelector((state) => state.user);

  const handleChange = (file) => {
    console.log(file);
    setFile(file);
  };
  if (!open) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the form field values

    const formData = new FormData();
    formData.append("FirstName", FirstName);
    formData.append("LastName", LastName);
    formData.append("Gender", Gender);
    formData.append("PhoneNumber", PhoneNumber);
    formData.append("BirthDate", BirthDate);
    formData.append("Email", Email);
    formData.append("Address", Address);
    formData.append("EmploymentDate", EmploymentDate);
    formData.append("EmploymentPosition", EmploymentPosition);
    formData.append("Telegram", Telegram);
    formData.append("Twitter", Twitter);
    formData.append("Facebook", Facebook);
    formData.append("Instagram", Instagram);
    formData.append("ImagePath", ImagePath);
    formData.append("CreatedById", CreatedById);

    try {
      // Make the Axios request
      const response = await createEmployee(formData);

      if (response.success) {
        show("success", "SUCCESS", response.message);
       

        onClose(false);
      } else {
        show("error", "ERROR", response.message);
      }
    } catch (error) {
      // Handle the error
      show("error", "ERROR", error);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div style={OVERLAY}></div>

      <div style={MODAL_STAYL}>
        <div style={TOPER}>
          <div style={COLU}>
            <h1 style={HTITLE}>Update Employee</h1>
            <div style={LINE}></div>
          </div>
          <button style={CLOSEBUTTON} onClick={() => onClose(false)}>
            <img src="./img/close-3.png" />
          </button>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div style={FORMWRAPP}>
           
          
            
            <div style={ONECOLE}>
            <img style={UPImage} src={getImage(employee.imagePath)} alt="userpic" />
              <div style={DRAGDROP}>
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                />
              </div>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Gender:
                </label>
                <select
                  style={SELECT}
                  id="gender"
                  name="Gender"
                  value={Gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </select>
              </div>
            </div>
            <div style={ONECOLE}>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  First Name:
                </label>
                <input
                  style={INPUT}
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                />
              </div>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Last Name:
                </label>
                <input
                  style={INPUT}
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            
           
          
         
            

            <div style={ONECOLE}>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Birth Day:
                </label>
                <input
                  value={BirthDate}
                  onChange={(e) => setBirthday(e.target.value)}
                  style={INPUT}
                  type="date"
                  id="birthday"
                  name="birthday"
                ></input>
              </div>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Phone:
                </label>
                <input
                  style={INPUT}
                  value={PhoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div style={ONECOLE}>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Email:
                </label>
                <input
                  style={INPUT}
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Address:
                </label>
                <input
                  style={INPUT}
                  type="text"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div style={ONECOLE}>
              <div style={INPUTWRAP}>
                <label htmlFor="" style={LABEL}>
                  Hire Date:
                </label>
                <input
                  value={EmploymentDate}
                  onChange={(e) => setHireDate(e.target.value)}
                  style={INPUT}
                  type="date"
                  id="birthday"
                  name="birthday"
                ></input>
              </div>
              <div style={INPUTWRAP}>
              <label htmlFor="" style={LABEL}>
                  Employee Position:
                </label>
                <select
                  style={SELECT}
                  id="Position"
                  name="Position"
                  value={EmploymentPosition}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="DEPUTY_MANAGER">DEPUTY_MANAGER</option>
                  <option value="HRM">HRM</option>
                  <option value="FINANCE">FINANCE</option>
                  <option value="MARKETING">MARKETING</option>
                  <option value="DEVELOPER">DEVELOPER</option>
                </select>
              </div>
            </div>
            <div style={ONECOLE}>
              <div style={INPUTWRAPS}>
                <img style={SOCIALIMAGE} src="./img/telegram.png" alt="" />
                <input
                  style={INPUTT}
                  value={Telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  type="text"
                ></input>
              </div>
              <div style={INPUTWRAPS}>
                <img style={SOCIALIMAGE} src="./img/twitter.png" alt="" />
                <input
                  style={INPUTT}
                  value={Twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  type="text"
                ></input>
              </div>
            </div>
            <div style={ONECOLE}>
              <div style={INPUTWRAPS}>
                <img style={SOCIALIMAGE} src="./img/facebook.png" alt="" />
                <input
                  style={INPUTT}
                  value={Facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  type="text"
                ></input>
              </div>
              <div style={INPUTWRAPS}>
                <img style={SOCIALIMAGE} src="./img/instagram.png" alt="" />
                <input
                  style={INPUTT}
                  value={Instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  type="text"
                ></input>
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

export default UpdateEmployee;
