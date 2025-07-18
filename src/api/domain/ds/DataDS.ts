import type {
  EventType,
  CreateEventType,
  UpdateEventType,
} from '@/types/event.type'

abstract class DataDS {
  abstract getEvents(state?: string): Promise<Array<EventType>>

  abstract getEventById(id: string): Promise<EventType>

  abstract saveEvent(event: CreateEventType): Promise<boolean>

  abstract updateEvent(event: UpdateEventType): Promise<boolean>

  abstract deleteEvent(id: string): Promise<boolean>

  abstract deleteEvents(ids: string[]): Promise<boolean>
}

export default DataDS
