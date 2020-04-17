import React from 'react'
import Navbar from './components/layout/Navbar';
import Films from './components/films/Films';

const title = document.querySelector('title');
title.innerText = "Mini Netflix";

const App = () => {
    return (
        <div>
            <Navbar/>
            <br/>
            <Films/>
        </div>
    )
}

export default App
