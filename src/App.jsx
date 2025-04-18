import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MusicUploadForm from './components/MusicUploadForm';
import MusicList from './components/MusicList';
import {Toaster} from "react-hot-toast";

export default function App() {
  const [tela, setTela] = useState('lista');

  return (
      <>
        <Toaster position={"top-center"}/>
        <div className="min-h-screen bg-gray-900">
                <>
                    <Navbar usuario={""} setTela={setTela} />
                    {tela === 'upload' ? <MusicUploadForm /> : <MusicList />}
                </>
        </div>
      </>
  );
}
