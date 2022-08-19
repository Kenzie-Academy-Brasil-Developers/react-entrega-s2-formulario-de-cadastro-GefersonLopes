import { Content } from "./styled";
import add from "../imgComponents/home/add.png";
import removeItem from "../imgComponents/home/removeItem.png";
import { config, token, url } from "../CreateTecnology";

import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../Context/Auth";

export function ContentMain() {
  const { isModal, setIsModal, CreateTecnology, techsList, setTechsList,RemoveTech } =
    useContext(Context);
  const modalTrue = () => setIsModal(!isModal);
  const tokenUser = localStorage.getItem("@token");
  
  const arrayToken = [];
  for(let i = 1; i < tokenUser.length - 1; i++) {

    arrayToken.push(tokenUser[i]);
  }  
  
  const configToken = {
    headers: { Authorization: `Bearer ${arrayToken.join("")}` }
  }
  
  useEffect(() => {

    axios
    .get(url + "profile", configToken)
    .then(function (response) {
      const data = response.data.techs;
      setTechsList(data);
    })
    .catch(function (error) {
      console.log(error);
    });

  }, [techsList])

  return (
    <>
      <CreateTecnology />
      <Content>
        <div className="tecnologiContainer">
          <h3 className="titleTecnologi">Tecnologias</h3>
          <button onClick={modalTrue} id="btnAdd">
            <img id="imgAdd" src={add} alt="adicionar" />
          </button>
        </div>
        {techsList && techsList.length > 0 && (
          <ul>
            {techsList.map((tech, index) => (
              <li id={tech.id} key={tech.id} className="list_Content">
                <h3 className="title_List">{tech.title}</h3>
                <div className="container_Rigth">
                  <p>{tech.status}</p>
                  <button
                    onClick={(e) => RemoveTech(e.target.id)}
                    className="btnRemoveItem"
                  >
                    <img
                      id={tech.id}
                      className="imgRemoveItem"
                      src={removeItem}
                      alt="remover item"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Content>
    </>
  );
}
