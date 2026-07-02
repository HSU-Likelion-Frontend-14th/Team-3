import { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import markerIcon from "../assets/markerIcon.svg";
import "./App.scss";

function App() {
  const [center, setCenter] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  const [markers, setMarkers] = useState([]);
  const [openMarkerId, setOpenMarkerId] = useState(null);

  const [editingMarkerId, setEditingMarkerId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log("현재 위치를 가져오지 못했습니다.", error);
      }
    );
  }, []);

  const handleMapClick = (_target, mouseEvent) => {
    if (editingMarkerId !== null) {
      setWarningMessage(
        "마커 제목 수정 중에는 새로운 마커를 추가할 수 없습니다."
      );

      setTimeout(() => {
        setWarningMessage("");
      }, 800);

      return;
    }

    const latlng = mouseEvent.latLng;

    const newMarker = {
      id: Date.now(),
      lat: latlng.getLat(),
      lng: latlng.getLng(),
      title: `마커 ${markers.length + 1}`,
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  const handleDeleteMarker = (markerId) => {
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.id !== markerId)
    );

    setOpenMarkerId(null);
  };

  const startEditTitle = (marker) => {
    setEditingMarkerId(marker.id);
    setEditingText(marker.title);
  };

  const saveEditTitle = (markerId) => {
    const nextTitle = editingText.trim();

    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId
          ? {
              ...marker,
              title: nextTitle === "" ? marker.title : nextTitle,
            }
          : marker
      )
    );

    setEditingMarkerId(null);
    setEditingText("");
  };

  const cancelEditTitle = () => {
    setEditingMarkerId(null);
    setEditingText("");
  };

  return (
    <div className="app">
      <h1>카카오맵 마커 등록</h1>
      <p>지도를 클릭하면 해당 위치에 마커가 생성됩니다.</p>

      {warningMessage && <p className="warning-message">{warningMessage}</p>}

      <Map
        center={center}
        level={4}
        className="map"
        onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <div key={marker.id}>
            <MapMarker
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              image={{
                src: markerIcon,
                size: {
                  width: 40,
                  height: 40,
                },
                options: {
                  offset: {
                    x: 20,
                    y: 40,
                  },
                },
              }}
              onClick={() => {
                setOpenMarkerId(marker.id);
              }}
            />

            {openMarkerId === marker.id && (
              <CustomOverlayMap
                position={{
                  lat: marker.lat,
                  lng: marker.lng,
                }}
                yAnchor={1.35}
              >
                <div
                  className="overlay"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {editingMarkerId === marker.id ? (
                    <div className="title-edit-box">
                      <input
                        value={editingText}
                        autoFocus
                        onChange={(e) => {
                          setEditingText(e.target.value);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            saveEditTitle(marker.id);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <strong
                      className="marker-title"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditTitle(marker);
                      }}
                    >
                      {marker.title}
                    </strong>
                  )}

                  <p>
                    위도: {marker.lat.toFixed(4)}
                    <br />
                    경도: {marker.lng.toFixed(4)}
                  </p>

                  <button
                    type="button"
                    className="close"
                    onClick={(e) => {
                      e.stopPropagation();

                      if (editingMarkerId === marker.id) {
                        saveEditTitle(marker.id);
                      } else {
                        setOpenMarkerId(null);
                      }
                    }}
                  >
                    {editingMarkerId === marker.id ? "저장" : "닫기"}
                  </button>

                  <button
                    type="button"
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation();

                      if (editingMarkerId === marker.id) {
                        cancelEditTitle();
                      } else {
                        handleDeleteMarker(marker.id);
                      }
                    }}
                  >
                    {editingMarkerId === marker.id ? "취소" : "삭제"}
                  </button>
                </div>
              </CustomOverlayMap>
            )}
          </div>
        ))}
      </Map>

      <p className="count">등록된 마커 수: {markers.length}</p>
    </div>
  );
}

export default App;