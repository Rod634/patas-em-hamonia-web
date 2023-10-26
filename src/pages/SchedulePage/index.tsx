import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './style.css';
import { useNavigate } from 'react-router';


export function Schedule() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState<any>([]);
  const [ongs, setOngs] = useState<any>([]);

  const [selectedAnimal, setSelectedAnimal] = useState<any>({});
  const [selectedOng, setSelectedOng] = useState<any>({});
  const [emailText, setEmailText] = useState<string>("Selecione um animal");

  const { user }: any = useAuth();

  useEffect(() => {
    window.scroll(0, 0);

    const api = async () => {
      var data = await fetch(`${import.meta.env.VITE_API_URL}/Animal/user?userId=${user.id}&ngoId=${user.ngoId}`, {
        method: "GET"
      });
      const getAnimals = await data.json();
      setAnimals(getAnimals);

      var data = await fetch(`${import.meta.env.VITE_API_URL}/Ngo`, {
        method: "GET"
      });
      const getOngs = await data.json();
      setOngs(getOngs);
    };

    api();
  }, []);

  function handleChange(event: any) {
    const obj = JSON.parse(event.target.value);
    const name = event.target.name;
    if (name == "animal") {
      proccessEmailTxt(obj)
      setSelectedAnimal(obj);
    } else {
      setSelectedOng(obj);
    }
  }

  function proccessEmailTxt(animal: any) {
    const emailTxt = `Olá envio esse email para solicitar uma Castração para o seguinte animal (${animal.species})`
      + `\n\nNome:${animal.name}`
      + `\nIdade:${animal.age}`
      + `\nRaça:${animal.race}`
      + `\nSexo:${animal.gender}`
      + `\nEndereço:${animal.neighborhood}`;

    setEmailText(emailTxt);
  }

  async function sendMail() {
    const email = user.email.replace("@", "%40");
    const data = {
      "id": "1294447a-2581-4597-be6a-a5dff33af157",
      "to": email + "@mailgun.gw.msging.net",
      "type": "text/plain",
      "content": emailText,
      "metadata": {
        "mail.subject": "Solicitação Para Castração"
      }
    };

    await fetch("https://rodrigo-silva-0ecyk.http.msging.net/messages", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Authorization": import.meta.env.VITE_BLIP_API_KEY
      },
      body: JSON.stringify(data),
    });
    alert("Email enviado com sucesso\nCheque sua caixa de entrada");

    await setScheduleStatusAnimal();
  }

  async function setScheduleStatusAnimal() {
    if (selectedAnimal) {
      var data = {
        idAnimal: selectedAnimal.id,
        name: selectedAnimal.name,
        age: selectedAnimal.age,
        race: selectedAnimal.race,
        species: selectedAnimal.species,
        gender: selectedAnimal.gender,
        errant: selectedAnimal.errant,
        photoUrl: selectedAnimal.photoUrl,
        latitudeLongitude: selectedAnimal.latitudeLongitude,
        neighborhood: selectedAnimal.neighborhood,
        status: "Agendado",
        ngoId: selectedAnimal.ngoId
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/Animal/change`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      var responseData = await response;
      if (responseData.status == 200) {
        alert("Status Atualizado para 'Agendado' com sucesso!");
        navigate('/');
      } else {
        alert("Tente novamente mais tarde");
      }
    }
  }

  return (
    <div>
      <Header></Header>
      <div className='schedule-container-one'>
        <h1>Agendar Castração</h1>
        <div className='schedule-select'>
          <div className='schedule-select-content'>
            <h2>Bixinho</h2>
            <select name="animal" onChange={handleChange}>
              <option value={''}>Animais</option>
              {animals.map((animal: any) => (
                <option value={JSON.stringify(animal)}>{animal.name} - {animal.species} {animal.gender == "fêmea" ? "(F)" : "(M)"} - {animal.age} {animal.age > 1 ? "ANOS" : "ANO"}</option>
              ))}
            </select>
          </div>
          <div className='schedule-select-content'>
            <h2>Ongs Disponíveis</h2>
            <select name="ong" onChange={handleChange}>
              <option value={''}>Ongs</option>
              {ongs.map((ong: any) => (
                <option value={JSON.stringify(ong)} >{ong.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='schedule-button'>
          <button onClick={setScheduleStatusAnimal}>Agendado!</button>
        </div>
        <div className='schedule-mail-info-section'>
          <div className='schedule-mail'>
            <h2>E-mail</h2>
            <textarea value={emailText} onChange={(e) => setEmailText(e.target.value)} />
            <div className='schedule-mail-button'>
              <button onClick={sendMail} >Enviar</button>
            </div>
          </div>
          {selectedOng.id ?
            <div className='schedule-info'>
              <div className='schedule-info-address'>
                <h2>Endereço</h2>
                <p>{selectedOng.address}</p>
              </div>
              <div className='schedule-info-contact'>
                <h2>Contatos</h2>
                <p>Email: {selectedOng.email}</p>
                <p>Telefone: {selectedOng.phone}</p>
              </div>
            </div> : <></>
          }
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
