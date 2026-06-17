import React, { useState, useEffect } from 'react';
import ColunaProjetos from './components/ColunaProjetos';
import ModalExcluir from './components/ModalExcluir';
import NovoProjetoModal from './components/NovoProjetoModal';
import TerminalLogs from './components/TerminalLogs'; 
import './styles/global.css';
import './styles/dashboard.css';

const API_URL = 'http://localhost:3001/projects'; 

export default function App() {
  const [projetos, setProjetos] = useState([]);
  const [projetoParaDeletar, setProjetoParaDeletar] = useState(null);
  const [projetoParaEditar, setProjetoParaEditar] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [atualizarLogsGatilho, setAtualizarLogsGatilho] = useState(0); 

  useEffect(() => {
    carregarProjetos();
  }, []);

  const carregarProjetos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar dados do servidor.');
      const dados = await response.json();
      setProjetos(dados);
    } catch (error) {
      console.error("Erro na sincronização:", error);
    }
  };

  const recarregarLogsDoSistema = () => {
    setAtualizarLogsGatilho(prev => prev + 1);
  };

  const handleAlternarStatus = async (id) => {
    const proj = projetos.find(p => p.id === id);
    if (!proj) return;

    const novoStatus = (proj.status === 'active' || proj.status === 1) ? 'inactive' : 'active';

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: proj.name,
          description: proj.description,
          status: novoStatus
        })
      });

      if (response.ok) {
        setProjetos(prev => prev.map(p => p.id === id ? { ...p, status: novoStatus } : p));
        
        recarregarLogsDoSistema(); 
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleConfirmarDeletar = async () => {
    if (!projetoParaDeletar) return;

    try {
      const response = await fetch(`${API_URL}/${projetoParaDeletar.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProjetos(prev => prev.filter(p => p.id !== projetoParaDeletar.id));
        setProjetoParaDeletar(null);
        recarregarLogsDoSistema();
      }
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  const handleSalvarProjeto = async (projetoSalvo) => {
    try {
      if (projetoSalvo.id) {
        const response = await fetch(`${API_URL}/${projetoSalvo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: projetoSalvo.name,
            description: projetoSalvo.description,
            status: projetoSalvo.status
          })
        });
        if (response.ok) {
          carregarProjetos();
        }
      } else {
  
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: projetoSalvo.name,
            description: projetoSalvo.description,
            status: projetoSalvo.status
          })
        });
        if (response.ok) {
          carregarProjetos();
          recarregarLogsDoSistema(); 
        }
      }
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
    }

    setIsFormModalOpen(false);
    setProjetoParaEditar(null);
  };

  const handleAbrirEditar = (projeto) => {
    setProjetoParaDeletar(null); 
    setProjetoParaEditar(projeto);
    setIsFormModalOpen(true);
  };

  const ativos = projetos.filter(p => p.status === 'active' || p.status === 1 || p.status === true);
  const inativos = projetos.filter(p => p.status === 'inactive' || p.status === 0 || p.status === false || !p.status);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>SYSTEM://DASHBOARD</h1>
        <button className="btn-add" onClick={() => { setProjetoParaEditar(null); setIsFormModalOpen(true); }}>
          + NOVO_PROJETO
        </button>
      </header>

      <TerminalLogs refreshGatilho={atualizarLogsGatilho} />

      <main className="dashboard-content">
        <ColunaProjetos 
          titulo="PROJETOS_ATIVOS" 
          classeStatus="status-ativo"
          projetos={ativos}
          onAlternarStatus={handleAlternarStatus}
          onDispararDeletar={setProjetoParaDeletar}
          onDispararEditar={handleAbrirEditar}
        />

        <ColunaProjetos 
          titulo="PROJETOS_INATIVOS" 
          classeStatus="status-inativo"
          projetos={inativos}
          onAlternarStatus={handleAlternarStatus}
          onDispararDeletar={setProjetoParaDeletar}
          onDispararEditar={handleAbrirEditar}
        />
      </main>

      <ModalExcluir 
        projeto={projetoParaDeletar}
        onConfirmarDeletar={handleConfirmarDeletar}
        onCancelar={() => setProjetoParaDeletar(null)}
        onTrocarParaEditar={handleAbrirEditar}
      />

      <NovoProjetoModal 
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); setProjetoParaEditar(null); }}
        onSalvar={handleSalvarProjeto}
        projetoParaEditar={projetoParaEditar}
      />
    </div>
  );
}