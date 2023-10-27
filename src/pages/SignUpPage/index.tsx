import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router';
import './style.css';

export function SignUp() {
  const salt = bcrypt.genSaltSync(10);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<any>({
    name: '',
    email: '',
    emailConf: '',
    phone: '',
    password: '',
    passwrdConf: '',
    photoUrl: '',
    hasPets: false,
    ngoId: '',
    aditionalInfo: ''
  });

  const [ongs, setOngs] = useState<any>([]);

  useEffect(() => {
    window.scroll(0, 0);

    const api = async () => {
      var data = await fetch(`${import.meta.env.VITE_API_URL}/Ngo`, {
        method: "GET"
      });
      const getOngs = await data.json();
      setOngs(getOngs);
    };

    api();
  }, []);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }))
  }

  async function postUser(data : any) {
    try {
      var body = data;
      body.password = bcrypt.hashSync(inputs.password, salt);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/User`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const result = await response.status;
      if(result == 201){
        alert('Cadastrado com sucesso');
        redirectToLogin();
      }
    } catch (error) {
      alert("Tente novamente mais tarde :(");
    }
  }

  function submitForm(event : any){
    event.preventDefault();
   
    if(inputs.email == inputs.emailConf && inputs.password == inputs.passwrdConf){   
      postUser(inputs);
    }else{
      alert('Email ou senha diferentes do campo de confirmação')
    }
  }
  
  function redirectToLogin(){
    navigate("/login")
  }

  return (
    <div>
      <Header></Header>
      <div className='container-one-signup'>
        <h1>Cadastro</h1>
        <div className="signup-form">
          <form id='signup-form' onSubmit={submitForm}>
            <div className='signup-form-content'>
              <label>Nome<span>*</span></label>
              <input type="text" name='name' required onChange={handleChange} />
              <label>Email<span>*</span></label>
              <input type="text" name='email' required onChange={handleChange} />
              <label>Senha<span>*</span></label>
              <input type="password" name='password' required onChange={handleChange} />
              <label>Telefone<span>*</span></label>
              <input type="text" name='phone' required onChange={handleChange} />
              <label>Foto</label>
              <input type="text" name='photoUrl' onChange={handleChange} />
              <label>Tem algum bixinho?</label>
              <input className='checkbox' type='checkBox' onClick={() => { setInputs((values: any) => ({ ...values, ['hasPets']: !inputs.hasPets })) }}/>
            </div>
            <div className='signup-form-content'>
              <label>Nome da Ong</label>
              <select name="ngoId" onChange={handleChange}>
                <option value={''}>Nenhuma</option>
                {ongs.map((ong: any) => (
                  <option value={ong.id}>{ong.name}</option>
                ))}
              </select>
              <br />
              <label>Confirmar Email<span>*</span></label>
              <input type="text" name='emailConf' required onChange={handleChange} />
              <label>Confirmar Senha<span>*</span></label>
              <input type="password" name='passwrdConf' required onChange={handleChange} />
              <label>Informação Adicional<span>*</span></label>
              <textarea name='aditionalInfo' onChange={handleChange} />
            </div>
          </form>
        </div>
        <div className="signup-form-buttons">
          <button className="signup-button-signup" onClick={redirectToLogin}>Login</button>
          <button className="signin-button-signup" form='signup-form'>Cadastrar<img src="/patas-em-hamonia-web/paw_button.png" /></button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

