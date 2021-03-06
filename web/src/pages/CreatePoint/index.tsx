import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Uf {
  sigla: string;
}

interface City {
  nome: string;
}

const CreatePoint = () => {

  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })

  const [selectedUf, setSelectedUf] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setinitialPosition([latitude, longitude]);
    })
  }, [])

  useEffect(() => {
    api.get('items').then((response) => {
      setItems(response.data);
    })
  }, []);

  useEffect(() => {
    axios.get<Uf[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then((response) => {
      const ufInitials = response.data.map((uf) => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    axios.get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then((response) => {      
      const cityNames = response.data.map((city) => city.nome);

      setCities(cityNames);
    });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    setFormData({ ...formData, [name]: value });
    console.log(formData);
  }

  function handleSelectItem(itemId: number) {
    if(selectedItems.includes(itemId)) {
      const filteredItems = selectedItems.filter((item) => item !== itemId);

      setSelectedItems(filteredItems);
    }
    else {
      setSelectedItems([...selectedItems, itemId]);
    }    
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = new FormData();
    
    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', items.join(','));
    
    if(selectedFile) {
      data.append('image', selectedFile);
    }

    await api.post('points', data);

    alert('Collection point created!');

    history.push('/');
  }

  return (
    <div id="page-create-point">
    <header>
    <h3>Eco-TUNISIA </h3>

      <Link to="/">
        <FiArrowLeft />
        Return
      </Link>
    </header>

    <form onSubmit={handleSubmit}>
      
      <h1>Registration of<br/> collection points</h1>
      
      <Dropzone onFileUploaded={setSelectedFile} />

      <fieldset>
        <legend>
          <h2>Information</h2>
        </legend>

        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleInputChange}/>
        </div>

        <div className="field-group">
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" onChange={handleInputChange}/>
          </div>

          <div className="field">
            <label htmlFor="whatsapp">Phone number</label>
            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <h2>Address</h2>
          <span>Select the address on the map</span>
        </legend>

        <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={selectedPosition}/>
        </Map>

       <div className="field-group">
          <div className="field">
            <label htmlFor="uf">State</label>
            <select name="uf" id="uf" value={selectedUf}  onChange={handleSelectUf}>
              {ufs.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="city">City</label>
            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
              <option value="0">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <h2>Collection Items</h2>
          <span>Select one or more items below</span>
        </legend>

        <ul className="items-grid">
          {items.map((item) => (
            <li 
              key={item.id} 
              onClick={() => handleSelectItem(item.id)}
              className={selectedItems.includes(item.id) ? 'selected' : ''}
            >
              <img src={item.image_url} alt="Icon"/>
             {/*  <span>{item.title}</span>*/}
            </li>
          ))}
        </ul>
      </fieldset>

      <button type="submit">Send</button>

    </form>
  </div>
)
}

export default CreatePoint;