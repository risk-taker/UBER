import React, { use, useRef } from "react";

const App = () => {
  function handleCalculateRoute() {
    if (!origin || !destination) {
      return;
    }
  
    const directionsService = new google.maps.DirectionsService();
  
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);   // ✅ correct
          console.log(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }
  

  const ref = useRef();

  useEffect(() => {
    console.log("first rendering...");
    ref.current.style.background = "blue";
  }, []);

  return (
    <div>
      <button ref={ref}>Increase</button>
    </div>
  );
};

export default App;
