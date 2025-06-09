
import { EventItem } from "./EventItem";
import { useEffect } from "react";


interface EventsListProps {
  openForm: () => void;
  setAlertMessage: (message: string | null) => void;
  getEvents: () => void;
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>;
  events: Events[];
}

interface Events {
  id: number,
  name: string,
  date: string,
  place: string,
  description?: string | null;
}

 export function EventsList({ openForm, setAlertMessage, getEvents, setEvents, events }:  EventsListProps) {


  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div className="events-wrapper">
        <header className="events-header">
          <h1>Lista de eventos</h1>
          <button onClick={() => {
            openForm()
          }}>Novo Evento</button>
        </header>



        <div className="events">
          {
            events.length === 0 && (<p className="event-state-message">Você não possui nenhum evento cadastrado.</p>)
          }

          {
            events.map((event) => {
              return (
                <EventItem key={event.id} id={event.id} name={event.name} date={event.date} place={event.place} description={event.description} setEvents={setEvents} setAlertMessage={setAlertMessage}/>
              )
            })
          }
        </div>

    </div>
  )
}