import React, { useEffect, useState } from "react";
import '../Css/Cards.css';
import foto from '../pc_pic_room.png';




const Card = ({ item }) => {

    return (
        <div className={`card`}>
            <div className="product-tumb">
                <img src={foto} className="Item-foto" alt="foto" />
            </div>
            <div className="product-details">
                <h4>Air Conditioning</h4>
            </div>
        </div>
    
    );
};

export default Card;
