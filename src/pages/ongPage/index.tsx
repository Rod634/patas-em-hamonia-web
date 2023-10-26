import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/globalStyle.css'
import './style.css'

export function Ong() {
  window.scroll(0, 0);
  
  const location = useLocation();
  const ong = location.state.ong;
  const services = ong.services.split(', ');

  return (
    <div>
      <Header></Header>
      <div className='container-one-info-page'>
        <div className='profile-section-one'>
          <div className='profile-img'>
            <img src={ong.photoUrl ? ong.photoUrl : "../../../public/default_profile.png"} />
          </div>
          <div className='profile-info'>
            <h1>Nome: {ong.name}</h1>
            <div className='profile-info-fields-ong'>
              <div className='info-fields-one'>
                <p>Localização: {ong.address}</p>
                <p>Email: {ong.email}</p>
                <p>Contato: {ong.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='profile-section-two-ong'>
          <div className='data-section'>
            <h1>Serviços</h1>
            <div className='data-section-list'>
            {services.length > 0 ? services.map((disease : any) => (
                <p>{disease}</p>
              )) : <p>Sem serviços registrados</p>}
            </div>
          </div>
        </div>
        <div className='back-button'>
            <Link to="/ongs">
              <button>Voltar</button>
            </Link>
          </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
