'use client'

import { HomeEventsType } from '@/lib/supabase/queries';
import dynamic from 'next/dynamic'

const EventMap = dynamic(() => import('@/components/EventMap/index'),
  { ssr: false });

const MapWrapper = ({events}: {events: HomeEventsType | null}) => {
  return (
    <div>
      <EventMap events={events}/>
    </div>
  )
}

export default MapWrapper