'use client'
import AttendeeCarousel from '@/components/attendees/AttendeeCarousel';
import attendeesData from '@/lib/data/attendees.json';

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Kory's Last Chance To Get Laid</h1>
      <div className="mt-8">
        <h2 className="text-2xl">April 24-27, 2024</h2>
        <p className="mt-4">Chattanooga, TN</p>
      </div>
      <AttendeeCarousel attendees={attendeesData.attendees} />
    </main>
  )
}