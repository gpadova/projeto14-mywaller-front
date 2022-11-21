import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({setToken, setNome, setIdDono, idDono}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  function entrarAplicacao(e) {
    e.preventDefault();

    const body = { email, password };
    const URL =
      "http://localhost:5000/sign-in";

    axios
      .post(URL, body)
      .then((res) => {
        navigate("/home");
        console.log(res);
        setToken(res.data.token);
        setNome(res.data.nome)
        setIdDono(res.data.userId)
      })
      .catch((res) => alert(res.response.data.message));
  }
  return (
    <TelaInicial>
      <FotoLogo>
        <h1>MyWallet</h1>
      </FotoLogo>
      <form>
        <Formulario>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Formulario>
        <Formulario>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Formulario>
        <BotaoConfirmar onClick={entrarAplicacao}>
          <button>Entrar</button>
        </BotaoConfirmar>
      </form>
      <BotaoCadastro>
        <Link to={"/sign-up"}>
          <p>Não tem uma conta? Cadastre-se!</p>
        </Link>
      </BotaoCadastro>
    </TelaInicial>
  );
}

const TelaInicial = styled.div`
  width: 100%;
  background-color: #915FBF;
  height: 100vh;
  img {
    margin-top: 68px;
  }
`;

const Formulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
  margin: 0 auto;
  color: #d5d5d5;
  input {
    margin-bottom: 10px;
    width: 303px;
    height: 45px;
    border-radius: 5px;
  }
`;

const FotoLogo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding-top: 20px;
  h1 {
    font-family: Saira Stencil One;
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
  }
`;

const BotaoConfirmar = styled.div`
  display: flex;
  justify-content: center;

  button {
    height: 45px;
    width: 303px;
    left: 36px;
    top: 381px;
    border-radius: 4.636363506317139px;
    background: #A328D6;
    color: white
  }
`;

const BotaoCadastro = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  text-decoration: underline;
`;
