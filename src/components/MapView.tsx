import React, { useEffect, useState } from 'react';

interface Advisor {
  id: string;
  name: string;
  office: string;
  city: string;
  location: [number, number];
}

interface MapViewProps {
  advisors: Advisor[];
  center: [number, number];
  selectedAdvisor: Advisor | null;
  onAdvisorClick: (advisor: Advisor) => void;
}

const MapView: React.FC<MapViewProps> = ({ advisors, center, selectedAdvisor, onAdvisorClick }) => {
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-leaflet'),
        import('leaflet'),
        import('leaflet/dist/leaflet.css')
      ]).then(([reactLeaflet, leaflet]) => {
        const L = leaflet.default;
        
        // Fix for default marker icon
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
        
        setMapContainer(() => reactLeaflet.MapContainer);
        setTileLayer(() => reactLeaflet.TileLayer);
        setMarker(() => reactLeaflet.Marker);
        setPopup(() => reactLeaflet.Popup);
        setIsReady(true);
      }).catch((err) => {
        console.error('Failed to load map components:', err);
      });
    }
  }, []);

  if (!isReady || !MapContainer) {
    return (
      <div className="h-full flex items-center justify-center bg-fundax-lightGray">
        <p className="text-fundax-grayText">Memuat peta...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={selectedAdvisor ? 15 : 5}
      style={{ height: '100%', width: '100%', borderRadius: '0 0 8px 8px' }}
      key={selectedAdvisor?.id || 'default'}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {advisors.map(advisor => (
        <Marker
          key={advisor.id}
          position={advisor.location}
          eventHandlers={{
            click: () => onAdvisorClick(advisor),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-fundax-blue">{advisor.name}</h3>
              <p className="text-sm text-gray-600">{advisor.office}</p>
              <p className="text-xs text-gray-500">{advisor.city}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;

