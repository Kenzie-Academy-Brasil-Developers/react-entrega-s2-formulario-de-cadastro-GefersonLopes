import { Div } from "../Login/styled";
import { FormTecnologi, Header } from "./styled";
import { useForm } from "react-hook-form";
import axios from "axios";


import "./style.css";
import { useContext } from "react";
import { Context } from "../../Context/Auth";

export const url = "https://kenziehub.herokuapp.com/";

const salvedata = JSON.parse(localStorage.getItem("salveData"));
export const token = salvedata?.data.token;

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export function CreateTecnology() {
  
  const { isModal, setIsModal} = useContext(Context);
  const modalTrue = () => setIsModal(!isModal);

  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data) => {
    const title = data?.title;
    const status = data?.status;

    axios
      .post(
        url + "users/techs",
        {
          title,
          status,
        },
        config
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {isModal && (
        <div className="modal">
          <Div id="modal-content">
            <Header>
              <h3>Cadastrar Tecnologia</h3>
              <button onClick={modalTrue} className="btn-Close">
                X
              </button>
            </Header>
            <FormTecnologi onSubmit={handleSubmit(onSubmit)}>
              <label>
                <div>
                  <p>Nome</p>
                  <input
                    type="text"
                    placeholder="TypeScript"
                    {...register("title")}
                  />
                </div>
                <div>
                  <p>Selecionar status</p>
                  <select name="text" id="" {...register("status")}>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                </div>
                <button type="submit">Cadastrar Tecnologia</button>
              </label>
            </FormTecnologi>
          </Div>
        </div>
      )}
    </>
  );
}
