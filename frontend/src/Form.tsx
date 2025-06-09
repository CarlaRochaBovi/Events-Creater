import { X } from "@phosphor-icons/react";
import { useState } from "react";

interface FormProps {
  closeForm: () => void;
  setAlertMessage: (message: string | null) => void;
  getEvents: () => void;
}

interface FormData {
  name: string,
  date: string,
  place: string,
  description?: string | null;
}

export function Form({closeForm, setAlertMessage, getEvents}: FormProps) {

  const [form, setForm] = useState<FormData>({
    name: '',
    date: '',
    place: '',
    description: null
  })


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setForm((prev: FormData) => ({ ...prev, [name]: value}))

  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost/backend/api.php", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    await getEvents();

    const data = await res.json();

    setAlertMessage(data.message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 5500);

    setForm({ name: '', date: '', place: '', description: null });
    closeForm();
  }


  return (
    <div className="form-wrapper">

      <div className="bg-details">
      <div className="form-header">
        <h2>Digite a seguir as informações do evento.</h2>
          <X size={40} className="btn-icon" onClick={closeForm} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name">Nome:</label>
          <input type="text" name="name" id="name" placeholder="Nome do evento" value={form.name} onChange={handleChange} required/>
        </div>

        <div className="input-wrapper">
          <label htmlFor="date">Data:</label>
          <input type="date" name="date" id="date" value={form.date} onChange={handleChange} required/>
        </div>

        <div className="input-wrapper">
          <label htmlFor="place">Local:</label>
          <input type="text" name="place" id="place" placeholder="Local do evento" value={form.place} onChange={handleChange} required/>
        </div>

        <div className="input-wrapper">
          <label htmlFor="description">Descrição:</label>
          <textarea name="description" id="description" placeholder="Descrição do evento (opcional)" value={form.description ?? ""} onChange={e => setForm({ ...form, description: e.target.value || null})}  ></textarea>
        </div>

        <button type="submit">
          Confirmar
        </button>
      </form>
      </div>
    </div>
  )
}