import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Autocomplete from "react-google-autocomplete";

import './style.css';
import { useNavigate } from 'react-router';


export function AnimalForm() {
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
      var data = await fetch("https://localhost:7100/v1/Vaccine", {
        method: "GET"
      });
      const getVaccines = await data.json();
      var vaccineOptions: any = [];
      getVaccines.forEach((v: any) => {
        vaccineOptions.push({ value: v.id, label: v.name });
      });
      setVaccinesOptions(vaccineOptions);

      var data = await fetch("https://localhost:7100/v1/Disease", {
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
      const response = await fetch("https://localhost:7100/v1/Animal", {
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

      data.idUser = "a78b7c4e-41c3-4e64-9454-286928187d3d";
      data.ngoId = "195f946d-be78-4527-896b-0274462f4b6f";

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
                className='multiselect'
                onChange={(item: any) => setInputs((values: any) => ({ ...values, ['gender']: item.value }))}
                required
              />
              <label>Doenças</label>
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={diseaseOptions}
                className='multiselect'
                onChange={(item: any) => setSelectedDisease(item)}
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
                className='multiselect'
                onChange={(item: any) => setInputs((values: any) => ({ ...values, ['species']: item.value }))}
                required
              />
              <label>Foto URL</label>
              <input type="text" name='photoUrl' onChange={handleChange} />
              <label>Vacinas</label>
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={vaccinesOptions}
                className='multiselect'
                onChange={(item: any) => setSelectedVaccines(item)}
              />
              <label>Localização<span>*</span></label>
              <Autocomplete
                apiKey={""}
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
