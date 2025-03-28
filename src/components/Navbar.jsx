import React from 'react';
import { Upload, List } from 'lucide-react';
import Logo from "../assets/spring.svg";
import {toast} from "react-hot-toast";

toast.success("Bem-vindo Visitante! :)")
export default function Navbar({ setTela }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={Logo} alt={"Logo Spring"} className={"login-icon"}/>
                <span className="navbar-title">Play My Songs - <span style={{color:"#6DB33F"}}>Spring Edition</span></span>
            </div>
            <div className="navbar-right">
                <span className="navbar-welcome">Bem-vindo, {'Visitante'}</span>
                <button onClick={() => setTela('upload')} className="navbar-button">
                    <Upload className="navbar-button-icon" /> Registrar
                </button>
                <button onClick={() => setTela('lista')} className="navbar-button">
                    <List className="navbar-button-icon" /> Músicas
                </button>
            </div>
        </nav>
    );
}