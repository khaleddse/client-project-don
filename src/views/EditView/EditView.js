import AppBar from "../../components/AppBar/AppBar";
import Edit from "../../components/UI/editpage/EditPage";
import { useContext } from "react";
import { TextField } from "@material-ui/core";
import { DonContext } from "../../contexte/donContexte";

const EditView = () => {
  const { user } = useContext(DonContext);
  const { nom, prenom, email, tel } = user;
  return (
    <div>
      <AppBar />
      {/*<Edit Nom={nom} Prenom={userinfo.prenom} Email={userinfo.email} Telephone={userinfo.Telephone} update={<TextField/>}/>*/}
      <Edit
        Type={"Nom"}
        Value={nom}
        update={<TextField id="Nom" label="Nom" value={nom} />}
      />
      <Edit
        Type={"Prenom"}
        Value={prenom}
        update={<TextField id="Prenom" label={prenom} />}
      />
      <Edit
        Type={"E-mail"}
        Value={email}
        update={<TextField id="Email" label={email} />}
      />
      <Edit
        Type={"Telephone"}
        Value={tel}
        update={<TextField id="Telephone" label={tel} />}
      />

      {/* <div>
        [] // state
      (nom, prenom, email, tel )=> array => map(
          <Accordion>
            <input> 
            <button></button>
          </Accordion>
        )
      </div> */}

      {/* exports.updateInformation = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, agency, post } = req.body;
  const userId = req.params.userId;
  const updatedUser = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    agency: agency,
    post: post
  };
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedUser },
      { new: true }
    );
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      post: user.post,
      email: user.email,
      phoneNumber: user.phoneNumber,
      agency: user.agency,
      date: user.date,
      imageUrl: user.imageUrl
    };
    const token = await jwt.sign(payload, "keys.secretOrKey", {
      expiresIn: 3600
    });
    if (token) {
      res.status(200).json({ success: true, token: "Bearer " + token });
    }
  } catch (err) {
    console.log(err);
  }
}; */}
    </div>
  );
};
export default EditView;
