import React, { useState, useEffect } from 'react';

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: title,
      owner: 'Paula'
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    var repositories_tmp = [...repositories];
    api.delete(`repositories/${id}`).then(response => {
      const index = repositories.findIndex(repository => repository.id ===id);
      repositories_tmp.splice(index, 1);
      setRepositories(repositories_tmp);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <input value={title} onChange={e => setTitle(e.target.value)}/>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
