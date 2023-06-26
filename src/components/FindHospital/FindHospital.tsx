import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import "../../pages/FindHospitalPage/findhospital.css";
const baseUrl = import.meta.env.VITE_BASE_URL;
declare global {
  interface Window {
    google: any;
  }
}

const FindHospital: React.FunctionComponent = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState([]);
  let [key, setKey] = useState("");
  key = `${latitude}-${longitude}`;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    setSearchText(place.formatted_address || "");
    if (place.geometry?.location) {
      setLatitude(place.geometry?.location.lat() || null);
      setLongitude(place.geometry?.location.lng() || null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchText
        )}&key=AIzaSyA_FWm2do5lg__cJVuXI3czq7EKE-2a8SI`
      )
      .then((response) => {
        const { results } = response.data;
        if (results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;

          setLatitude(lat);
          setLongitude(lng);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Make a request to the Google Maps Geocoding API
  };

  // Initialize the Google Autocomplete service
  const initAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete") as HTMLInputElement,
      { types: ["geocode"] }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      handlePlaceSelect(place);
    });
  };
  const fetchPlaces = async () => {
    try {
      const radius = "200";
      const type = "hospital";
      const apiKey = "AIzaSyA_FWm2do5lg__cJVuXI3czq7EKE-2a8SI";
      const url = `${baseUrl}/maps?query=${searchText}&radius=${radius}&type=${type}&key=${apiKey}&longitude=${longitude}&latitude=${latitude}`;
      const response = await fetch(url);
      const data = await response.json();
      const maps = data.results;
      setPlaces(maps);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    loadGooglePlacesLibrary();
    fetchPlaces();
    setLatitude(latitude);
    setLongitude(longitude);
    setKey(key);
  }, [longitude, latitude, google]);

  const loadGooglePlacesLibrary = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_FWm2do5lg__cJVuXI3czq7EKE-2a8SI&libraries=places`;
    script.onload = initAutocomplete;
    document.head.appendChild(script);
  };
  return (
    <FindHospitalContainer>
      <div className="FindHospital_container">
        <form onSubmit={handleSubmit} className="hospital_form">
          <input
            id="autocomplete"
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search Hospitals"
          />
          <br />
        </form>
        <div className="hospital_details">
          <div className="hospital_nearby">
            {longitude &&
              latitude &&
              places !== undefined &&
              places.map((maps: any, index) => (
                <div key={index} className="hospital_map">
                  {maps && (
                    <div className="hospital_address">
                      {maps.geometry.location.lat !== undefined &&
                        maps.geometry.location.lng && (
                          <Map
                            google={google}
                            zoom={14}
                            style={{
                              width: "19rem",
                              height: "9rem",
                              position: "relative",
                              display: "block",
                              borderRadius: "16px",
                              marginBottom: "3rem",
                            }}
                            initialCenter={{
                              lat: maps.geometry.location.lat,
                              lng: maps.geometry.location.lng,
                            }}
                          />
                        )}
                      <div className="hospital_information">
                        <h4>{maps.name}</h4>
                        <p>Address: {maps.formatted_address}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </FindHospitalContainer>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyA_FWm2do5lg__cJVuXI3czq7EKE-2a8SI",
})(FindHospital);

const FindHospitalContainer = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  font-size: 50px;
  height: 100vh;
  background-color: #f6f6f6;
`;
