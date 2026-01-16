import './HomeStyles.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCharacters = (page = 1) => {
    setLoading(true);
    fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=10`)
      .then(res => res.json())
      .then(data => {
        setCharacters(data.items || []);
        setTotalPages(data.meta?.totalPages || 1);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1 className="main-title">Dragon Ball Characters</h1>

      {loading ? (
        <p>Cargando personajes...</p>
      ) : characters.length > 0 ? (
        <>
          {/* 🔹 Contenedor principal de las tarjetas */}
          <div className="characters-container">
            {characters.map(char => (
              <div className="character-card" key={char.id}>
                <Link to={`/character/${char.id}`}>
                  <img src={char.image} alt={char.name} />
                  <h3>{char.name}</h3>
                </Link>
              </div>
            ))}
          </div>

          {/* 🔹 Controles de paginación */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
              ◀ Anterior
            </button>
            <span style={{ margin: '0 10px' }}>
              Página {currentPage} de {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Siguiente ▶
            </button>
          </div>
        </>
      ) : (
        <p className="no-characters">No se encontraron personajes.</p>
      )}
    </div>
  );
};

export default Home;
