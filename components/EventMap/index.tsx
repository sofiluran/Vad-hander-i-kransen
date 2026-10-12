'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Link from 'next/link'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { HomeEventsType } from '@/lib/supabase/queries'

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const EventMap = ({ events }: { events: HomeEventsType | null }) => {

  return (
    <div className="w-full h-100 rounded-2xl overflow-hidden border border-surface shadow-sm my-8">
      <MapContainer
        center={[59.3005, 18.0125]}
        zoom={15}
        scrollWheelZoom={false}
        className='w-full h-full z-0'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events && events.map(event => {
          if (!event.latitude || !event.longitude) {
            return null
          }
          return (
            <Marker key={event.id} position={[event.latitude, event.longitude]} icon={icon}>
              <Popup>
                <Link href={`/${event.slug}`}>{event.title}</Link>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default EventMap