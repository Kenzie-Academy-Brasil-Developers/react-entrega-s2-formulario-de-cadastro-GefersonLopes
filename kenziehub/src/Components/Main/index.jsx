import { Content } from "./styled";
import add from "../imgComponents/home/add.png";
import removeItem from "../imgComponents/home/removeItem.png";
import { CreateTecnology } from "../CreateTecnology";
import { RemoveTech } from "../RemoveTech";


export function ContentMain({ tecnology, setTecnology, isModal, setIsModal }) {
  
  const modalTrue = () => setIsModal(!isModal);
  const techs = JSON.parse(localStorage.getItem("@Techs"));

  return (
    <>
      <CreateTecnology isModal={isModal} setIsModal={setIsModal} />
      <Content>
        <div className="tecnologiContainer">
          <h3 className="titleTecnologi">Tecnologias</h3>
          <button onClick={modalTrue} id="btnAdd">
            <img id="imgAdd" src={add} alt="adicionar" />
          </button>
        </div>
        { techs && techs.length > 0 && (
          <ul>
            {techs.map((tech,index) => (
              <li id={tech.id} key={tech.id} className="list_Content">
                <h3 className="title_List">{tech.title}</h3>
                <div className="container_Rigth">
                  <p>{tech.status}</p>
                  <button onClick={(e) => RemoveTech(e.target.id)} className="btnRemoveItem">
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
        {/* <ul>
          <li className="list_Content">
            <h3 className="title_List">React JS</h3>
            <div className="container_Rigth">
              <p>Iniciante</p>
              <button className="btnRemoveItem">
                <img
                  className="imgRemoveItem"
                  src={removeItem}
                  alt="remover item"
                />
              </button>
            </div>
          </li>
          <li className="list_Content">
            <h3 className="title_List">Next JS</h3>
            <div className="container_Rigth">
              <p>Intermediário</p>
              <button className="btnRemoveItem">
                <img
                  className="imgRemoveItem"
                  src={removeItem}
                  alt="remover item"
                />
              </button>
            </div>
          </li>
          <li className="list_Content">
            <h3 className="title_List">Material UI</h3>
            <div className="container_Rigth">
              <p>Iniciante</p>
              <button className="btnRemoveItem">
                <img
                  className="imgRemoveItem"
                  src={removeItem}
                  alt="remover item"
                />
              </button>
            </div>
          </li>
          <li className="list_Content">
            <h3 className="title_List">CSS</h3>
            <div className="container_Rigth">
              <p>Avançado</p>
              <button className="btnRemoveItem">
                <img
                  className="imgRemoveItem"
                  src={removeItem}
                  alt="remover item"
                />
              </button>
            </div>
          </li>
          <li className="list_Content">
            <h3 className="title_List">JavaScript</h3>
            <div className="container_Rigth">
              <p>Iniciante</p>
              <button className="btnRemoveItem">
                <img
                  className="imgRemoveItem"
                  src={removeItem}
                  alt="remover item"
                />
              </button>
            </div>
          </li>
          <li className="list_Content">
            <h3 className="title_List">GitHub</h3>
            <div className="container_Rigth">
              <p>Intermediário</p>
              <button className="btnRemoveItem">
                <img
                  className="imgRemoveItem"
                  src={removeItem}
                  alt="remover item"
                />
              </button>
            </div>
          </li>
        </ul> */}
      </Content>
    </>
  );
}
