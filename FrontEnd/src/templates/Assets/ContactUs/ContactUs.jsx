import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ref, set } from 'firebase/database';
import { database } from '../Auth/firebase';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
  const navigate = useNavigate();
  const name = Cookies.get('displayName');
  const email = Cookies.get('Email');

  const [wantReply, setWantReply] = useState(false);
  const [message, setMessage] = useState("");

  const getUserIdFromEmail = () => {
    const email = Cookies.get('Email');
    return email ? email.split('@')[0] : null;
  };

  useEffect(() => {
    if (!name && !email) {
      alert('There was a problem with your email.')
      navigate('/')
    }

  },[name, email])


  const userId = getUserIdFromEmail();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = ref(database, `Users/${userId}/Contact`);
    console.log([name, email, !!wantReply, message])
    const data = [
      {
        "name": name,
        "email": email,
        "Want reply": wantReply,
        "Message": message
      }
    ];

    await set(userRef, data);
    alert('Thanks for contacting us!')
    navigate('/')
  };

  return (
    <div className='body-div'>
      <div className="contact-content container py-3">
        <div className="contact-div">
          <h2 className="text-light mb-4 inria-sans-regular">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="text-light inria-sans-light">Name:</label>
              <input
                type="text"
                value={name}
                readOnly
                className="form-control custom-input read-only-input"
              />
            </div>

            <div className="form-group mb-3">
              <label className="text-light inria-sans-light">Email:</label>
              <input
                type="email"
                value={email}
                readOnly
                className="form-control custom-input read-only-input"
              />
            </div>

            <div className="form-group form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={wantReply}
                onChange={() => setWantReply(!wantReply)}
              />
              <label className="form-check-label text-light inria-sans-light">
                Want to receive a reply?
              </label>
            </div>

            <div className="form-group mb-3">
              <label className="text-light inria-sans-light">Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                className="form-control custom-input"
                placeholder="Write your message here."
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
