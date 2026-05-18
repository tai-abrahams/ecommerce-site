import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Announcement from './Announcement'
import Slider from './Slider'
import Categories from './Categories'
import Products from './Products'
import Newsletter from './Newsletter'
import Footer from './Footer'

const mediaMatch = window.matchMedia('(min-width: 576px)')

const Home = () => {
    const [ matches, setMatches ] = useState(mediaMatch.matches);

    useEffect(()=>{
        const handler = (e) => setMatches(e.matches);
        mediaMatch.addEventListener("change", handler);
        return mediaMatch.removeEventListener("change", handler);
    })

    return (
        <div className="container-fluid vh-100 vw-100 p-0 m-0 bg-primary">
            <Announcement />
            <Navbar matches={matches}/>
            <Slider />
            <Categories matches={matches}/>
            <Products />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home
