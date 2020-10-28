import React, { useState } from "react";

import "./styles.css";

import api from './services/api'
import { useEffect } from "react";


function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))

  }, [])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Desafio ReactJs",
      url: "https://github.com/paulokaome",
      techs: "ReactJs , React Native"
    })
    const repositorie = response.data
    setRepositories([...repositories, repositorie])


  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const repositoriesUpdated = repositories.filter(repo => repo.id !== id)

    setRepositories([...repositoriesUpdated])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(response =>
          <li key={response.id}>
            {response.title}

            <button onClick={() => handleRemoveRepository(response.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
