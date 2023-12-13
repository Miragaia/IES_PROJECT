import React, { useEffect, useState } from 'react';
import "../Css/DetailDevice.css";
import { useParams } from 'react-router-dom';
import foto from '../extrator.jpg';



const DetailDevice = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [reviews,setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);


  useEffect(() => {
    setLoading(true);
  
    fetch(`http://localhost:5000/api/detailproduct/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
  
        fetch(`http://localhost:5000/api/productreviews/${id}`)
          .then(response => response.json())
          .then(reviewsData => {
            setReviews(reviewsData)
            setLoading(false);
         
          })
          .catch(error => {
            console.error('Erro ao buscar as avaliações do produto:', error);
          });
      })
      .catch(error => {
        console.error('Erro ao buscar dados do produto:', error);
        setLoading(false);
      });
  }, [id]);

  
  return (
    <div className="DetailProductPage">
      <h2 className='detailproduct-title'>Detailed Product</h2>
        <div className="productdetail-container">
          <div className="productdetail-card">
            
              <div className="left-detail">
                <img src={foto} alt="foto" className="detailproduct-image"/>
              </div>
              <div className="right-detail">
                <h2>{product.nome}</h2>
                <h4>Tipo: {product.tipo}</h4>
                <p>Descrição: {product.descricao}</p>
                <p>Tamanho: {product.tamanho || 'N/A'}</p>
                <h4>Stock: {product.Nstock}</h4>
                <h3>Preço: {product.preco} €</h3>
              </div>
           </div>
        </div>
    </div>
  );
};

export default DetailDevice;
