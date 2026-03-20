import { MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './EventMap.css';

delete L.Icon.Default.prototype._getIonUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const EventMap = ({coordinates, title, color, icon}) => {
  const hasCoords = coordinates && coordinates.length >= 2;
  const lat = hasCoords ? coordinates[1] : 20;
  const lng = hasCoords ? coordinates[0] : 0;
  const position = [lat, lng];

  return (
    <MapContainer center={position} zoom={hasCoords ? 6 :2} className='event_map' zoomControl={true} scrollWheelZoom={true}>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
      />
      {hasCoords && (
        <>
        <Circle
            center={position}
            radius={50000}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.2,
              weight: 2,
            }}
          />
          <Marker position={position}>
            <Popup>
              <span>{icon} {title}</span>
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  )
};

export default EventMap;