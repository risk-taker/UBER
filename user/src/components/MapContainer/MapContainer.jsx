import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";

export default function MapContainer({ center, children }) {
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };
  const {isLoaded, loadError} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: ['places']
  })

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        {children}
      </GoogleMap>
    </LoadScript>
  );
}
