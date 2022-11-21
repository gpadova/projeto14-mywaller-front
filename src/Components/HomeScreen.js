import axios from "axios";
import styled from "styled-components";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen({
  token,
  nome,
  idDono,
  setToken,
  setNome,
  setIdDono,
}) {
  const [transacoes, setTransacoes] = useState({
    valor: "",
    descricao: "",
    tipo: "",
    data: "",
  });
  const [saldo, setSaldo] = useState(0);
  const navigate = useNavigate()
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      id: idDono,
    },
  };
  function somarSaldo(trans) {
    let soma = 0;
    let saldo = [];
    trans.map((reg) => {
      if (reg.tipo == "entrada") {
        saldo.push(Number(reg.valor));
      } else {
        saldo.push(-1 * Number(reg.valor));
      }
    });

    for (let i = 0; i < saldo.length; i++) {
      soma += saldo[i];
    }
    setSaldo(soma);
  }

  function voltarLogin(e){
    e.preventDefault()
    setIdDono("")
    setNome("")
    setIdDono("")
    navigate("/")
  }

  useEffect(() => {
    const URL = "http://localhost:5000/transaction";
    axios
      .get(URL, config)
      .then((res) => {
        setTransacoes(res.data);
        somarSaldo(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  return (
    <TelaToda>
      <Topo>
        <h1>Olá, {nome}</h1>
        <MdExitToApp onClick={voltarLogin}/>
      </Topo>
      {transacoes.length ? (
        <CaixonaRegistros2>
          {transacoes.map((trans) => (
            <div className="dados">
              <div className="data">{trans.data}</div>
              <div className="descricao">{trans.descricao}</div>
              <div className={trans.tipo === "saida" ? "vermelho" : "verde"}>
                {" "}
                R$ {trans.valor}
              </div>
            </div>
          ))}
          <Saldo>
            <div className="saldo">SALDO</div>
            <div className={saldo <= 0 ? "vermelho" : "verde"}>R$ {saldo}</div>
          </Saldo>
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
const Saldo = styled.div`
  display: flex;
  justify-content: space-around;
  width: 326px;
  height: 30px;
  .vermelho {
    color: #c70000;
  }
  .verde {
    color: green;
  }
`;

const TelaToda = styled.div`
  height: 100vh;
  background-color: #915fbf;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Topo = styled.div`
  width: 326px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 30px;
  padding-top: 25px;
  margin-bottom: 40px;
  h1 {
    font-family: Raleway;
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
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
