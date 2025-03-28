import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Login({ setUsuario }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    const data = new URLSearchParams();
    data.append('email', email);
    data.append('senha', password);

    try {
      const resp = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      if (resp.ok) {
        const usuario = await resp.json();
        setUsuario(usuario);
        toast.success('Login realizado com sucesso!');
      }
      else {
        const errorData = await resp.text();
        toast.error(errorData || 'Credenciais inválidas');
      }
    }
    catch (err) {
      toast.error('Não foi possível conectar ao servidor.');
      setError('Não foi possível conectar ao servidor.');
    }
  }

  return (
      <div className="container-login">
        <div className="login-box">
          <div className="login-header">
            <Music className="login-icon" />
            <h2>Play My Songs</h2>
            <p style={{color:"#6DB33F", fontSize:"1.25rem", fontWeight:"bold"}}>Spring Edition</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="login-error">{error}</div>}
            <input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
            />
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
            />
            <button type="submit" className="login-button">Entrar</button>
          </form>
        </div>
      </div>
  );
}