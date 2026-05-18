import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from "../Navbar"
import Announcement from "../Announcement"
import Newsletter from "../Newsletter"
import Footer from "../Footer"
import {colors} from "../data"
import { Add, Remove } from '@material-ui/icons'
import styled from 'styled-components'
import { publicRequest } from '../../requestMethods'
import axios from "axios"
import {addProduct} from '../../redux/cartRedux'
import { useDispatch } from 'react-redux';
import SizesInput from '../SizesInput';

const Button = styled.button`
    padding: 15px;
    border:2px solid teal;
    background-color:white;
    cursor: pointer;
    font-weight:500;

    &:hover{
        background-color:#f8f4f4
    }

`


function Product() {
    const location =  useLocation();
    const id = location.pathname.split("/")[2];
    const [ product, setProduct ] = useState({});
    const [ quantity, setQuantity ] = useState(1);
    const [ color, setColor ] = useState("");
    const [ size, setSize ] = useState("");
    const dispatch = useDispatch();
    //const [ inputChoice, setInputChoice ] = useState();

    useEffect(()=>{
        const getProduct = async () => {
            try{
                const res = await publicRequest.get('products/find/' + id);
                setProduct(res.data);
            } catch(err){
                console.error(err)
            }
        };
        getProduct();
    },[id]);

    

    const handleQuantity = (type) => {
        if(type === "dsc"){
            quantity > 1 && setQuantity(quantity - 1 )
            
        } else {
            setQuantity(quantity + 1)
        }
    };
//might have to send this to the sizesInput in order to have access to size to be sent in addProduct
    const handleClick = () => {
        dispatch(
            //reducer function to pass through dispatcher which takes state and an ?optional? action
            addProduct({...product, quantity, size, color })
            );
            
            console.log("product size: " + size)
    }

    const handleChange = (value) =>{ 
        setSize(value)
    };
    

    return (
        
        <div className="container-fluid p-0">
            <Navbar />
            <Announcement />
            <div className="wrapper d-flex p-5">
                <div className="imgContainer" style={{flex: 1}}>
                    <img src={product.img} alt="" className="w-100" style={{height:"90vh", objectFit:"cover"}} />
                </div>
            
                <div className="infoContainer pt-0 px-5" style={{flex:1}}>
                    <h1 className="fw-light">{product.title} </h1>
                    <p className="my-2 mx-0">
                        {product.desc}</p>
                    <span className="fw-lighter fs-1">£{product.price}</span>
                    <div className="filterContainer w-50 justify-content-between d-flex mx-0 my-4 ">
                        <div className="filter d-flex align-items-center">
                            Color:
                            {
                                product.color?.map( c =>(
                                    <div className="filterColor mx-2 my-0" key={c} style={{backgroundColor:"orange", borderRadius:"50%", width:"20px", height:"20px", cursor:"pointer"}} onClick={()=>setColor(c)}></div>
                                ))
                            }
                        </div>
                        <SizesInput product={product} sizeChange={handleChange} />
                        
                    </div>
                    <div className="addContainer w-50 d-flex justify-content-between align-items-center">
                        <div className="amountContainer d-flex flex-row">
                            <Remove onClick = {()=> handleQuantity('dsc')} />
                            <span className="amount d-flex align-items-center justify-content-center border rounded-3 border-info mx-2 my-0" style={{width: "30px", height:"30px"}}> {/*make text clickable*/}
                                {quantity}
                            </span>
                            <Add onClick = {()=> handleQuantity('asc')} />
                        </div>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Product
