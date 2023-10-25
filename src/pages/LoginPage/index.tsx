import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNavigate } from "react-router";
import './style.css';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function login() {
    try {
      var body = {
        email: email,
        password: password
      };

      const response = await fetch("https://localhost:7100/v1/Access/Login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const result = await response.status;
      if(result == 200){
        navigate('/');
      }else{
        alert("Verifique seu email e senha");
      }
    } catch (error) {
      alert("Tente novamente mais tarde :(");
    }
  }

  const submitForm = (event: any) => {
    event.preventDefault();
    login();
  }

  return (
    <div>
      <Header></Header>
      <div className='container-one-login'>
        <h1>Login</h1>
        <div className="login-form">
          <form id='login-form' onSubmit={submitForm}>
            <label>Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} required/>
            <label>Senha</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
          </form>
        </div>
        <div className="login-form-buttons">
          <button className="signup-button" onClick={() => navigate("/cadastro")}>Cadastrar</button>
          <button className="signin-button" form="login-form">Entrar <img src="../../../public/paw_button.png" /></button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
