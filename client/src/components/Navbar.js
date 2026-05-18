import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { Search, ShoppingCartOutlined, AccountCircle } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import styled from "styled-components"
import { useSelector } from 'react-redux';

const LogoLink = styled.a`
    &:link, :active, :hover, :visited{
        color: white;
        font-size: ${props => props.small ? '24px' : '24px' };
        text-decoration: none;
        letter-spacing:${props => props.small ? '-4px' : '-3px'};
    }
`

//const mediaMatch = window.matchMedia('(max-width: 768px)');



const Navbar = ({matches}) => {
    const textInput = useRef(null);
    //const [ matches, setMatches ] = useState(mediaMatch.matches);
    const [width, setWidth ] = useState(0)
    const logoRef = useCallback(el => {
        if( el !== null ) setWidth(el.getBoundingClientRect().width);
    });

    //mapStateToProps equivalent/ pulls entire state value from store (can give state anyname)
    const quantity = useSelector(state=> state.cart.quantity)
    
    console.log(quantity);
    // useEffect(()=>{
        
    //     const handler = (e) => setMatches(e.matches);
    //     mediaMatch.addEventListener("change",handler);
    //     return mediaMatch.removeEventListener("change", handler)
    // })

    const styles = {
        navInput: (viewIsSmaller)=>({
            width: (viewIsSmaller ? "100%" : null),
            outline:"none"
        })
    }

    return (
        <nav className="navbar navbar-expand-md d-flex navbar-dark bg-dark ">
            <div className="container-fluid d-flex-row justify-content-between px-2" style={{flex:3}}>
                   
                    {
                    /* ecommerce logo positioning and removing search bar */
                        matches &&
                        (
                            <div
                                className="d-flex flex-row align-items-center justify-content-start"
                                style={{flex: 1}}
                            >{console.log("mediaquery max-wdith:" + matches)}
                                <span className="fs-6 pe-2 text-white d-none d-md-block" style={{cursor:'pointer'}}>EN</span>
                                <div className="d-flex flex-row align-items-center justify-content-start border-1 border-secondary p-2">
                                    <input className="border-0 px-2 py-2 w-100" /*style={styles.navInput(matches)}*//>
                                    <Search color='action' className="ms-1 fs-5" style={{color:"gray", cursor:"pointer"}}/>
                                </div>
                            </div>
                        ) 
                          
                    }
                
                    
                    <div
                        className="d-flex align-items-center justify-content-sm-start justify-content-center"
                        style={{flex:1}}
                    >
                        <h1 className={`d-flex text-white fw-bold  justify-content-sm-center justify-content-start`} style={{letterSpacing:"-4px", flex:1}}>    
                            <LogoLink
                                small={matches} 
                                href="#"
                                ref={logoRef}
                                style={{
                                    
                                    //marginLeft:'auto', //(!matches ? `-${Math.round(width/2)}px` : null),
                                }}
                            >
                                ecommerce
                            </LogoLink>
                        </h1>
                    </div>
                    <div
                            className="d-flex flex-row justify-content-end align-items-center pe-3" 
                            style={{flex: '1'}}
                    >
                        { /* use icons instead of text for smaller screen*/
                            !matches ? 
                            <>
                                <div 
                                    className="me-3 text-white justify-content-center align-items-center" 
                                    style={{cursor:"pointer"}}
                                >
                                    <AccountCircle className="my-4 mx-0" style={{ fontSize:"40" }}/>
                                </div>
                                <div 
                                    className="me-3 text-white" 
                                    style={{cursor:"pointer"}}
                                >
                                <Link to="/cart">
                                    <Badge badgeContent={quantity} color={"primary"}>
                                        <ShoppingCartOutlined className='text-white' style={{ fontSize:"40" }} />
                                    </Badge></Link>
                                </div>
                                
                            </>
                                : 
                                <>
                                    <div 
                                        className="align-items-center ms-3 fs-6 text-white" 
                                        style={{cursor:"pointer"}}
                                    >
                                        REGISTER
                                    </div>
                                    <div 
                                        className="align-items-center ms-3 fs-6 text-white" 
                                        style={{cursor:"pointer"}}
                                    >
                                        LOGIN
                                    </div>
                                    <div className="d-flex align-items-center ms-3" style={{cursor:"pointer"}}>
                                    <Link to="/cart">
                                        <Badge badgeContent={quantity} color={"primary"}>
                                            <ShoppingCartOutlined className='text-white' />
                                        </Badge>
                                    </Link>
                                    </div>
                                </>
                        }
                    </div>
            </div>
        </nav>
    )
}

export default Navbar
