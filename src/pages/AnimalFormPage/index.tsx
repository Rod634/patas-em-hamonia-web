import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Autocomplete from "react-google-autocomplete";

import './style.css';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';


export function AnimalForm() {
  const { user } : any = useAuth();
  const navigate = useNavigate();

  const [diseaseOptions, setDiseaseOptions] = useState<any>([]);
  const [vaccinesOptions, setVaccinesOptions] = useState<any>([]);

  const [selectedVaccines, setSelectedVaccines] = useState<any>([]);
  const [selectedDisease, setSelectedDisease] = useState<any>([]);

  const [address, setSelectedAddress] = useState<any>([]);

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

  const genderOptions = [
    { value: 'macho', label: 'macho' },
    { value: 'fêmea', label: 'fêmea' },
  ]

  const speciesOptions = [
    { value: 'Cachorro', label: 'Cachorro' },
    { value: 'Gato', label: 'Gato' },
  ]

  const optionsMap = {
    language: 'pt-BR',
    types: ['geocode']
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }))
  }

  useEffect(() => {
    window.scroll(0, 0);

    const api = async () => {
      var data = await fetch(`${import.meta.env.VITE_API_URL}/Vaccine`, {
        method: "GET"
      });
      const getVaccines = await data.json();
      var vaccineOptions: any = [];
      getVaccines.forEach((v: any) => {
        vaccineOptions.push({ value: v.id, label: v.name });
      });
      setVaccinesOptions(vaccineOptions);

      var data = await fetch(`${import.meta.env.VITE_API_URL}/Disease`, {
        method: "GET"
      });
      const getDiseases = await data.json();
      var diseaseOptions: any = [];
      getDiseases.forEach((d: any) => {
        diseaseOptions.push({ value: d.id, label: d.name });
      });
      setDiseaseOptions(diseaseOptions);
    };

    api();
  }, []);

  async function postAnimal(data: any) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Animal`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.status;
      if (result == 201) {
        alert('Cadastrado com sucesso');
        navigate('/perfil');
      }
    } catch (error) {
      alert("Tente novamente mais tarde :(");
    }
  }

  const submitForm = (event: any) => {
    try {
      event.preventDefault();
      var data = inputs;

      if(selectedDisease.length > 0){
        selectedDisease.forEach((disease: any) => {
          data.disease.push({ idDisease: disease.value, idStatus: 1 })
        })
      }

      if(selectedVaccines.length > 0){
        selectedVaccines.forEach((vaccine: any) => {
          data.vaccine.push({ idVaccine: vaccine.value, dtVaccine: "2023-10-25T23:09:20.776Z" })
        })
      }

      data.latitudeLongitude = `${address.geometry.location.lat()}, ${address.geometry.location.lng()}`;
      data.neighborhood = address.formatted_address;
      data.idUser = user.id;
      data.ngoId = user.ngoId;

      postAnimal(data);
    } catch (err) {
      console.log(err);
      alert("Tente novamente mais tarde :(")
    }
  }

  return (
    <div>
      <Header></Header>
      <div className='container-one-signup'>
        <h1>Cadastro</h1>
        <div className="signup-form">
          <form id='animal-form' onSubmit={submitForm}>
            <div className='animal-form-content'>
              <label>Nome<span>*</span></label>
              <input type="text" name='name' onChange={handleChange} required />
              <label>Raça<span>*</span></label>
              <input type="text" name='race' onChange={handleChange} required />
              <label>Sexo<span>*</span></label>
              <Select
                closeMenuOnSelect={true}
                options={genderOptions}
                onChange={(item: any) => setInputs((values: any) => ({ ...values, ['gender']: item.value }))}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '1rem',
                  }),
                }}
                required
              />
              <label>Doenças</label>
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={diseaseOptions}
                onChange={(item: any) => setSelectedDisease(item)}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '1rem',
                  }),
                }}
              />
              <label>De rua?</label>
              <input className='checkbox' type='checkBox' onClick={() => { setInputs((values: any) => ({ ...values, ['errant']: !inputs.errant })) }} />

            </div>
            <div className='animal-form-content'>
              <label>Idade</label>
              <input type="number" name='age' onChange={handleChange} required />
              <label>Espécie<span>*</span></label>
              <Select
                closeMenuOnSelect={true}
                options={speciesOptions}
                onChange={(item: any) => setInputs((values: any) => ({ ...values, ['species']: item.value }))}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '1rem',
                  }),
                }}
                required
              />
              <label>Foto URL</label>
              <input type="text" name='photoUrl' onChange={handleChange} />
              <label>Vacinas</label>
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={vaccinesOptions}
                onChange={(item: any) => setSelectedVaccines(item)}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '1rem',
                  }),
                }}
              />
              <label>Localização<span>*</span></label>
              <Autocomplete
                apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                onPlaceSelected={(place) => setSelectedAddress(place)}
                options={optionsMap}
              />
            </div>
          </form>
        </div>
        <div className="animal-form-buttons">
          <button form='animal-form'>Cadastrar</button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
