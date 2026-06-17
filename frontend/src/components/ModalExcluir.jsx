import React from 'react';

export default function ModalExcluir({ projeto, onConfirmarDeletar, onCancelar, onTrocarParaEditar }) {
  if (!projeto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>AVISO DE EXCLUSÃO_</h2>
        
        <div className="modal-dados">
          <p><strong>Projeto:</strong> {projeto.name}</p>
          <p><strong>Descrição:</strong> {projeto.description}</p>
        </div>

        <p className="pergunta">Deseja apagar esse projeto?</p>

        <div className="modal-actions">
          <button className="btn-modal-edit" onClick={() => onTrocarParaEditar(projeto)}>
            Editar
          </button>
          <button className="btn-modal-delete" onClick={onConfirmarDeletar}>
            Apagar
          </button>
          <button className="btn-modal-cancel" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}