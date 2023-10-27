import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useState, useEffect } from "react";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

import { Bar, Pie } from 'react-chartjs-2';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './style.css'
import 'leaflet/dist/leaflet.css'

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)


export function Animals() {
  const [animals, setAnimals] = useState<any>([]);
  const [animalsFilter, setAnimalsFilter] = useState<{ race: string; gender: string; species: string }>({
    race: '',
    gender: '',
    species: '',
  });

  const [animalsDataFilter, setAnimalsDataFilter] = useState<{ race: string; gender: string; specie: string, diseaseId: number, vaccineId: number }>({
    race: '',
    gender: '',
    specie: '',
    diseaseId: 0,
    vaccineId: 0,
  });

  const [diseases, setDisease] = useState<any>([]);
  const [vaccine, setVaccine] = useState<any>([]);

  const [filteredAnimal, setFilteredAnimal] = useState<any>([]);

  const [filteredData, setFilteredData] = useState<any>([]);
  const [vaccineData, setVaccineData] = useState<any>([]);
  const [diseaseData, setDiseaseData] = useState<any>([]);
  const [races, setRacesFilter] = useState<any>([]);

  const navigate = useNavigate();

  function proccessFilteredData(animais: any) {
    var filterData: any = [];
    animais.map((animal: any) => {
      filterData.push({
        name: animal.name,
        gender: animal.gender,
        lat: animal.latitudeLongitude.split(',')[0],
        long: animal.latitudeLongitude.split(',')[1],
        errant: animal.errant,
        specie: animal.species,
        race: animal.race,
        disease: animal.diseaseAnimals.map((disease: any) => {
          return disease.idDisease;
        }),
        vaccine: animal.vaccineAnimals.map((vaccine: any) => {
          return vaccine.idVaccine;
        })
      });
    });

    setFilteredData(filterData);
    return filterData;
  }

  function proccessVaccineData(vaccine: any, animais: any) {
    var vaccines = vaccine.map((v: any) => {
      return {
        id: v.id,
        vaccine: v.name,
        totalCat: 0,
        totalDog: 0
      }
    });

    vaccine.map((v: any, index: any) => {
      animais.map((animal: any) => {
        if (animal.vaccine) {
          animal.vaccine.forEach((av: any) => {
            if (av == v.id && animal.specie == "Cachorro") vaccines[index].totalDog = vaccines[index].totalDog + 1;
            if (av == v.id && animal.specie == "Gato") vaccines[index].totalCat = vaccines[index].totalCat + 1;
          });
        }
      })

    });

    setVaccineData(vaccines);
    return vaccines;
  }

  function proccessDiseaseData(disease: any, animais: any) {
    var diseasesData = disease.map((d: any) => {
      return {
        id: d.id,
        disease: d.name,
        totalCat: 0,
        totalDog: 0
      }
    });

    disease.map((d: any, index: any) => {
      animais.map((animal: any) => {
        if (animal.disease) {
          animal.disease.forEach((ad: any) => {
            if (ad == d.id && animal.specie == "Cachorro") diseasesData[index].totalDog = diseasesData[index].totalDog + 1;
            if (ad == d.id && animal.specie == "Gato") diseasesData[index].totalCat = diseasesData[index].totalCat + 1;
          });
        }
      })

    });

    setDiseaseData(diseasesData);
    return diseasesData;
  }

  function processRacesData(animais: any) {
    var aux: any = [];
    animais.map((animal: any) => {
      if (!aux.includes(animal.race)) {
        aux.push(animal.race);
      }
    });

    setRacesFilter(aux);
  }

  useEffect(() => {
    window.scroll(0, 0);

    const api = async () => {
      var data = await fetch(`${import.meta.env.VITE_API_URL}/Animal/all`, {
        method: "GET"
      });
      const animalResponse = await data.json();
      setAnimals(animalResponse);
      setFilteredAnimal(animalResponse);

      var data = await fetch(`${import.meta.env.VITE_API_URL}/Vaccine`, {
        method: "GET"
      });
      const vaccineResponse = await data.json();
      setVaccine(vaccineResponse);

      var data = await fetch(`${import.meta.env.VITE_API_URL}/Disease`, {
        method: "GET"
      });
      const diseaseResponse = await data.json();
      setDisease(diseaseResponse);

      const animais = await proccessFilteredData(animalResponse);
      processRacesData(animais);
      proccessVaccineData(vaccineResponse, animais);
      proccessDiseaseData(diseaseResponse, animais);
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

  const vaccineChartData = {
    labels: vaccine.map((v: any) => { return v.name }),
    datasets: [
      {
        label: 'Gato',
        data: vaccineData.map((v: any) => { return v.totalCat }),
        backgroundColor: '#E98676',
      },
      {
        label: 'Cachorro',
        data: vaccineData.map((v: any) => { return v.totalDog }),
        backgroundColor: '#252B5F',
      }
    ]
  }

  const diseaseChartData = {
    labels: diseases.map((v: any) => { return v.name }),
    datasets: [
      {
        label: 'Gato',
        data: diseaseData.map((v: any) => { return v.totalCat }),
        backgroundColor: '#E98676',
      },
      {
        label: 'Cachorro',
        data: diseaseData.map((v: any) => { return v.totalDog }),
        backgroundColor: '#252B5F',
      }
    ]
  }

  const options = {
    responsive: true
  }

  function animalsFilterHandler(e: any) {
    const { name, value } = e.target;
    setAnimalsFilter((prevAnimalsFilter) => ({
      ...prevAnimalsFilter,
      [name]: value,
    }));
  }

  useEffect(() => {
    const animaisFiltrados = animals.filter((animal: any) => {
      if (animalsFilter.race && animal.race !== animalsFilter.race) {
        return false;
      }
      if (animalsFilter.gender && animal.gender !== animalsFilter.gender) {
        return false;
      }
      if (animalsFilter.species && animal.species !== animalsFilter.species) {
        return false;
      }
      return true;
    });

    setFilteredAnimal(animaisFiltrados);
  }, [animalsFilter]);

  function animalsDataFilterHandler(e: any) {
    const { name, value } = e.target;
    setAnimalsDataFilter((prevAnimalsDataFilter) => ({
      ...prevAnimalsDataFilter,
      [name]: value,
    }));
  }

  useEffect(() => {
    const animaisFiltrados = animals.filter((animal: any) => {
      if (animalsDataFilter.race && animal.race !== animalsDataFilter.race) {
        return false;
      }
      if (animalsDataFilter.gender && animal.gender !== animalsDataFilter.gender) {
        return false;
      }
      if (animalsDataFilter.specie && animal.species !== animalsDataFilter.specie) {
        return false;
      }
      if (animalsDataFilter.diseaseId && !animal.diseaseAnimals.some((disease : any) => disease.idDisease == animalsDataFilter.diseaseId) ) {
        return false;
      }
      if (animalsDataFilter.vaccineId && !animal.vaccineAnimals.some((disease : any) => disease.idVaccine == animalsDataFilter.vaccineId) ) {
        return false;
      }
      return true;
    });

    const proccessedData = proccessFilteredData(animaisFiltrados);
    proccessVaccineData(vaccine, proccessedData)
    proccessDiseaseData(diseaseData, proccessedData)
  }, [animalsDataFilter]);

  function openAnimalPage(animal : any){
    navigate(`/animal/${animal.id}`, { state: {animal}})
  }

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
              <p>Especie</p>
              <select name="species" value={filteredAnimal.species} onChange={animalsFilterHandler}>
                <option value={''}>Todos</option>
                <option value={'Cachorro'}>Cachorro</option>
                <option value={'Gato'}>Gato</option>
              </select>
              <p>Sexo</p>
              <select name="gender" value={filteredAnimal.gender} onChange={animalsFilterHandler}>
                <option value={''}>Todos</option>
                <option value={'fêmea'}>fêmea</option>
                <option value={'macho'}>macho</option>
              </select>
              <p>Raça</p>
              <select name="race" value={filteredAnimal.race} onChange={animalsFilterHandler}>
                <option value={''}>Todos</option>
                {
                  races.map((r: any) => (
                    <option value={r}>{r}</option>
                  ))
                }
              </select>
            </div>
            <div className='select-section-container-content'>
              {
                filteredAnimal.map((animal: any) => (
                  <div className='content'  onClick={() => openAnimalPage(animal)}>
                    <span>{animal.name} - {animal.species} {animal.gender == "fêmea" ? "(F)" : "(M)"} - {animal.age} {animal.age > 1 ? "ANOS" : "ANO"}</span>
                    <img src='cross.png'/>
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
            <select name="specie" value={animalsDataFilter.specie} onChange={animalsDataFilterHandler}>
              <option value={''}>Todos</option>
              <option value={'Cachorro'}>Cachorro</option>
              <option value={'Gato'}>Gato</option>
            </select>
          </div>
          <div className='chart-map-fields'>
            <p>Sexo</p>
            <select name="gender" value={animalsDataFilter.gender} onChange={animalsDataFilterHandler}>
              <option value={''}>Todos</option>
              <option value={'fêmea'}>fêmea</option>
              <option value={'macho'}>macho</option>
            </select>
          </div>
          <div className='chart-map-fields'>
            <p>Raça</p>
            <select name="race" value={animalsDataFilter.race} onChange={animalsDataFilterHandler}>
              <option value={''}>Todos</option>
              {
                races.map((r: any) => (
                  <option value={r}>{r}</option>
                ))
              }
            </select>
          </div>
          <div className='chart-map-fields'>
            <p>Vacina</p>
            <select name="vaccineId" value={animalsDataFilter.vaccineId} onChange={animalsDataFilterHandler}>
              <option value={''}>Todas</option>
              {
                vaccine.map((v: any) => (
                  <option value={v.id}>{v.name}</option>
                ))
              }
            </select>
          </div>
          <div className='chart-map-fields'>
            <p>Doença</p>
            <select name="diseaseId" value={animalsDataFilter.diseaseId} onChange={animalsDataFilterHandler}>
              <option value={''}>Todas</option>
              {
                diseases.map((d: any) => (
                  <option value={d.id}>{d.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className='chart-map-container'>
          <div className='vacinne-map-chart-box'>
            <div className='vacine-chart-container'>
              <h3>Vacinas</h3>
              <Bar
                data={vaccineChartData}
                options={options}
                style={
                  {
                    maxHeight: '90%',
                    padding: '12px 30px 1px 30px'
                  }
                }
              >
              </Bar>
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
                  {filteredData.map((animal: any) => (
                    <Marker position={[animal.lat, animal.long]}
                      icon={animal.specie == "Gato" ? catIcon : dogIcon}
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
                  <p>{filteredData.length}</p>
                </div>
                <div className='status-count'>
                  <h3>Errantes</h3>
                  <img src='paw_1.png' />
                  <p>{filteredData.filter((animal: any) => animal.errant == true).length}</p>
                </div>
                <div className='status-count'>
                  <h3>Pet</h3>
                  <img src='paw_1.png' />
                  <p>{filteredData.filter((animal: any) => animal.errant != true).length}</p>
                </div>
              </div>
              <div className='disease-chart-container'>
                <h3>Doenças</h3>
                <Pie
                  data={diseaseChartData}
                  options={options}
                  style={
                    {
                      width: '80%',
                      height: '70%',
                      padding: '20px'
                    }
                  }
                >
                </Pie>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
