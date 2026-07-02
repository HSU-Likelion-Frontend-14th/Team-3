import { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import markerIcon from "./assets/markerIcon.svg";
import "./App.css";

function App() {
  const [center, setCenter] = useState({ lat: 37.582, lng: 127.011 });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("위치 정보를 가져오는데 실패했습니다.", error);
        }
      );
    }
  }, []);


  const handleMapClick = (_target, mouseEvent) => {
    const newMarker = {
      id: Date.now(),
      position: {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
      isOpen: true, 
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  const handleMarkerClick = (markerId) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId ? { ...marker, isOpen: !marker.isOpen } : marker
      )
    );
  };

  return (
    <div className="container">
      <Map
        center={center}
        style={{ width: "100%", height: "800px" }}
        level={3}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <div key={marker.id}>
            <MapMarker
              position={marker.position}
              onClick={() => handleMarkerClick(marker.id)}
              image={{
                src: markerIcon,
                size: {
                  width: 32, 
                  height: 35,
                },
              }}
            />

            {marker.isOpen && (
              <CustomOverlayMap position={marker.position} yAnchor={1.5}>
                <div className="custom-overlay">
                  <span className="overlay-title">
                    📍 {index + 1}번째 마커입니다
                  </span>
                  <span
                    className="overlay-close"
                    onClick={() => handleMarkerClick(marker.id)}
                    title="닫기"
                  >
                    ✕
                  </span>
                </div>
              </CustomOverlayMap>
            )}
          </div>
        ))}
      </Map>
    </div>
  );
}

export default App;