import React, { useState,useEffect ,componentDidMount} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auth from "./Auth";
import "./Auth.css";
import { signupHandler } from "../../services/auth-service";
//import {signUpSchema} from "../../pages/util/schema"
//import validate from "validate.js";
const Signup=()=> {
  const [isLoading, setisLoading] = useState(false);
  const [formState,setFormState] = useState({
    values:{
      nom:"",
      prenom:"",
      email:"",
      password:"",
      tel:"",
    },
    isValid:false,
    error: {},
    touched: {},
    isAuth: false,
  })


/*useEffect(() => {
  const errors=validate(formState.values,signUpSchema);
  setFormState((formState)=>({
    ...formState,
    isValid:errors?false:true,
    error:errors || {}
  }))
}, [formState.values])*/
  /*state = {
    signupForm: {
      nom: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      prenom: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      tel: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      formIsValid: false,
    },
    loading: false,
  };*/

  const inputChangeHandler = (e) => {
    e.persist();
    setFormState((formState)=>({
      ...formState,
      values:{
        ...formState.values,
        [e.target.name]:[e.target.value]
      },
      touched: {
        ...formState.touched,
        [e.target.name]: true,
      },
    }))

  };

 /* inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true,
          },
        },
      };
    });
  };*/
  const onSignupHandler = async (e) => {
    e.preventDefault();
    setisLoading(true)

    const { nom, prenom, tel, email, password } = formState.values;
    const signupData = {
      nom:nom,
      prenom:prenom,
      tel:tel,
      email:email,
      password:password,
    };
    console.log(signupData)
    await signupHandler(signupData);
    setisLoading(false) 
   // props.history.push("/");
  };

  //const hasError = (field) =>
 // formState.touched[field] && formState.error[field] ? true : false;
  
    return (
      <Auth>
        <form  onSubmit={(e) =>onSignupHandler(e)} className="form">
          <TextField
            id="nom"
            name="nom"
            label="Nom"
            onChange={inputChangeHandler}
            value={formState.values.nom}
            //error={hasError("nom")}
            //helperText={hasError("nom") ? formState.error.nom[0] : null}
            

          />
          {/*<Input
            id="nom"
            label="Nom"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "nom")}
            value={this.state.signupForm["nom"].value}
            valid={this.state.signupForm["nom"].valid}
            touched={this.state.signupForm["nom"].touched}
         />*/}
          <TextField
            id="prenom"
            name="prenom"
            label="Prenom"
            onChange={inputChangeHandler}
            value={formState.values.prenom}
           // error={hasError("prenom")}
           // helperText={hasError("prenom") ? formState.error.prenom[0] : null}
          />
          {/*<Input
            id="prenom"
            label="Prenom"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "prenom")}
            value={this.state.signupForm["prenom"].value}
            valid={this.state.signupForm["prenom"].valid}
            touched={this.state.signupForm["prenom"].touched}
          />*/}
          <TextField
            id="tel"
            name="tel"
            label="Numéro de mobile"
            onChange={inputChangeHandler}
            value={formState.values.tel}
          //  error={hasError("tel")}
          //  helperText={hasError("tel") ? formState.error.tel[0] : null}
          />
          {/*<Input
            id="tel"
            label="Numéro de mobile"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "tel")}
            value={this.state.signupForm["tel"].value}
            valid={this.state.signupForm["tel"].valid}
            touched={this.state.signupForm["tel"].touched}
          />*/}
          <TextField
            id="email"
            name="email"
            label="E-Mail"
            type="email"
            onChange={inputChangeHandler}
            value={formState.values.email}
           // error={hasError("email")}
          //  helperText={hasError("email") ? formState.error.email[0] : null}
          />
          {/* <Input
            id="email"
            label="E-Mail"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "email")}
            value={this.state.signupForm["email"].value}
            valid={this.state.signupForm["email"].valid}
            touched={this.state.signupForm["email"].touched}
         />*/}
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            onChange={inputChangeHandler}
            value={formState.values.password}
            //error={hasError("password")}
           // helperText={hasError("password") ? formState.error.password[0] : null}
          />
          {/*<Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "password")}
            value={this.state.signupForm["password"].value}
            valid={this.state.signupForm["password"].valid}
            touched={this.state.signupForm["password"].touched}
          />*/}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading||formState.isValid }
            style={{
              marginTop: "30px",
            }}

          >
            Signup
          </Button>
        </form>
      </Auth> 
    );
  
}

export default Signup;
