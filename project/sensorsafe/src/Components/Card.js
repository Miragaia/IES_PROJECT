import React, { useEffect, useState } from "react";
import '../Css/Cards.css';
import foto from '../extrator.jpg';

import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'



const Card = ({ item }) => {

    return (
        <div className={`card`}>
            <div className="product-tumb">
                <img src={foto} className="Item-foto" alt="foto" />
            </div>
            <div className="product-details">
                <h4>
                    {/*<Link  to={`/detailproduct/${editedItem.id}`}>
                        {editedItem.nome}
                    </Link>*/}
                    <Link  to={`/detail_device`}>
                        Air Conditioning
                    </Link>
                </h4>
            </div>
        </div>
    
    );
};

export default Card;
