import React from 'react';

export default function CardProjeto({ projeto, onAlternarStatus, onDispararDeletar, onDispararEditar }) {
  const isAtivo = projeto.status === 'active' || projeto.status === true || projeto.status === 1;

  return (
    <div className={`card-projeto ${!isAtivo ? 'card-inativo' : ''}`}>
      <div className="card-header">
        <h3>{projeto.name}</h3>
        <button className="btn-icon" onClick={() => onDispararEditar(projeto)} title="Editar projeto">
          ✏️
        </button>
      </div>
      <p>{projeto.description}</p>
      <div className="card-footer">
        <button 
          className={`btn-status ${isAtivo ? 'ativo' : ''}`} 
          onClick={() => onAlternarStatus(projeto.id)}
        >
          <span className={isAtivo ? 'led-verde' : 'led-desligado'}></span> 
          {isAtivo ? 'Ativo' : 'Inativo'}
        </button>
        <button className="btn-deletar" onClick={() => onDispararDeletar(projeto)}>
          Deletar
        </button>
      </div>
    </div>
  );
}