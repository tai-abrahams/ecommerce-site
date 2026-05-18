import { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import Slide from './Slide';
import { sliderItems } from './data'

const Slider = () => {

    const [ slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction)=>{
        if(direction === "left"){
            setSlideIndex( slideIndex > 0 ? slideIndex-1 : sliderItems.length -1 );
        } else {
            setSlideIndex( slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0 );
        }
    }

    return (
        <div className="container-fluid vh-100 d-flex m-0 p-0 bg-light" style={{ position:"relative", overflow:"hidden"}}>
            {console.log(sliderItems.length )}
                <div className="arrow d-flex m-auto align-items-center justify-content-center border bg-white" style={{height:"50px", width:"50px", borderRadius:"50%", position:"absolute", top:"0", bottom: "0", left: "10px", cursor:"pointer", zIndex:"2"}}>
                     <ArrowLeftOutlined onClick={()=>(handleClick("left"))} />
                </div>
                <div className="wrapper d-flex h-100" style={{transform: `translateX(${(slideIndex * -100)}vw)`, transition: `all 1.5s ease` }}>
                    {
                        sliderItems.map((item)=>(
                            <div key={item.id} className="p-0 m-0">
                            <Slide 
                            id={item.id}
                            image={item.image}
                            bg={item.bg}
                            title={item.title} 
                            desc={item.desc} 
                            button={item.button}
                            />
                            </div>
                        ))
                    }
                </div>
                <div className="d-flex m-auto align-items-center justify-content-center border bg-white" style={{height:"50px", width:"50px", borderRadius:"50%", position:"absolute", top:"0", bottom: "0", right: "10px", cursor:"pointer"}}>
                    <ArrowRightOutlined position="right" onClick={()=>handleClick("right")}/>
                </div>
            
        </div>
    )
}

export default Slider
