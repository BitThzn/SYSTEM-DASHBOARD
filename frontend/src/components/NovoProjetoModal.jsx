import React, { useState, useEffect } from 'react';

export default function NovoProjetoModal({ isOpen, onClose, onSalvar, projetoParaEditar }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (projetoParaEditar) {
      setName(projetoParaEditar.name);
      setDescription(projetoParaEditar.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [projetoParaEditar, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    onSalvar({
      id: projetoParaEditar ? projetoParaEditar.id : null,
      name,
      description,
      status: projetoParaEditar ? projetoParaEditar.status : 'active' 
    });
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{projetoParaEditar ? 'EDITAR_PROJETO_' : 'REGISTRAR_NOVO_PROJETO_'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>NOME_DO_PROJETO</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Ex: SYSTEM://GHOST"
              required
            />
          </div>

          <div className="form-group">
            <label>DESCRIÇÃO</label>
            <textarea 
              rows="4" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Descreva a função do módulo..."
              required
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-modal-save">
              {projetoParaEditar ? 'Salvar Alterações' : 'Adicionar'}
            </button>
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}