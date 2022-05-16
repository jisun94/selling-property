import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner";

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Max 6 images");
      return;
    }

    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(`
      https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=`);

      const data = await response.json();

      geolocation.lat = data.results[0]?.getometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.getometry.location.lng ?? 0;

      location =
        data.status === "ZERO_RESULT"
          ? undefined
          : data.result[0]?.formatted_address;

      if (location === undefined || location.includes("undefined")) {
        setLoading(false);
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
      location = address;
    }

    setLoading(false);
  };

  const onMutate = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    //Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    //Text , Booleans , Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile">
      <header>
        <p className="page-header">Create a Listing</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label className="form-label">Sell / Rent </label>
          <div className="form-buttons">
            <button
              className={type === "sale" ? "form-button-active" : "form-button"}
              id="type"
              value="sale"
              onClick={onMutate}
              type="button"
            >
              Sell
            </button>
            <button
              className={type === "rent" ? "form-button-active" : "form-button"}
              id="type"
              value="rent"
              onClick={onMutate}
              type="button"
            >
              Rent
            </button>
          </div>

          <label className="form-label">Name</label>
          <input
            className="form-input-name"
            id="name"
            type="text"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="10"
            required
          />

          <div className="formRooms flex">
            <div>
              <label className="form-label">Bedrooms</label>
              <input
                className="form-input-small"
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
            <div>
              <label className="form-label">Bathrooms</label>
              <input
                className="form-input-small"
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <div className="form-label">Parking spot</div>
          <div className="form-buttons">
            <button
              className={parking ? "form-button-active" : "form-button"}
              type="button"
              id="parking"
              value={true}
              onClick={onMutate}
              min="1"
              max="50"
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null
                  ? "form-button-active"
                  : "form-button"
              }
              type="button"
              id="parking"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="form-label">Furnished</label>
          <div className="form-buttons">
            <button
              className={furnished ? "form-button-active" : "form-button"}
              type="button"
              id="furnished"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? "form-button-active"
                  : "form-button"
              }
              type="button"
              id="furnished"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="form-label">Address</label>
          <textarea
            className="form-input-address"
            type="text"
            id="address"
            value={address}
            onChange={onMutate}
            required
          />

          {!geolocationEnabled && (
            <div className="form-lat-lng flex">
              <div>
                <label className="form-label">Latitude</label>
                <input
                  className="form-input-small"
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className="form-label">Longitude</label>
                <input
                  className="form-input-small"
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}

          <label className="form-label">Offer</label>
          <div className="form-buttons">
            <button
              className={offer ? "form-button-active" : "form-button"}
              type="button"
              id="offer"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? "form-button-active" : "form-button"
              }
              type="button"
              id="offer"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="form-label">Regular Price</label>
          <div className="form-price-div">
            <input
              className="form-input-small"
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required
            />
            {type === "rent" && <p className="form-price-text">$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className="form-label">Discounted Price</label>
              <input
                className="form-input-small"
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onMutate}
                min="50"
                max="750000000"
                required={offer}
              />
            </>
          )}

          <label className="form-label">Images</label>
          <p className="images-info">
            The first image will be the cover (max 6).
          </p>
          <input
            className="form-input-file"
            type="file"
            id="images"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <button
            type="submit"
            className="primary-button create-listing-button"
          >
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
