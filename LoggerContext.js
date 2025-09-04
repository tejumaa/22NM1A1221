import React, { createContext, useContext, useState, useEffect } from 'react';

const LoggerContext = createContext();

export const LoggerProvider = ({ children }) => {
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem('logs') || '[]'));

  const log = (message) => {
    const newLog = { message, timestamp: new Date().toISOString() };
    const updatedLogs = [newLog, ...logs].slice(0, 50);
    setLogs(updatedLogs);
    localStorage.setItem('logs', JSON.stringify(updatedLogs));
  };

  useEffect(() => {
    localStorage.setItem('logs', JSON.stringify(logs));
  }, [logs]);

  return (
    <LoggerContext.Provider value={{ logs, log }}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = () => useContext(LoggerContext);