import { useState } from 'react'

const SizesInput = ({product, sizeChange}) => {

    const [ inputChoice, setInputChoice ] = useState();
    const [ size, setSize ] = useState("");

    const handleChange = (event) =>{
        sizeChange(event.target.value);
        setInputChoice(event.target.value)
    }
  return (
    <div className="filter d-flex justify-content-center align-items-center">
                            <span className="filterTitle fs-5 fw-light border">Size</span>
                            <select value={ inputChoice } defaultValue="default" className="filterSize p-1 ms-2" onChange={ handleChange }>
                                <option value="default" disabled className="filterSize" >
                                    Sizes
                                    </option>
                                {
                                    product.size?.map((s)=>(
                                        <option key={s} className="filterSizeOption" onClick={(e)=>setSize(e.target.value)}>{s}</option>
                                    ))
                                }
                                
                            </select>
                        </div>
  )
}

export default SizesInput