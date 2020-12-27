import AppBar from "../../components/AppBar/AppBar";
import Edit from "../../components/UI/editpage/EditPage";
import {FindUser} from "../../services/auth-service";
import { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";






const EditView=()=>{
    useEffect(()=>{
        getUserParId()
    })
    const [userinfo,SetUserInfo]=useState({
        nom:"",
        prenom:"",
        email:"",
        Telephone:""
    });
    const getUserParId=async()=>{
        const UserId= localStorage.getItem("userId") ;
        const User=await FindUser(UserId);
        if(User){
        SetUserInfo({
            nom:User.nom,
        prenom:User.prenom,
        email:User.email,
        Telephone:User.tel
        })
    }

     }
    return (
    <div>
        
    <AppBar/>
    {/*<Edit Nom={userinfo.nom} Prenom={userinfo.prenom} Email={userinfo.email} Telephone={userinfo.Telephone} update={<TextField/>}/>*/}
    <Edit Type={"Nom"} Value={userinfo.nom} update={<TextField  id="Nom" 
          label={userinfo.nom}
          />}/>
    <Edit Type={"Prenom"} Value={userinfo.prenom} update={<TextField
    id="Prenom" 
    label={userinfo.prenom}
    />}/>
    <Edit Type={"E-mail"} Value={userinfo.email} update={<TextField 
    id="Email" 
    label={userinfo.email}/>}/>
    <Edit Type={"Telephone"} Value={userinfo.Telephone} update={<TextField id="Telephone" 
          label={userinfo.Telephone} />}/>
    </div>
    )
};
export default EditView;