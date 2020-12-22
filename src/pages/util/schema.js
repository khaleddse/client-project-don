const signInSchema = {
  email: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    email: { message: "n'est pas valide !" },
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
const ContactUsSchema = {
  email: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    email: { message: "n'est pas valide !" },
    length: {
      maximum: 64,
    },
  },
  detail: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      maximum: 128,
    },
  },
};
const signUpSchema = {
  nom: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      maximum: 15,
    },
  },
  prenom: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      maximum: 15,
    },
  },
  tel: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      maximum: 15,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    email: { message: "n'est pas valide !" },
    length: { maximum: 64 },
  },
  password: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      minimum: 6,
      maximum: 128,
      message: ":minimum 6 caractère!",
    },
  },
  confirmpassword: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      minimum: 6,
      maximum: 128,
      message: ":minimum 6 caractère!",
    },
  },
};
const AddAnnouncementSchema = {
  objet: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      minimum: 4,
      maximum: 64,
      message: "maximum 64 caractére ,minimum 4!",
    },
  },
  detail: {
    length: {
      maximum: 1000,
      message: "maximum 1000 caractére!",
    },
  },
  adresse: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
  },
  image: {},
  telephone: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      minimum: 8,
      message: "minimum 8 chiffre !",
    },
    format: {
      pattern: /^(\+?0*216)?\d{8}$/,
      message: "forme invalide!",
    },
  },
  subcategorie: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
  },
};
export { signInSchema, signUpSchema, AddAnnouncementSchema ,ContactUsSchema};
