import { useState } from "react"
import { EventsList } from "./EventsList"
import { Form } from "./Form"
import { AlertMessage } from "./AlertMessage"

interface Events {
  id: number,
  name: string,
  date: string,
  place: string,
  description?: string | null;
}

function App() {

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [events, setEvents] = useState<Events[]>([]);


  function openForm() {
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
  }

  async function getEvents() {
    try {
      const res = await fetch("http://localhost/backend/api.php")
      const data = await res.json();

      setEvents(data)
    }catch(err) {
      console.log("Erro ao buscar eventos: ", err);
    }
  }

  return (
    <>
      <div className="app-wrapper">
        <div className="bg-details">

          <AlertMessage alertMessage={alertMessage}/>

          <EventsList openForm={openForm} setAlertMessage={setAlertMessage} getEvents={getEvents} setEvents={setEvents} events={events}/>
          {
            isFormOpen && <Form closeForm={closeForm} setAlertMessage={setAlertMessage} getEvents={getEvents} />
          }

        </div>
      </div>
    </>
  )
}

export default App
