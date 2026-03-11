import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const InstallationsMap = ({ installations }) => {

  const center = [14.7167, -17.4677]; // Dakar par défaut

  return (

    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {installations.map((inst) => (

        <Marker
          key={inst.id}
          position={[inst.latitude, inst.longitude]}
        >

          <Popup>

            <b>{inst.pole_reference}</b>
            <br />

            Worker: {inst.installed_by}
            <br />

            Network: {inst.network_type}

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );

};

export default InstallationsMap;