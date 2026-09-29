import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import TrackingMap from '../components/TrackingMap';
import DeliveryProgress from '../components/DeliveryProgress';
import StatusBadge from '../components/StatusBadge';
import VoiceAssistant from '../components/VoiceAssistant';

export default function TrackDelivery() {
  const { deliveryId } = useParams();
  const { user } = useAuth();
  const [delivery, setDelivery] = useState();
  const [error, setError] = useState('');
  const watch = useRef();
  const load = () => api.get(`/tracking/${deliveryId}`).then((r) => setDelivery(r.data.data.delivery)).catch((e) => setError(e.response?.data?.message || 'Unable to load tracking'));
  useEffect(() => { load(); const timer = setInterval(load, 8000); return () => { clearInterval(timer); navigator.geolocation?.clearWatch(watch.current); }; }, [deliveryId]);
  const update = async (status) => { try { await api.patch(`/deliveries/${deliveryId}/status`, { status }); load(); } catch (e) { setError(e.response?.data?.message || 'Unable to update delivery'); } };
  const share = () => {
    if (!navigator.geolocation) return setError('Geolocation is not supported by this browser.');
    if (!window.confirm('Location is shared only while this active delivery is out for delivery. Continue?')) return;
    watch.current = navigator.geolocation.watchPosition(async (p) => {
      try { await api.post(`/tracking/${deliveryId}/location`, { latitude: p.coords.latitude, longitude: p.coords.longitude, accuracy: p.coords.accuracy, heading: p.coords.heading || 0, speed: p.coords.speed || 0 }); load(); }
      catch (e) { setError(e.response?.data?.message || 'Location update failed'); }
    }, () => setError('Location permission was denied or unavailable.'), { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 });
  };
  if (error) return <main className="app"><p className="error">{error}</p></main>;
  if (!delivery) return <main className="app">Loading secure tracking…</main>;
  const destination = delivery.order.delivery_address;
  const command = (text) => { if (text.includes('mark delivered')) update('DELIVERED'); if (text.includes('start delivery')) update('OUT_FOR_DELIVERY'); };
  return <main className="app">
    <header><a className="brand" href="/dashboard">← ParcelPulse</a><StatusBadge status={delivery.status} /></header>
    <div className="track-layout"><section><p className="eyebrow">LIVE TRACKING {import.meta.env.VITE_DEMO_MODE === 'true' && '· DEMO MODE'}</p><h1>{delivery.order.order_number}</h1><TrackingMap location={delivery.latest_location} destination={destination} /><p className="muted">{delivery.latest_location ? `Last updated ${new Date(delivery.latest_location.recorded_at).toLocaleTimeString()}` : 'Awaiting a location update'}</p></section>
      <aside className="panel"><h2>{delivery.status === 'OUT_FOR_DELIVERY' ? 'Driver is on the way' : 'Delivery progress'}</h2><DeliveryProgress status={delivery.status} /><p><b>Destination</b><br />{destination.address_line}, {destination.city}</p>
        {user.role === 'delivery_agent' && <div className="actions">{delivery.status === 'ASSIGNED' && <button onClick={() => update('PICKED_UP')}>Mark picked up</button>}{delivery.status === 'PICKED_UP' && <button onClick={() => update('OUT_FOR_DELIVERY')}>Start delivery</button>}{delivery.status === 'OUT_FOR_DELIVERY' && <><button onClick={share}>Enable live location</button><button className="secondary" onClick={() => update('DELIVERED')}>Mark delivered</button></>}</div>}
        {user.role === 'delivery_agent' && <VoiceAssistant onCommand={command} />}
      </aside>
    </div>
  </main>;
}
