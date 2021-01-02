import React, { useState, useEffect } from "react";
import { GetAllAvis } from "../../services/avis";
import LoggedIn from "../../pages/ContactUs/LoggedIn";
import AvisCard from "../../components/UI/AvisCard/AvisCard";
import Spinner from "../../components/UI/Spinner/Spinner";

export default function ListAvis() {
  const [ListAvis, setListAvis] = useState([{}]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    listAvisHandler();
  }, []);
  const listAvisHandler = async () => {
    setisLoading(true);
    const result = await GetAllAvis();
    setListAvis(result.data);
    setisLoading(false);
  };

  return (
    <LoggedIn>
      {isLoading ? (
        <Spinner />
      ) : ListAvis.length > 0 ? (
        ListAvis.map((avis) => (
          <AvisCard
            key={avis._id}
            email={avis.email}
            detail={avis.detail}
            id={avis._id}
          />
        ))
      ) : (
        <div style={{ marginTop: "5%", textAlign: "center", display: "block" }}>
          <h1>Oops!</h1>
          <img
            height="280"
            width="300"
            src="https://cdn.dribbble.com/users/1365063/screenshots/3979985/na_vrhova__plocha_1.png"
          />
          <h2>Aucun message trouvée !</h2>
        </div>
      )}
    </LoggedIn>
  );
}
