import { ArrowElbowDownLeft, ArrowElbowUpLeft } from "@phosphor-icons/react";
import { useState } from "react";

interface Events {
  id: number,
  name: string,
  date: string,
  place: string,
  description?: string | null;
}

interface EventItemProps {
  id: number;
  name: string,
  date: string,
  place: string,
  description?: string | null;
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>;
  setAlertMessage: (message: string | null) => void;
}

export function EventItem({id, name, date, place, description, setEvents, setAlertMessage}: EventItemProps) {
  const [ isEventOpen, setIsEventOpen] = useState(false)

  function openEvent() {
    setIsEventOpen(true);
  }

  function closeEvent() {
    setIsEventOpen(false);
  }

  async function deleteEvent(eventId: number) {
    const res = await fetch("http://localhost/backend/api.php", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: eventId}),
    })

    const data = await res.json();

    setAlertMessage(data.message)

    setTimeout(() => {
      setAlertMessage(null)
    }, 5500);

    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId))
  }


  return(
    <div className="event">
      <div className="event-info">
        <div className="event-main-info">
          <h3 className={!isEventOpen ? "truncate" : ""}>Nome: <span>{name}</span></h3>
          <h3 className={!isEventOpen ? "event-not-expanded" : ""}>Data: <span>{date}</span></h3>
          <h3 className={!isEventOpen ? "event-not-expanded " : ""}>Local: <span>{place}</span></h3>
        </div>

        <div className={!isEventOpen ? "event-not-expanded" : "event-desc"}>
          <h3> Descrição:  </h3>
          <span>{description}</span>
        </div>
      </div>



      <div className="btns-event-controller">
        {isEventOpen ? (
          <button className="btn-expand-event" onClick={closeEvent}>
            Fechar
            <ArrowElbowUpLeft size={14} />
          </button>
        ) : (
          <button className="btn-expand-event" onClick={openEvent}>
            Expandir
            <ArrowElbowDownLeft size={14} />
          </button>
        )}

          <button onClick={() => deleteEvent(id)} className="btn-delete-event">
            Excluir
          </button>
      </div>

    </div>
  )
}