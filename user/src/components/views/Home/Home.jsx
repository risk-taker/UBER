import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../shared/Navbar";
import homeIcon from "../../../assets/images/home.png";
import locationIcon from "../../../assets/images/location.png";
import classes from "./home.module.scss";
import startPin from "../../../assets/images/map-pin.png";
import endPin from "../../../assets/images/circle.png";
import {
  // DirectionsService,
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

const Home = () => {
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const [originLatLng, setOriginLatLng] = useState(null);
  const [destinationLatLng, setDestinationLatLng] = useState(null);

  const [map, setMap] = React.useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);

  const containerStyle = {
    width: "700px",
    height: "700px",
  };

  const center = {
    lat: 22.577152,
    lng: 88.4506624,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  function handleCalculateRoute(e) {
    console.log("Calculating route...");
    if (!originLatLng || !destinationLatLng || !map) {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: originLatLng,
        destination: destinationLatLng,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          map.fitBounds(result.routes[0].bounds);
          console.log(result);
        } else {
          console.error(`Directions request failed: ${result}`);
        }
      }
    );
  }

  useEffect(() => {
    if (!isLoaded) return;

    const originAutocomplete = new window.google.maps.places.Autocomplete(
      originRef.current,
      {
        types: ["geocode"],
      }
    );

    const destinationAutocomplete = new window.google.maps.places.Autocomplete(
      destinationRef.current,
      {
        types: ["geocode"],
      }
    );

    originAutocomplete.addListener("place_changed", () => {
      const place = originAutocomplete.getPlace();
      if (!place.geometry) return;

      console.log(place);
      setOrigin(place.formatted_address);
      setOriginLatLng({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });

    destinationAutocomplete.addListener("place_changed", () => {
      const place = destinationAutocomplete.getPlace();
      if (!place.geometry) return;

      setDestination(place.formatted_address);
      setDestinationLatLng({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  }, [isLoaded]);
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes["journey-details"]}>
          <h4 style={{ marginTop: 32 }}>Route Details</h4>
          <div>
            <div className={classes.card}>
              <div className={classes.addressPin}>
                <img style={{ width: 16 }} src={startPin} alt="start-pin" />
                <span>|</span>
                <img style={{ width: 12 }} src={endPin} alt="end-pin" />
              </div>
              <div>
                {/* Origin */}
                <div className={classes.address}>
                  <input
                    style={{ border: "none", outline: "none" }}
                    type="text"
                    name="start-address"
                    // value={"123, Baker st, NYC"}
                    ref={originRef}
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Enter pickup location"
                  />
                  <img
                    style={{ fontSize: 16, width: 16, marginLeft: 8 }}
                    src={homeIcon}
                    alt="home-icon"
                  />
                </div>
                {/* Destination */}
                <div className={classes.address}>
                  <input
                    style={{ border: "none", outline: "none" }}
                    type="text"
                    name="start-address"
                    // value={"324, Beacon st, NYC"}
                    ref={destinationRef}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                  />
                  <img
                    style={{ fontSize: 16, width: 16 }}
                    src={locationIcon}
                    alt="loc0ation-icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <h4 style={{ marginTop: 24 }}>Choose Class</h4>
          <div className={classes.chooseCard} style={{ marginTop: 32 }}>
            <p>Business</p>
            <p>$15</p>
          </div>
          <div className={classes.chooseCard}>
            <p>Standard</p>
            <p>$22</p>
          </div>
          <div className={classes.chooseCard}>
            <p>Premium</p>
            <p>$30</p>
          </div>
          <button
            className={classes["confirm-btn"]}
            onClick={handleCalculateRoute}
          >
            Confirm Order
          </button>
          <button className={classes["cancel-btn"]}>Cancel Order</button>
        </div>
        <div>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {/* Child components, such as markers, info windows, etc. */}
              {/* Origin Marker */}
              {originLatLng && <Marker position={originLatLng} />}

              {/* Destination Marker */}
              {destinationLatLng && <Marker position={destinationLatLng} />}

              {/* Route */}
              {directions && <DirectionsRenderer directions={directions} />}
              <></>
            </GoogleMap>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
