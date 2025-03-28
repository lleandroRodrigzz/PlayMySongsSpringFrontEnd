import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {Upload} from "lucide-react";

export default function MusicUploadForm() {
  const [formData, setFormData] = useState({
    nome: '',
    estilo: '',
    cantor: '',
    file: null }
  );

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    if (formData.file) data.append('file', formData.file);
    data.append('nome', formData.nome);
    data.append('estilo', formData.estilo);
    data.append('cantor', formData.cantor);

    try {
      const res = await fetch('http://localhost:8080/music_upload', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        toast.success('Música registrada com sucesso!');
        setFormData({ nome: '', estilo: '', cantor: '', file: null });
      }
      else{
        toast.error('Erro ao registrar música');
      }
    }
    catch (err) {
      toast.error('Falha ao conectar ao servidor');
    }
  }

  return (
      <div className="upload-container">
        <h2>Registrar Música</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <label>Arquivo</label>
          <label htmlFor="file-upload" className="custom-file-upload">
            <Upload size={20} />
            Enviar arquivo
          </label>
          <input id="file-upload" type="file" name="file" onChange={handleChange} />


          <label>Estilo Musical</label>
          <select name="estilo" onChange={handleChange} required className="upload-input">
            <option value="">Selecione...</option>
            <option value="Phonk">Phonk</option>
            <option value="Rap">Rap</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Sertanejo">Sertanejo</option>
            <option value="Funk">Funk</option>
            <option value="Eletrônica">Eletrônica</option>
            <option value="MPB">MPB</option>
            <option value="Clássica">Clássica</option>
          </select>

          <label>Nome da Música</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="upload-input" />

          <label>Cantor/Banda</label>
          <input type="text" name="cantor" value={formData.cantor} onChange={handleChange} required className="upload-input" />

          <button type="submit" className="upload-button">Registrar</button>
        </form>
      </div>
  );
}