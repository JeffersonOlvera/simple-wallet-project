import { EventsContainer } from '@/components/events/EventsContainer'
import { EventsForm } from '@/components/events/EventsForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <EventsForm />
      <EventsContainer />
    </main>
  )
}
