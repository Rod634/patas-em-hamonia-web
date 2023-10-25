import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';
import { useState } from 'react';

export function SignUp() {
  const [inputs, setInputs] = useState<any>({
    name: '',
    email: '',
    emailConf: '',
    phone: '',
    passwrd: '',
    passwrdConf: '',
    photoUrl: '',
    hasPets: false,
    ngoId: '',
    aditionalInfo: ''
  });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }))
  }


  return (
    <div>
      <Header></Header>
      <div className='container-one-signup'>
        <h1>Cadastro</h1>
        <div className="signup-form">
          <form>
            <div className='signup-form-content'>
              <label>Nome<span>*</span></label>
              <input type="text" name='name' onChange={handleChange} />
              <label>Email<span>*</span></label>
              <input type="text" name='email' onChange={handleChange} />
              <label>Senha<span>*</span></label>
              <input type="password" name='passwrd' onChange={handleChange} />
              <label>Telefone<span>*</span></label>
              <input type="text" name='phone' onChange={handleChange} />
              <label>Foto</label>
              <input type="text" name='photoUrl' onChange={handleChange} />
              <label>Tem algum bixinho?<span>*</span></label>

              <input className='checkbox' type='checkBox' />


            </div>
            <div className='signup-form-content'>
              <label>Nome da Ong<span>*</span></label>
              <select name="ngoId" onChange={handleChange}>
                <option value={''}>Nenhuma</option>
              </select>
              <br />
              <label>Confirmar Email<span>*</span></label>
              <input type="text" name='emailConf' onChange={handleChange} />
              <label>Confirmar Senha<span>*</span></label>
              <input type="password" name='passwrdConf' onChange={handleChange} />
              <label>Informação Adicional<span>*</span></label>
              <textarea name='aditionalInfo' onChange={handleChange} />
            </div>
          </form>
        </div>
        <div className="signup-form-buttons">
          <button className="signup-button-signup">Login</button>
          <button className="signin-button-signup">Cadastrar<img src="../../../public/paw_button.png" /></button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

