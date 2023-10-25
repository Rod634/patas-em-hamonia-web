import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';
import { useState } from 'react';

export function AnimalForm() {
  const [inputs, setInputs] = useState<any>({
    name: '',
    age: 0,
    race: '',
    species: '',
    gender: '',
    errant: false,
    photoUrl: '',
    latitudeLongitude: '',
    neighborhood: '',
    idUser: '',
    ngoId: '',
    disease: [],
    vaccine: []
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
            <div className='animal-form-content'>
              <label>Nome<span>*</span></label>
              <input type="text" name='name' onChange={handleChange} />
              <label>Raça<span>*</span></label>
              <input type="text" name='race' onChange={handleChange} />
              <label>Sexo<span>*</span></label>
              <input type="text" name='gender' onChange={handleChange} />
              <label>Doenças</label>
              <select name="disease" onChange={handleChange}>
                <option value={''}>Nenhuma</option>
              </select>
              <label>De rua?<span>*</span></label>
              <input className='checkbox' type='checkBox' />

            </div>
            <div className='animal-form-content'>
              <label>Idade</label>
              <input type="text" name='age' onChange={handleChange} />
              <label>Espécie<span>*</span></label>
              <input type="text" name='species' onChange={handleChange} />
              <label>Foto URL</label>
              <input type="text" name='photoUrl' onChange={handleChange} />
              <label>Vacinas</label>
              <select name="vaccine" onChange={handleChange}>
                <option value={''}>Nenhuma</option>
              </select>
              <label>Localização<span>*</span></label>
              <input type="text" name='neighborhood' onChange={handleChange} />
            </div>
          </form>
        </div>
        <div className="animal-form-buttons">
          <button>Cadastrar</button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
