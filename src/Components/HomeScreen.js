import axios from "axios";
import styled from "styled-components";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HomeScreen({ token, nome, idDono }) {
  const [transacoes, setTransacoes] = useState({
    valor: "",
    descricao: "",
    tipo: "",
    data: "",
  });

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      id: idDono,
    },
  };

  useEffect(() => {
    const URL = "http://localhost:5000/transaction";
    axios
      .get(URL, config)
      .then((res) => {
        setTransacoes(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  console.log(transacoes);
  return (
    <TelaToda>
      <h1>Olá, {nome}</h1>
      {transacoes.length ? (
        <CaixonaRegistros2>
          {transacoes.map((trans) => (
            <div className="dados">
              <div className="data">{trans.data}</div>
              <div className="descricao">{trans.descricao}</div>
              <div className={trans.tipo === "saida" ? "vermelho" : "verde"}> R$ {trans.valor}</div>
            </div>
          ))}
        </CaixonaRegistros2>
      ) : (
        <CaixonaRegistros1>
          <p>Não há registros de entrada ou de saída</p>
        </CaixonaRegistros1>
      )}
      <CaixaEntSai>
        <Link to={"/new-entry"} style={{ textDecoration: "none" }}>
          <CaixaEntrada>
            <AiOutlinePlusCircle />
            <p>Nova Entrada</p>
          </CaixaEntrada>
        </Link>
        <Link to={"/new-exit"} style={{ textDecoration: "none" }}>
          <CaixaSaida>
            <AiOutlineMinusCircle />
            <p>Nova Saída</p>
          </CaixaSaida>
        </Link>
      </CaixaEntSai>
    </TelaToda>
  );
}

const TelaToda = styled.div`
  height: 100vh;
  background-color: #915fbf;
  display: flex;
  align-items: center;
  flex-direction: column;
  h1 {
    font-family: Raleway;
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
    margin-left: -70px;
    padding-top: 25px;
    margin-bottom: 40px;
  }
`;

const CaixonaRegistros1 = styled.div`
  height: 446px;
  width: 326px;
  left: 25px;
  top: 78px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    height: 46px;
    width: 180px;
    left: 98px;
    top: 278px;
    border-radius: nullpx;
    font-family: Raleway;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    color: #868686;
  }
`;

const CaixonaRegistros2 = styled.div`
  height: 446px;
  width: 326px;
  left: 25px;
  top: 78px;
  border-radius: 5px;
  background-color: white;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  .dados {
    display: flex;
    justify-content: space-between;
    margin-top: 23px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .data {
    color: #c6c6c6;
  }
  .descricao {
  }
  .vermelho {
    color: #c70000;
  }
  .verde {
    color: green;
  }
`;
const CaixaEntSai = styled.div`
  display: flex;
  margin-top: 20px;
  color: white;
  font-size: 20px;
`;

const CaixaEntrada = styled.div`
  height: 114px;
  width: 156px;
  left: 195px;
  top: 537px;
  border-radius: 5px;
  background-color: #a328d6;
  margin-right: 15px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const CaixaSaida = styled.div`
  height: 114px;
  width: 156px;
  left: 195px;
  top: 537px;
  border-radius: 5px;
  background-color: #a328d6;

  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;
