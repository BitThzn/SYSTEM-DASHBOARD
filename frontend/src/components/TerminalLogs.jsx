import React, { useState, useEffect, useRef } from 'react';

export default function TerminalLogs({ refreshGatilho }) {
  const [logs, setLogs] = useState([]);
  const bottomRef = useRef(null); 

  useEffect(() => {
    fetch('http://localhost:3001/logs')
      .then(res => res.json())
      .then(dados => {
        setLogs(dados);

        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      })
      .catch(err => console.error("Falha ao recuperar logs:", err));
  }, [refreshGatilho]);

  return (
    <div className="terminal-logs-container">
      <div className="terminal-header">
        <span className="terminal-title">SYSTEM://LOG_STREAM</span>
        <span className="terminal-blink">● LIVE</span>
      </div>
      <div className="terminal-body">
        {logs.map((log) => (
          <div key={log.id} className="log-line">
            <span className="log-time">[{new Date(log.created_at || Date.now()).toLocaleTimeString()}]</span>
            <span className="log-type"> [{log.type}]</span>: {log.action}
          </div>
        ))}
        {logs.length === 0 && <div className="log-line empty">Aguardando novas ações do operador...</div>}
        
        <div ref={bottomRef} /> 
      </div>
    </div>
  );
}