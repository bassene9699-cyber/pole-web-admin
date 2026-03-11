import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32]
});

const yellowIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  iconSize: [32, 32]
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32]
});


const InstallationsMap = ({ installations }) => {

  const defaultCenter = [14.7167, -17.4677]; // Dakar

  const getIcon = (status) => {

    if (status === "VALIDATED") return greenIcon;

    if (status === "REJECTED") return redIcon;

    return yellowIcon;

  };


  const validInstallations = installations.filter(
    (i) => i.latitude && i.longitude
  );

  const center =
    validInstallations.length > 0
      ? [validInstallations[0].latitude, validInstallations[0].longitude]
      : defaultCenter;


  return (

    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validInstallations.map((inst) => (

        <Marker
          key={inst.id}
          position={[inst.latitude, inst.longitude]}
          icon={getIcon(inst.validation_status)}
        >

          <Popup>

            <b>Pole:</b> {inst.pole_reference}

            <br />

            <b>Worker:</b> {inst.installed_by}

            <br />

            <b>Network:</b> {inst.network_type}

            <br />

            <b>Status:</b> {inst.validation_status}

            <br />

            <b>Date:</b>{" "}
            {new Date(inst.created_at).toLocaleString()}

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );

};

export default InstallationsMap;