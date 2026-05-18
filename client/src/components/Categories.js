
import { categories } from "./data";
import CategoryItem from "./CategoryItem";


const Categories = ({matches}) => {


    return (
        <div className="container-fluid d-flex p-3 m-0 flex-sm-row flex-column justify-content-between position-relative">
            {!matches ? <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="w-25 ps-2 border-0">
                    <hr className="border-0 bg-dark" />
                </div>
                <h1 className="text-black-50">CATEGORIES</h1>
                <div className="w-25 pe-2">
                    <hr className="border-0 bg-dark" />
                </div>
            </div> : null
            } 
            
            {
                categories.map((item)=>(
                    
                        <CategoryItem item={item} />
                   
            ))
            }
        </div>
    )
}

export default Categories
