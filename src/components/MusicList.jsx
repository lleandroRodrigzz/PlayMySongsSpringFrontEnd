import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function MusicList() {
    const [songs, setSongs] = useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        async function fetchSongs() {
            try {
                const endpoint = busca.trim() === "" ? "/musics" : `/find_musics?termo=${busca}`;
                const response = await fetch(`http://localhost:8080${endpoint}`);
                if (response.ok) {
                    const data = await response.json();
                    setSongs(data);
                } else {
                    setSongs([]);
                    toast.error("Nenhuma música encontrada.");
                }
            }
            catch (err) {
                toast.error("Erro ao conectar com o servidor.");
                setSongs([]);
            }
        }
        fetchSongs();
    }, [busca]);

    return (
        <div className="list-container">
            <h2>Sua Biblioteca de Músicas</h2>

            <input
                type="text"
                placeholder="Buscar por nome da música..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="search-bar"
            />

            <div className="song-grid">
                {songs.map((song, index) => (
                    <div key={index} className="song-card">
                        <h3>{song.nome}</h3>
                        <p>{song.cantor}</p>
                        <p>{song.estilo}</p>
                        <audio controls src={song.url} className="audio-player" />
                    </div>
                ))}
            </div>
            {songs.length === 0 && <p className="no-songs">Você ainda não tem músicas cadastradas</p>}
        </div>
    );
}