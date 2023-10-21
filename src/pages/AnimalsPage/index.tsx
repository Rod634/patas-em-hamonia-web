import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useState, useEffect } from "react";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './style.css'
import 'leaflet/dist/leaflet.css'
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';

export function Animals() {
  const [animals, setAnimals] = useState([]);

  function getAnimalMapdata(data: any) {

  }

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://localhost:7100/v1/Animal/all", {
        method: "GET"
      });
      const jsonData = await data.json();
      console.log(jsonData);
      setAnimals(jsonData);
    };

    api();
  }, []);

  const dogIcon = new Icon({
    iconUrl: "dog_map.png",
    iconSize: [55, 55]
  })

  const catIcon = new Icon({
    iconUrl: "cat_map.png",
    iconSize: [55, 55]
  })

  return (
    <div>
      <Header></Header>
      <div className='select-section-container-one'>
        <div className='animal-banner'>
          <img src='image_4.png' />
        </div>
        <div className='select-section'>
          <div className='select-section-title'>
            <h1>Bixinhos</h1>
            <img src='Vector_1.png' />
          </div>
          <div className='select-section-container'>
            <div className='select-section-container-filter'>
              <p>Filtrar por</p>
              <select></select>
              <div className='value-filter'>
                <p>Valor</p>
                <select></select>
              </div>
            </div>
            <div className='select-section-container-content'>
              {
                animals.map((animal: any) => (
                  <div className='content'>
                    <span>{animal.name} - {animal.species} {animal.gender == "fêmea" ? "(F)" : "(M)"} - {animal.age} {animal.age > 1 ? "ANOS" : "ANO"}</span>
                    <img src='cross.png' />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <div className='container-two'>
        <div className='chart-map-filter'>
          <div className='chart-map-fields'>
            <p>Especie</p>
            <select></select>
          </div>
          <div className='chart-map-fields'>
            <p>Sexo</p>
            <select></select>
          </div>
          <div className='chart-map-fields'>
            <p>Raça</p>
            <select></select>
          </div>
        </div>
        <div className='chart-map-container'>
          <div className='vacinne-map-chart-box'>
            <div className='vacine-chart-container'>
              <h3>Vacinas</h3>
            </div>
            <div className='map-container'>
              <MapContainer center={[-12.956796, -38.464535]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup
                  chunkedLoading
                >
                  {animals.map((animal: any) => (
                    <Marker position={[animal.latitudeLongitude.split(',')[0], animal.latitudeLongitude.split(',')[1]]}
                      icon={animal.species == "Gato" ? catIcon : dogIcon}
                    >
                      <Popup>
                        {animal.name}
                      </Popup>
                    </Marker>
                  ))

                  }
                </MarkerClusterGroup>
              </MapContainer>
            </div>
          </div>
          <div className='chart-disease-status-box'>
            <div className='chart-status-container'>
              <div className='status-count-container'>
                <div className='status-count'>
                  <h3>Total</h3>
                  <img src='paw_1.png' />
                  <p>28</p>
                </div>
                <div className='status-count'>
                  <h3>Errantes</h3>
                  <img src='paw_1.png' />
                  <p>13</p>
                </div>
                <div className='status-count'>
                  <h3>Pet</h3>
                  <img src='paw_1.png' />
                  <p>20</p>
                </div>
              </div>
              <div className='disease-chart-container'>
                <h3>Doenças</h3>
              </div>
              <div className='date-chart-container'>
                <div className='date-chart'>
                  21/03/2023
                </div>
                <div className='chart-info'>
                  <h3>Atualizações</h3>
                  <p>Esses dados estão sendo atualizados em tempo real.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
