import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";

function NonVeg()
{
    const nonvegProducts = useSelector(state => state.products.nonveg)
    const dispatch=useDispatch()

    const items =nonvegProducts.map( (product,index)=>
        <li key={index}>
            {product.name}-${product.price}
            <button onClick={()=>dispatch(addToCart(product))}>Add to cart</button>
        </li>
    )
    return(
        <>
        <h1 style = {{color:'yellow'}}>This is non veg page</h1>
        <ul>
            {items}
        </ul>
        </>
    )
}
export default NonVeg;