import { useState } from "react";
import { useEffect } from "react";
let nameValue="";
let emailValue="";
let roleValue="";
let emergNameValue="";
let emergNumValue="";
function Form(){
    let employeeInfo={"name":"", "email":"", "role":"", "emergencyContactName":"", "emergencyContactNumber":""};
    let [namevalidity, setNameValidity]=useState(true);
    let [emailvalidity, setEmailValidity]=useState(true);
    let [rolevalidity, setRoleValidity]=useState(true);
    let [emergNamevalidity, setEmergNameValidity]=useState(true);
    let [emergNumvalidity, setEmergNumValidity]=useState(true);
    let patternList=[/\D\s\D/, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, /\w/,/\D\s\D/,/\d/];
    let nameStore=(event)=>{
        nameValue=event.target.value;
    }
    
    let emailStore=(event)=>{
        emailValue=event.target.value;
    }
    let roleStore=(event)=>{
        roleValue=event.target.value;
    }
    let emergNameStore=(event)=>{
        emergNameValue=event.target.value;
    }
    let emergNumKey=(event)=>{
        if((isNaN(event.key)||emergNumValue.length==11||event.keyCode==32)&&!((event.key==="Backspace")||(event.key==="Delete")||(event.keyCode==37||event.keyCode==39))){
            event.preventDefault();
        }
    }
    let emergNumStore=(event)=>{
        emergNumValue=event.target.value.toString();
    }
    let check=(value, pattern)=>{
        let validity=patternList[pattern].test(value);
        switch (pattern){
            case 0:
                setNameValidity(validity);
            break;
            case 1:
                setEmailValidity(validity);
            break;
            case 2:
                if(validity&&roleValue.length>2){
                    setRoleValidity(validity);
                }
                else{
                    setRoleValidity(false);
                }
            break;
            case 3:
                setEmergNameValidity(validity);
            break;
            case 4:
                if(validity&&emergNumValue.length>=10){
                    setEmergNumValidity(validity);
                }
                else{
                    setEmergNumValidity(false);
                }
            break;
        }
    }
    const showErrormessage=()=>{
        alert("There seems to be a problem with the information. Please check the information fields.");
    }
    const finalCheck=()=>{
        let notBlank = (value)=>value!="";
        if((namevalidity&&emailvalidity&&rolevalidity&&emergNamevalidity&&emergNumvalidity)){
            if ([...nameValue, emailValue, roleValue, emergNameValue, emergNumValue].every(notBlank)){
                alert("Successfully Submitted Information");
            }
            else{
                showErrormessage();
            }
        }
        else{
            showErrormessage();
        }
    }
    return(
        <>
            <h1>Employee Personal Information</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Name" id="name" required onChange={(event)=>{nameStore(event)}} onBlur={()=>{check(nameValue, 0)}}></input>
                {namevalidity? "":<p style={{color:"red"}}>Name is Invalid</p>}
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="address@gmail.com" id="email" required onChange={(event)=>{emailStore(event)}} onBlur={()=>{check(emailValue, 1)}}></input>
                {emailvalidity? "":<p style={{color:"red"}}>Email is Invalid</p>}
                <label htmlFor="role">Role</label>
                <input type="text" placeholder="Role" id="role" required onChange={(event)=>{roleStore(event)}} onBlur={()=>{check(roleValue, 2)}}></input>
                {rolevalidity? "":<p style={{color:"red"}}>Role is Invalid</p>}
                <label htmlFor="emergencyName">Emergency Contact Name</label>
                <input type="text" placeholder="John Doe" id="emergencyName" required onChange={(event)=>{emergNameStore(event)}} onBlur={()=>{check(emergNameValue, 3)}}></input>
                {emergNamevalidity? "":<p style={{color:"red"}}>Emergency Contact Name is Invalid</p>}
                <label htmlFor="emergencyNumber">Emergency Contact Number</label>
                <input type="number" placeholder="Name" id="emergencyNumber" required onKeyDown={(event)=>{emergNumKey(event)}} onChange={(event)=>{emergNumStore(event)}} onBlur={()=>{check(emergNumValue, 4)}}></input>
                {emergNumvalidity? "":<p style={{color:"red"}}>Emergency Contact Number is Invalid</p>}
                <button type="button" className="SubmitButton" onClick={()=>{finalCheck()}}>Submit</button>
            </form>
        </>
    );
}
export default Form;