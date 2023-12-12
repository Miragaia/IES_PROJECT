import React, { useEffect, useState } from "react";
import '../Css/Cards.css';
import foto from '../extrator.jpg';
import TEMPERATURE from '../photos/sensor_temperatura.webp';
import HUMIDITY from '../photos/sensor_humidade.webp';
import SMOKE from '../photos/sensor_fumo.jpeg';

import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'

const CardDevices = ({ item }) => {

    const [deviceId, setDeviceId] = useState(null);

    let categoryImage;
  
    // Lógica para selecionar a imagem com base na categoria
    switch (item.category) {
      case 'TEMPERATURE':
        categoryImage = TEMPERATURE;
        break;
      case 'HUMIDITY':
        categoryImage = HUMIDITY;
        break;
      case 'SMOKE':
        categoryImage = SMOKE;
        break;
      default:
        // Se a categoria não for reconhecida, use uma imagem padrão
        categoryImage = foto;
    }
  
    // Atualiza o estado do deviceID quando necessário
    const handleDeviceIdClick = () => {
      setDeviceId(item.deviceId);
    };
    return (
        <div className={`card`}>
            <div className="product-tumb">
                <img src={categoryImage} className="Item-foto" alt="foto" />
            </div>
            <div className="product-details">
                <h4>
                    {/*<Link  to={`/detailproduct/${editedItem.id}`}>
                        {editedItem.nome}
                    </Link>*/}
                    <Link  to={`/detail_device`}>
                        {item.name}
                    </Link>
                </h4>
            </div>
        </div>
    
    );
};

export default CardDevices;
