import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';
import { useEffect, useState } from 'react';

export function Schedule() {

  const [animals, setAnimals] = useState<any>([]);
  const [ongs, setOngs] = useState<any>([]);
  const [user, setUser] = useState<any>([]);

  //getUser By localStorage
  //setUser()

  useEffect(() => {
    window.scroll(0, 0);

    const api = async () => {
      var data = await fetch("https://localhost:7100/v1/Animal/user?userId=8373c2fa-90e3-4fbe-93c1-0b75d28833a6&ngoId=2", {
        method: "GET"
      });
      const getAnimals = await data.json();
      setAnimals(getAnimals);

      var data = await fetch("https://localhost:7100/v1/Ngo", {
        method: "GET"
      });
      const getOngs = await data.json();
      setOngs(getOngs);
    };

    api();
  }, []);

  return (
    <div>
      <Header></Header>
      <div className='schedule-container-one'>
        <h1>Agendar Castração</h1>
        <div className='schedule-select'>
          <div className='schedule-select-content'>
            <h2>Bixinho</h2>
            <select name="animal">
              <option value={''}>Nenhuma</option>
              {animals.map((animal: any) => (
                <option value={animal.id} >{animal.name} - {animal.species} {animal.gender == "fêmea" ? "(F)" : "(M)"} - {animal.age} {animal.age > 1 ? "ANOS" : "ANO"}</option>
              ))}
            </select>
          </div>
          <div className='schedule-select-content'>
            <h2>Ongs Disponíveis</h2>
            <select name="ong">
              <option value={''}>Nenhuma</option>
              {ongs.map((ong: any) => (
                <option value={ong.id} >{ong.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='schedule-button'>
          <button>Agendado!</button>
        </div>
        <div className='schedule-mail-info-section'>
          <div className='schedule-mail'>
            <h2>E-mail</h2>
            <textarea />
            <div className='schedule-mail-button'>
              <button>Enviar</button>
            </div>
          </div>
          <div className='schedule-info'>
            <div className='schedule-info-address'>
              <h2>Endereço</h2>
              <p>83104-362; Primeiro de Maio - 4170;
                Conjunto 9; Planalto - Cabo de Santo
                Agostinho - Pernambuco (PE)</p>
            </div>
            <div className='schedule-info-contact'>
              <h2>Contatos</h2>
              <p>Email: testepiupiu@gmail.com</p>
              <p>Telefone: (71)987320474</p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
