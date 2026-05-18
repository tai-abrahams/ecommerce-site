import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
const mqList = window.matchMedia('(min-width: 600px)');

    const Icon = styled.div`
        height: 40px;
        width:40px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        margin:10px;
        transition: all 0.5s ease;
        background-color: white;

        &:hover{
            background-color: #e9f5f5;
            transform: scale(1.1);
            cursor: pointer;
        }
    `;

    const Info = styled.div`
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0, 0.2);
        transition: all 0.5s ease;
        z-index: 3;
    `;

    const Container = styled.div`
        flex:1;
        margin:5px;
        max-width:25%;
        height:350px;
        display:flex;
        align-items:center;
        justify-content:center;
        background-color:#f5fbfd;
        position:relative;
    
        &:hover ${Info}{
            opacity: 1;
        }

        @media only screen and (min-width:576px) and (max-width:768px){
            max-width:50%;
        }

        @media only screen and (min-width:0px) and (max-width:575px){
            max-width:100%;
        }
    `;


const Product = ({item}) => {



    return (
        <Container>
            <div className="circle border bg-white position-absolute"
                style={{
                    width:"25%",
                    height:"200px",
                    borderRadius:"50%"
            }}>

            </div>
            <img src={item.img} className="w-75" alt="" style={{zIndex:"2"}} />
            <Info>
                
                {/* icons should be a reusable component */}

                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product