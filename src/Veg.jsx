import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";

function Veg() {
    const vegProducts = useSelector(state => state.products.veg);
    const dispatch = useDispatch();

    const items = vegProducts.length > 0 ? vegProducts.map(product => (
        <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
        </li>
    )) : <li>No vegetable products available.</li>;

    return (
        <>
            <h1 style={{ color: 'green' }}>Veg Products</h1>
            <ul>
                {items}
            </ul>
        </>
    );
}

export default Veg;
