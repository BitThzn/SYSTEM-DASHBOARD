import React from 'react';
import CardProjeto from './CardProjeto';

export default function ColunaProjetos({ titulo, classeStatus, projetos, onAlternarStatus, onDispararDeletar, onDispararEditar }) {
  return (
    <div className="coluna">
      <h2 className={`titulo-coluna ${classeStatus}`}>
        {titulo} [{projetos.length}]
      </h2>
      <div className="lista-cards">
        {projetos.map(proj => (
          <CardProjeto 
            key={proj.id} 
            projeto={proj} 
            onAlternarStatus={onAlternarStatus}
            onDispararDeletar={onDispararDeletar}
            onDispararEditar={onDispararEditar}
          />
        ))}
        {projetos.length === 0 && (
          <p style={{ color: 'var(--texto-secundario)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem 0' }}>
            NENHUM_PROJETO_ENCONTRADO
          </p>
        )}
      </div>
    </div>
  );
}