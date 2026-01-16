import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dragonball-api.com/api/characters/${id}`)
      .then(res => res.json())
      .then(data => {
        setCharacter(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando personaje...</p>;
  if (!character) return <p>No se encontró el personaje.</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width={200} />
      <p><strong>Ki:</strong> {character.ki}</p>
      <p><strong>Descripción:</strong> {character.description}</p>
      <Link to="/">🔙 Regresar</Link>
    </div>
  );
};

export default Detail;

