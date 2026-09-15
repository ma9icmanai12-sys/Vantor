import { useRef, useEffect, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { VantorControl } from './maplibre-gl-vantor/react';
import './maplibre-gl-vantor/styles.css';

export default function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) {
      console.error('Map container not found');
      return;
    }

    console.log('Initializing map...');
    const m = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [46.0, -18.0],
      zoom: 5,
    });

    m.addControl(new maplibregl.NavigationControl(), 'top-left');

    m.on('load', () => {
      console.log('Map loaded');
      setMap(m);
    });

    m.on('error', (e) => {
        console.error('Map error:', e);
    });

    return () => {
      m.remove();
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {map ? (
        <VantorControl map={map} position="top-right" />
      ) : (
        <div style={{ position: 'absolute', top: 10, right: 10 }}>Map loading...</div>
      )}
    </div>
  );
}
