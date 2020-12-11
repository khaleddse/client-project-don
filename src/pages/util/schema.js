const signInSchema = {
  email: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      maximum: 128,
    },
  },
};
const signUpSchema={
  email:{
    presence:{allowEmpty:false,message:"est obligatoire!"},
    email:true,
    length:{ maximum:64}
  },
  password: {
    presence:{allowEmpty:false,message:"est obligatoire!"},
    length: {
      maximum: 128,
    },
  },
  tel:{
    presence:{allowEmpty:false,message:"est obligatoire!"},
    length: {
      maximum: 15,
    },
  },
  nom:{
    presence:{allowEmpty:false,message:"est obligatoire!"},
    length: {
      maximum: 15,
    },
  },
  prenom:{
    presence:{allowEmpty:false,message:"est obligatoire!"},
    length: {
      maximum: 15,
    },
  }

}


export { signInSchema,signUpSchema };
