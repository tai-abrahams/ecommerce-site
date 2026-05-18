import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar"
import Announcement from '../Announcement'
import Products from '../Products'
import Newsletter from '../Newsletter'
import Footer from '../Footer'

const mediaMatch = window.matchMedia('(min-width: 576px)')

const ProductList = () => {
    const [ matches, setMatches ] = useState(mediaMatch.matches);
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [ filters, setFilters ] = useState({});
    const [ sort, setSort ] = useState("newest")

    useEffect(()=>{
        const handler = (e) => setMatches(e.matches);
        mediaMatch.addEventListener("change", handler);
        return mediaMatch.removeEventListener("change", handler);
    })

    const handleFilter = (e) => {
        const value = e.target.value;
        
        setFilters({
            ...filters,
            [e.target.name]:value,
        })

        
    }

    console.log(filters)
    return (
        <div className="container-fluid vh-100 vw-100 p-0 m-0">
            <Announcement />
            <Navbar matches={matches} />
            <h1 className="fs-1 fw-bolder">Dresses</h1>
            <div className="filterContainer d-flex justify-content-between">
                <div className="filter">
                    <span className="fs-4 fw-bold me-4">
                        Filter Products:
                    </span>
                    <select name="color" onChange={handleFilter} className="p-2 me-4">
                        <option disabled selected>Color</option>
                        <option>white</option>
                        <option>black</option>
                        <option>red</option>
                        <option>blue</option>
                        <option>yellow</option>
                        <option>green</option>
                        <option>orange</option>
                        <option>grey</option>
                    </select>
                    <select name="size"  onChange={handleFilter} className="p-2 me-4">
                        <option disabled selected>Size</option>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                </div>
                <div className="filter">
                    <span className="fs-4 fw-bold me-4">
                        Sort Products:
                    </span>
                    <select onChange={ e => setSort(e.target.value) } className="p-2 me-4">
                        <option value="newest" selected>Newest</option>
                        <option value="asc" >Price (asc)</option>
                        <option value="desc" >Price (desc)</option>
                    </select>
                    { console.log(sort)}
                </div>
            </div>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default ProductList
