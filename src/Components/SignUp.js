import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    

  
    const URL =
      "http://localhost:5000/sign-up";
  
    function enviarCadastro(e) {
      e.preventDefault();
      const body = {
        name,
        email,
        password1,
        password2
      };  
      console.log(body)
      axios
        .post(URL, body)
        .then((res) => {
          navigate("/")
        })
        .catch((res) => alert(res.response.data.message));
    }
  
    return (
      <TelaInicial>
        <FotoLogo>
          <h1>My Wallet</h1>
        </FotoLogo>
        <form onSubmit={enviarCadastro}>
          <Formulario>
            <input
              type="name"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Formulario>
          <Formulario>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Formulario>
          <Formulario>
            <input
              type="password"
              placeholder="Senha"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </Formulario>
          <Formulario>
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Formulario>

          <BotaoConfirmar>
            <button>Cadastrar</button>
          </BotaoConfirmar>
        </form>
  
        <BotaoCadastro>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <p>Já tem uma conta? Faça login!</p>
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
    h1{
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
      background-color: #52b6ff;
      color: white;
    }
  `;
  
  const BotaoCadastro = styled.div`
    display: flex;
    justify-content: center;
    color: #52b6ff;
    text-decoration: underline;
  `;

  