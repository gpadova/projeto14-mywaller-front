import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";

export default function NewEntry({ token, idDono }) {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      id: idDono,
    },
  };

  function enviarCadastro(e) {
    e.preventDefault();

    const URL = "http://localhost:5000/transaction";
    const body = {
      valor,
      descricao,
      tipo: "entrada",
    };
    console.log(token);

    axios
      .post(URL, body, config)
      .then((res) => {
        navigate("/home");
        console.log(res);
      })
      .catch(() => console.log("Deu algum problema"));
  }

  return (
    <>
      <TelaToda>
        <h1>Nova Entrada</h1>
        <Formulario>
          <CurrencyInput
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            placeholder="Valor"
            decimalsLimit={2}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </Formulario>
        <Formulario>
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Formulario>
        <BotaoSalvar>
          <button onClick={enviarCadastro}>Salvar Entrada</button>
        </BotaoSalvar>
      </TelaToda>
    </>
  );
}

const TelaToda = styled.div`
  height: 100vh;
  background-color: #915fbf;
  h1 {
    font-family: Raleway;
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
    margin-left: 25px;
    padding-top: 25px;
    margin-bottom: 40px;
  }
`;

const Formulario = styled.div`
  display: flex;
  justify-content: center;

  input {
    height: 58px;
    width: 326px;
    left: 25px;
    top: 96px;
    border-radius: 5px;
    margin-bottom: 13px;
  }
`;

const BotaoSalvar = styled.div`
  display: flex;
  justify-content: center;
  button {
    background: #a328d6;

    height: 46px;
    width: 326px;
    left: 25px;
    top: 238px;
    border-radius: 5px;
    color: white;
  }
`;
