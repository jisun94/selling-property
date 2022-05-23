import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    };

    getLandlord();
  }, [params.landlordId]);

  const onChange = (e) => setMessage(e.target.value);
  return (
    <div className="page-container">
      <header>
        <p className="page-header">Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contact-landlord">
            <p className="landlord-name">Contact {landlord?.name}</p>
          </div>

          <form className="message-form">
            <div className="message-div">
              <label className="message-label" htmlFor="message">
                Message
              </label>
              <textarea
                className="textarea"
                id="message"
                value={message}
                onChange={onChange}
                name="mesage"
              ></textarea>
            </div>

            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primary-button">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
