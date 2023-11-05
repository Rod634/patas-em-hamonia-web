import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './style.css';
import useAuth from '../../hooks/useAuth';

export function Profile() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState<any>([]);
  const { user, signout } : any = useAuth();

  useEffect(() => {
    window.scroll(0, 0);
    
    const api = async () => {
      var data = await fetch(`${import.meta.env.VITE_API_URL}/Animal/user?userId=${user.id}&ngoId=${user.ngoId}`, {
        method: "GET"
      });
      const getAnimals = await data.json();
      setAnimals(getAnimals);
    };

    api();
  }, []);

  function openAnimalPage(animal : any){
    navigate(`/animal/${animal.id}`, { state: {animal}})
  }

  return (
    <div>
      <Header></Header>
      <div className='container-one-profile-page'>
        <div className='profile-section-one-profile'>
          <div className='profile-img'>
            <img src={user.photoUrl ? user.photoUrl : "/patas-em-hamonia-web/default_profile.png"} />
          </div>
          <div className='profile-info'>
            <h1>Nome: {user.name}</h1>
            <div className='profile-info-fields'>
              <div className='info-fields-one'>
                <p>Email: {user.email}</p>
                <p>Contato: {user.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='profile-section-two-profile'>
          <div className='data-section-profile'>
            <h1>Animais Cadastrados</h1>
            <div className='data-section-list-profile'>
              {animals.length > 0 ? animals.map((animal: any) => (
                <div className='content' onClick={() => openAnimalPage(animal)}>
                  <span>{animal.name} - {animal.species} {animal.gender == "fêmea" ? "(F)" : "(M)"} - {animal.age} {animal.age > 1 ? "ANOS" : "ANO"}</span>
                  <img src='cross.png' />
                </div>
              )) : <p>Sem animais registrados</p>}
            </div>
          </div>
        </div>
        <div className='profile-btns'>
          <Link to="/">
            <button>Voltar</button>
          </Link>
          <Link to="/animal-form">
            <button>Novo animal</button>
          </Link>
          <Link to="/Login">
            <button onClick={signout} >Sair</button>
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}