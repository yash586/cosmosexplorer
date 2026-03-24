import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import styles from './EventMap.module.css';

delete L.Icon.Default.prototype._getIconUrl; //
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/**
 * MapUpdater flies to new coordinates when event changes
 * Must be inside MapContainer to access useMap hook
 * @param {Array} position [lat, lng]
 * @param {boolean} hasCoords whether valid coords exist
 */
const MapUpdater = ({ position, hasCoords }) => {
  const map = useMap();
  useEffect(() => {
    if (hasCoords) {
      map.flyTo(position, 6, {
        animate:  true,
        duration: 1.2,
      });
    } else {
      map.flyTo([20, 0], 2, {
        animate:  true,
        duration: 1.2,
      });
    }
  }, [position[0], position[1]]);
  return null;
};

/**
 * Event Map interactive Leaflet map for EONET events
 * Shows event location with coloured circle marker
 * Falls back to world view if no coordinates
 * @param {Array|null} coordinates [longitude, latitude] from EONET
 * @param {string} color Hex color for circle marker
 * @returns {JSX.Element} Leaflet map
 */
const EventMap = ({ coordinates, color }) => {
  const hasCoords = coordinates && coordinates.length >= 2;
  const lat = hasCoords ? coordinates[1] : 20;
  const lng = hasCoords ? coordinates[0] : 0;
  const position = [lat, lng];

  return (
    <MapContainer
      center={position}
      zoom={hasCoords ? 6 : 2}
      className={styles.eventMap}
      zoomControl={true}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
      />
      {<MapUpdater position={position} hasCoords={hasCoords}/>}
      {hasCoords && (
        <>
          <Circle
            center={position}
            radius={50000}
            pathOptions={{
              color,
              fillColor:   color,
              fillOpacity: 0.2,
              weight:      2,
            }}
          />
          <Marker position={position}>
            <Popup />
          </Marker>
        </>
      )}
    </MapContainer>
  );
};

export default EventMap;