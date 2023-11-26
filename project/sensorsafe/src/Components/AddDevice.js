import React, {useState, useEffect} from 'react';
import '../Css/AddDevice.css';
import { useNavigate } from 'react-router-dom';


function AddDevice() {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
      };

    const [productData, setProductData] = useState({
        foto_url: null,
        name: '',
        description: '',
        category: '',
      });

      useEffect(() => {
        console.log(productData); // Isso irá mostrar o valor atualizado de foto_url
      }, [productData]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
      };

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductData({ ...productData, foto_url: file });

      };
    
      const handleAddItem = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('foto_url', productData.foto_url);
        formData.append('description', productData.description);
        formData.append('category', productData.category);
      
        try {
          const response = await fetch('http://localhost:5000/api/insertitems', {
            method: 'POST',
            body: formData,
          });
      
          if (response.status === 200) {
            console.log('Item adicionado com sucesso');
            document.body.classList.add('modal-open');
            const successModal = document.getElementById("success-modal");
            successModal.style.display = "block";
  
            
            setTimeout(() => {
                
                document.body.classList.remove('modal-open');
                navigate('/devices');
            }, 3000);
          } else {
            console.error('Erro ao adicionar o item');
          }
        } catch (error) {
          console.error('Erro ao adicionar o item:', error);
        }
      };


    return (
        <div className='additem-page'>
        <div className='additem-modal'>
          <h3>Add an Device</h3>
          <form onSubmit={handleAddItem} encType="multipart/form-data">
            <div className='form-group-item'>
              <label htmlFor='foto_url'>Foto URL:</label>
              <input
                type='file'
                name='foto_url'
                onChange={handleFileChange}
                required 
                />
            </div>
            <div className='form-group-item'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                name='name'
                value={productData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='form-group-item'>
                <label htmlFor='description'>Description:</label>
                <textarea
                    id='description'
                    name='description'
                    value={productData.description}
                    onChange={handleInputChange}
                    rows='6'
                    cols='54'
                    required
                ></textarea>
            </div>

            <div className='category-selection'>
                <h2>Select Category</h2>
                <div className='category-options'>
                    <span className={`category-option ${selectedCategory === 'Smoke' ? 'active' : ''}`} onClick={() => handleCategoryClick('Smoke')}>Smoke</span>
                    <span className={`category-option ${selectedCategory === 'Humidity' ? 'active' : ''}`} onClick={() => handleCategoryClick('Humidity')}>Humidity</span>
                    <span className={`category-option ${selectedCategory === 'Temperature' ? 'active' : ''}`} onClick={() => handleCategoryClick('Temperature')}>Temperature</span>
                    <span className={`category-option ${selectedCategory === 'Others' ? 'active' : ''}`} onClick={() => handleCategoryClick('Others')}>Others</span>
                </div>
            </div>
            <button className='btn edit-button additem' type='submit'><i className="animation"></i>Add device<i className="animation"></i></button>
          </form>
        </div>
        <div className="info-saved-modal" id="success-modal" style={{ display: 'none' }}>
              <p>Device added</p>
          </div>
      </div>
    );
}

export default AddDevice;
