import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "IT",
    priority: "MEDIUM",
    location: "MADEIRA",
  });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const url = statusFilter
        ? `http://localhost:3000/api/requests?status=${statusFilter}`
        : "http://localhost:3000/api/requests";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const response = await fetch("http://localhost:3000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create request");
      }

      setFormData({
        title: "",
        description: "",
        category: "IT",
        priority: "MEDIUM",
        location: "MADEIRA",
      });

      setShowForm(false);

      await fetchRequests();
    } catch (error) {
      console.error(error);
      setError(error.message || "Não foi possível criar o pedido.");
    }
  };

const handleStatusChange = async (requestId, newStatus) => {
  try {
    setError("");

    const response = await fetch(
      `http://localhost:3000/api/requests/${requestId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update request");
    }

    await fetchRequests();
  } catch (error) {
    console.error(error);
    setError(error.message || "Não foi possível atualizar o estado.");
  }
};

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>KSA Requests</h1>
          <p>Gestão de pedidos internos</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Novo pedido
        </button>
      </header>

      <main>
        {showForm ? (
          <section className="form-section">
            <div className="section-header">
              <h2>Novo pedido</h2>

              <button
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="request-form">
              <div className="form-group">
                <label htmlFor="title">Título</label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex.: Computador não liga"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição</label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descreva o problema..."
                  rows="5"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Categoria</label>

                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Ex.: IT"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Prioridade</label>

                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="LOW">Baixa</option>
                    <option value="MEDIUM">Média</option>
                    <option value="HIGH">Alta</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Localização</label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ex.: MADEIRA"
                  required
                />
              </div>

              {error && <p className="error">{error}</p>}

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>

                <button type="submit" className="primary-button">
                  Criar pedido
                </button>
              </div>
            </form>
          </section>
        ) : (
          <>
            <div className="section-header">
              <h2>Pedidos</h2>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="">Todos os estados</option>
                <option value="NEW">Novos</option>
                <option value="IN_PROGRESS">Em curso</option>
                <option value="RESOLVED">Resolvidos</option>
              </select>
            </div>

            {loading && <p>Carregando pedidos...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && requests.length === 0 && (
              <p>Não existem pedidos.</p>
            )}

            <div className="requests-list">
              {requests.map((request) => (
                <div className="request-card" key={request.id}>
                  <div className="request-main">
                    <h3>{request.title}</h3>

                    <p>{request.description}</p>

                    <div className="request-info">
                      <span>{request.category}</span>
                      <span>{request.location}</span>
                      <span>{request.priority}</span>
                    </div>
                  </div>

                  <div className="request-status">
                    <span
                      className={`status ${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>

                    <select
                      value={request.status}
                      onChange={(event) =>
                        handleStatusChange(request.id, event.target.value)
                      }
                    >
                      <option value="NEW">Novo</option>
                      <option value="IN_PROGRESS">Em curso</option>
                      <option value="RESOLVED">Resolvido</option>
                    </select>
                  </div>      
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;