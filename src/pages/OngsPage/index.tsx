import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './style.css'
import 'leaflet/dist/leaflet.css'

export function Ongs() {
  const [ongs, setOngs] = useState<any>([]);
  const [services, setServices] = useState<any>([]);

  const [filteredOngs, setFilteredOngs] = useState<any>([]);
  const [filteredOngsMap, setFilteredOngsMap] = useState<any>([]);

  const navigate = useNavigate();

  function proccessServices(ongs : any){
    var serviceData : any = [];
    
    ongs.forEach((ong : any) => {
      let servs = ong.services.split(', ');
      servs.forEach((s: any) => {
        if(!serviceData.includes(s)){
          serviceData.push(s);
        }
      })
    });

    setServices(serviceData);
  }

  const icon = new Icon({
    iconUrl: "ong.png",
    iconSize: [55, 55]
  })

  useEffect(() => {
    window.scroll(0, 0);
    
    const api = async () => {
      var data = await fetch("https://localhost:7100/v1/Ngo", {
        method: "GET"
      });
      const ongResponse = await data.json();
      proccessServices(ongResponse);
      setOngs(ongResponse);
      setFilteredOngs(ongResponse);
      setFilteredOngsMap(ongResponse);
    };

    api();
  }, []);

  function getFilteredData(filter : string){
    return ongs.filter((ong : any) => ong.services.includes(filter));
  }

  function ongsFilterHandler(e: any) {
    const filteredData = getFilteredData(e.target.value);
    setFilteredOngs(filteredData);
  }

  function ongMapFilterHandler(e: any) {
    const filteredData = getFilteredData(e.target.value);
    console.log(filteredData);
    setFilteredOngsMap(filteredData);
  }

  function openOngPage(ong: any) {
    navigate(`/ong/${ong.id}`, { state: { ong } })
  }

  return (
    <div>
      <Header></Header>
      <div className='select-section-container-one'>
        <div className='animal-banner'>
          <img src='image_2.png' />
        </div>
        <div className='select-section'>
          <div className='select-section-title'>
            <h1>ONGS</h1>
            <img src='Vector_1.png' />
          </div>
          <div className='select-section-container'>
            <div className='select-section-container-filter'>
              <p>Serviços</p>
              <select name="race" onChange={ongsFilterHandler}>
                <option value={''}>Todos</option>
                {
                  services.map((r: any) => (
                    <option value={r}>{r}</option>
                  ))
                }
              </select>
            </div>
            <div className='select-section-container-content'>
              {
                filteredOngs.map((ong: any) => (
                  <div className='content' onClick={() => openOngPage(ong)}>
                    <span>{ong.name}</span>
                    <img src='cross.png' />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <div className='container-two'>
        <div className='chart-map-filter-ong'>
          <div className='chart-map-fields'>
            <p>Serviços</p>
            <select name="race" onChange={ongMapFilterHandler}>
              <option value={''}>Todos</option>
              {
                services.map((r: any) => (
                  <option value={r}>{r}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className='chart-map-container'>
          <div className='map-container-ong'>
            <MapContainer center={[-12.956796, -38.464535]} zoom={12} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup
                chunkedLoading
              >
                {filteredOngsMap.map((ong: any) => (
                  <Marker position={[ong.latitudeLongitude.split(',')[0], ong.latitudeLongitude.split(',')[1]]}
                  icon={icon}
                  >
                    <Popup>
                      {ong.name}
                    </Popup>
                  </Marker>
                ))

                }
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
