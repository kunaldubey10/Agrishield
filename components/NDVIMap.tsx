'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import { FaSearch, FaMapMarkerAlt, FaCrosshairs } from 'react-icons/fa';

interface NDVIMapProps {
  onAreaSelect: (coordinates: [number, number][]) => void;
}

// Popular farming locations in India
const POPULAR_LOCATIONS = [
  { name: 'Punjab (Wheat Belt)', coords: [30.7333, 76.7794] as [number, number], zoom: 10 },
  { name: 'Haryana (Rice Belt)', coords: [29.0588, 76.0856] as [number, number], zoom: 10 },
  { name: 'Maharashtra (Cotton)', coords: [19.7515, 75.7139] as [number, number], zoom: 10 },
  { name: 'Karnataka (Coffee)', coords: [12.9716, 77.5946] as [number, number], zoom: 10 },
  { name: 'Tamil Nadu (Sugarcane)', coords: [11.1271, 78.6569] as [number, number], zoom: 10 },
  { name: 'Gujarat (Groundnut)', coords: [23.0225, 72.5714] as [number, number], zoom: 10 },
  { name: 'West Bengal (Rice)', coords: [22.9868, 87.8550] as [number, number], zoom: 10 },
  { name: 'Uttar Pradesh (Wheat)', coords: [26.8467, 80.9462] as [number, number], zoom: 10 },
];

const NDVIMap = ({ onAreaSelect }: NDVIMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapIdRef = useRef<string>(`map-${Math.random().toString(36).substring(2, 11)}`);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initMap = () => {
      const mapContainer = document.getElementById(mapIdRef.current);
      if (!mapContainer || mapRef.current) return;

      // Initialize map centered on India with better zoom level
      mapRef.current = L.map(mapIdRef.current).setView([20.5937, 78.9629], 6);
      
      // Fix for default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
      
      // Add tile layer with better styling
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(mapRef.current);

      // Initialize feature group for drawn items
      drawnItemsRef.current = L.featureGroup().addTo(mapRef.current);

      // Enhanced draw control with better options
      const drawControl = new L.Control.Draw({
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true,
            shapeOptions: {
              color: '#3388ff',
              fillColor: '#3388ff',
              fillOpacity: 0.2
            }
          },
          polyline: false,
          rectangle: {
            shapeOptions: {
              color: '#3388ff',
              fillColor: '#3388ff',
              fillOpacity: 0.2
            }
          },
          circle: false,
          marker: false,
          circlemarker: false
        },
        edit: {
          featureGroup: drawnItemsRef.current,
          remove: true
        }
      });

      mapRef.current.addControl(drawControl);

      // Add location control
      const LocationControl = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function() {
          const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          div.innerHTML = '<button class="bg-white p-2 rounded shadow hover:bg-gray-100" title="Get Current Location"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg></button>';
          L.DomEvent.on(div, 'click', () => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                mapRef.current?.setView([latitude, longitude], 13);
                setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              });
            }
          });
          return div;
        }
      });
      const locationControl = new LocationControl();
      locationControl.addTo(mapRef.current);

      // Handle draw events
      mapRef.current.on(L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer;
        drawnItemsRef.current?.addLayer(layer);

        const latlngs = layer.getLatLngs();
        let coordinates: [number, number][];
        
        if (layer instanceof L.Rectangle) {
          const bounds = layer.getBounds();
          coordinates = [
            [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
            [bounds.getNorthEast().lat, bounds.getSouthWest().lng],
            [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
            [bounds.getSouthWest().lat, bounds.getNorthEast().lng],
          ];
        } else {
          coordinates = latlngs[0].map((latlng: L.LatLng) => [
            latlng.lat,
            latlng.lng
          ]) as [number, number][];
        }

        onAreaSelect(coordinates);
      });

      // Handle edit events
      mapRef.current.on(L.Draw.Event.EDITED, (e: any) => {
        const layers = e.layers;
        layers.eachLayer((layer: L.Layer) => {
          if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
            const latlngs = layer.getLatLngs();
            let coordinates: [number, number][] = [];
            
            if (layer instanceof L.Rectangle) {
              const bounds = layer.getBounds();
              coordinates = [
                [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
                [bounds.getNorthEast().lat, bounds.getSouthWest().lng],
                [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
                [bounds.getSouthWest().lat, bounds.getNorthEast().lng],
              ];
            } else if (Array.isArray(latlngs[0])) {
              coordinates = (latlngs[0] as L.LatLng[]).map((latlng: L.LatLng) => [
                latlng.lat,
                latlng.lng
              ]) as [number, number][];
            }
            onAreaSelect(coordinates);
          }
        });
      });

      // Handle delete events
      mapRef.current.on(L.Draw.Event.DELETED, () => {
        onAreaSelect([]);
      });

      // Trigger map resize after initialization
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
    };

    const timer = setTimeout(initMap, 100);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        drawnItemsRef.current = null;
      }
    };
  }, [onAreaSelect]);

  const handleLocationSelect = (location: typeof POPULAR_LOCATIONS[0]) => {
    if (mapRef.current) {
      mapRef.current.setView(location.coords, location.zoom);
      setCurrentLocation(location.name);
      setShowLocationMenu(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Use Nominatim for geocoding (free OpenStreetMap geocoding)
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          if (mapRef.current) {
            mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 12);
            setCurrentLocation(data[0].display_name);
            setSearchQuery('');
          }
        }
      })
      .catch(err => console.error('Geocoding error:', err));
  };

  return (
    <div className="relative">
      {/* Search and Location Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2 min-w-[300px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search location..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            title="Search Location"
          >
            <FaSearch />
          </button>
        </div>

        {/* Popular Locations Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLocationMenu(!showLocationMenu)}
            className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors w-full"
          >
            <FaMapMarkerAlt className="text-green-600" />
            <span className="text-sm font-medium">Popular Locations</span>
          </button>
          {showLocationMenu && (
            <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 w-full max-h-64 overflow-y-auto z-[1001]">
              {POPULAR_LOCATIONS.map((location, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full text-left px-4 py-2 hover:bg-green-50 transition-colors text-sm border-b border-gray-100 last:border-b-0"
                >
                  {location.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Location Display */}
        {currentLocation && (
          <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-xs text-gray-600">
            <FaCrosshairs className="inline mr-1 text-green-600" />
            {currentLocation}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainerRef}
        id={mapIdRef.current}
        className="w-full h-[600px] rounded-lg shadow-lg border-2 border-gray-200"
        style={{ zIndex: 0 }}
      />
    </div>
  );
};

NDVIMap.displayName = 'NDVIMap';

export default NDVIMap;
