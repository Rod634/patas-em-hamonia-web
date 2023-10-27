import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/globalStyle.css'
import './style.css'
import { useEffect, useState } from 'react';


export function Animal() {
  const location = useLocation();
  const animal = location.state.animal;
  console.log(animal);

  const [diseases, setDisease] = useState<any>([]);
  const [vaccines, setVaccine] = useState<any>([]);
  const [userContact, setUserContact] = useState<string>("N/A");

  function proccessVacines(vaccineData: any) {
    if (animal.vaccineAnimals) {
      var animalVaccines: any = []

      animal.vaccineAnimals.forEach((vaccine: any) => {
        vaccineData.forEach((vd: any) => {
          if (vd.id == vaccine.idVaccine) {
            animalVaccines.push(vd.name)
          }
        });
      });
      setVaccine(animalVaccines);
    }
  }

  function proccessDiseases(diseaseData: any) {
    if (animal.diseaseAnimals) {
      var animalDiseases: any = []

      animal.diseaseAnimals.forEach((disease: any) => {
        diseaseData.forEach((dd: any) => {
          if(dd.id == disease.idDisease) {
            animalDiseases.push(dd.name);
          }
        });
      });
      setDisease(animalDiseases);
    }
  }

  useEffect(() => {
    window.scroll(0, 0);

    const api = async () => {
      var data = await fetch(`${import.meta.env.VITE_API_URL}/Vaccine`, {
        method: "GET"
      });
      const vaccineResponse = await data.json();
      proccessVacines(vaccineResponse);

      var data = await fetch(`${import.meta.env.VITE_API_URL}/Disease`, {
        method: "GET"
      });
      const diseaseResponse = await data.json();
      proccessDiseases(diseaseResponse);

      var data = await fetch(`${import.meta.env.VITE_API_URL}/v1/User?id=${animal.idUser}`, {
        method: "GET"
      });
      const userResponse = await data.json();
      setUserContact(userResponse.phone);
    };

    api();
  }, []);

  return (
    <div>
      <Header></Header>
      <div className='container-one-info-page'>
        <div className='profile-section-one'>
          <div className='profile-img'>
            <img src={animal.photoUrl ? animal.photoUrl : "/patas-em-hamonia-web/public/default_profile.png"} />
          </div>
          <div className='profile-info'>
            <h1>Nome: {animal.name}</h1>
            <div className='profile-info-fields'>
              <div className='info-fields-one'>
                <p>Sexo: {animal.gender == "fêmea" ? "F" : "M"}</p>
                <p>Idade: {animal.age} {animal.age > 1 ? "anos" : "ano"}</p>
                <p>Raça: {animal.race}</p>
              </div>
              <div className='info-fields-two'>
                <p>Espécie: {animal.species}</p>
                <p>Contato: {userContact}</p>
                <p>Errante: {animal.errant ? "Sim" : "Não"}</p>
              </div>
            </div>
            <div className='contact-section'>
              <p>Localização: {animal.neighborhood}</p>
            </div>
          </div>
        </div>

        <div className='profile-section-two'>
          <div className='data-section'>
            <h1>Doenças</h1>
            <div className='data-section-list'>
            {diseases.length > 0 ? diseases.map((disease : any) => (
                <p>{disease}</p>
              )) : <p>Sem doenças registradas</p>}
            </div>
          </div>
          <div className='data-section'>
            <h1>Vacinas</h1>
            <div className='data-section-list'>
              {vaccines.length > 0 ? vaccines.map((vaccine : any) => (
                <p>{vaccine}</p>
              )) : <p>Sem vacinas registradas</p>}
            </div>
          </div>
        </div>
        <div className='back-button'>
            <Link to="/animais">
              <button>Voltar</button>
            </Link>
          </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
