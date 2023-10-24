import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import './style.css';

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
    <div>
      <Header></Header>
      <div className='container-one-login'>
        <h1>Login</h1>
        <div className="login-form">
          <form>
            <label>Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <label>Senha</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </form>
        </div>
        <div className="login-form-buttons">
          <button className="signup-button">Cadastrar</button>
          <button className="signin-button">Entrar <img src="../../../public/paw_button.png" /></button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
