import React from 'react';
import '../Css/Profile.css';

const Profile = () => {
    

  
    return (
        <div className='profile-page'>
            <div className="profile-modal">
            <div className="modal-content">
                <div className="left-column">
                    <div className="profile-image">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" />
                    </div>
                </div>
                <div className="right-column">
                    <span>Profile<br/>Lopes</span>
                    <div className="profile-info">
                        <h3>Name:Ze Manel Lopes</h3>
                        <p>Email: oZemanel@gmail.com</p>
                    </div>
                    <button className="btn edit-button" onClick={() => window.location.href = "/editprofile"}><i className="animation"></i>Edit My Profile<i className="animation"></i></button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;
