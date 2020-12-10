import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import { required } from "../util/validators";

const { Component } = require("react");

class Annonces extends Component{
    state={
        annonces:[],
        searchText:{
                value:"",
                valid:false,
                required:true,
                validators:[required]
        },
        err:null   
    }
    componentDidMount=()=>{
        this.annoncesGetter();
    }
    annoncesGetter=()=>{
        fetch("http://localhost:5000/annonce/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 400) {
            throw new Error(
              "Cannot Get annonces"
            );
          }
          return res.json();
        })
        .then((resData) => {
          console.log("data in Api",resData);
          this.setState({ annonces:resData});
          //this.props.history.replace("/");
    
        })
        .catch((err) => {
          alert(err)
        });
      }

    /*componentDidMount=()=>{
        const localannoces=this.props.apiAnnonces()[0]
        console.log("recue",localannoces)
        this.setState({
            annonces:localannoces
        }
        )

    }*/

    inputChangeHandler=(input,value)=>{
        this.setState((prevState)=>{
            let isValid=true
            for(let validator of prevState.searchText.validators){
                isValid=isValid && validator(value)
            }
            const updatedForm={
                ...prevState,
                [input]:{
                    ...prevState[input],
                    valid:isValid,
                    value:value
                }
            }
            return{
                searchText:updatedForm,
            }

        })

    }

render(){
//let annonces=this.state.annonces
        /*for(let annonce in this.state.annonces){
         annonces=annonces+
         <li>
             <h1>
                 {annonce.objet}
             </h1>
             <p>
                 {annonce.detail}
             </p>
         </li>
        }*/

                    

    return(
        <div >
       <form >
            <Input
            id="searchText"
            control="input"
            value={this.state.searchText.value}
            required={this.state.searchText.valid}
            onChange={this.inputChangeHandler}
            />
                
                
            <Button
            design="raised"
            type="submit"
            loading={this.props.loading}
            >Chercher</Button>
        </form>
        
        </div>
    )
}


}
export default Annonces