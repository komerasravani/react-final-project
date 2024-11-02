import React, { useState } from 'react';
import { decrement, increment, removeItem } from './Store';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
    // Use the selector to get the cart items from the Redux store
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Map through the items to display them or show a message if the cart is empty
    const itemsList = cartItems.length > 0 ? (
        cartItems.map((item) => (
            <li key={item.name}>
                {item.name}, ${(item.price * item.quantity).toFixed(2)}, Quantity: {item.quantity}
                <button onClick={() => dispatch(increment({ name: item.name }))}>+1</button>
                <button onClick={() => dispatch(decrement({ name: item.name }))}>-1</button>
                <button onClick={() => dispatch(removeItem({ name: item.name }))}>Remove</button>
            </li>
        ))
    ) : (
        "Cart is empty"
    );

    // Discount state
    const [disperce, setDisPerc] = useState(0);

    const handleDisPercentage = (dvalue) => {
        setDisPerc(dvalue / 100); // Store as a fraction for calculations
    };
    const [couponCode,setCouponCode]=useState('');
    const [copenDiscountpercentage,setCouponDiscountpercentage]=useState(0);
    const handleApplyCoupon = () =>{
        switch (couponCode){
            case 'NAVYA10':
                setCouponDiscountpercentage(10);
                break;
                case 'NAVYA20':
                setCouponDiscountpercentage(20);
                break;
                case 'NAVYA30':
                setCouponDiscountpercentage(30);
                break;
                default:
                    alert('invalid coupon code');
                    setCouponDiscountpercentage(0);
        }
    }
    

    const calculateTotal = () => {
        const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const disAmount = total * disperce; // Discount calculation
        const couponAmount=total * (copenDiscountpercentage /100) ;
        const netAmount = total - disAmount-couponAmount

        return {
            total,
            disAmount,
            couponAmount,
            netAmount
        };
    };

    // Calculate totals based on current cart and discount amount
    const { total, disAmount, netAmount } = calculateTotal();

    return (
        <>
            <h1 style={{ color: 'pink' }}>This is the cart page</h1>
            <ul>{itemsList}</ul>
            <h2>Total before discount: ${total.toFixed(2)}</h2>
            <button onClick={() => handleDisPercentage(10)}>Apply 10%</button>
            <button onClick={() => handleDisPercentage(20)}>Apply 20%</button>
            <button onClick={() => handleDisPercentage(30)}>Apply 30%</button>
            <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="enter coupon code" />
             <button onClick={handleApplyCoupon}>Apply coupon</button>
            <h2>Discount Percentage: {disperce * 100}%</h2> {/* Display as percentage */}
            <h2>Discount Amount: ${disAmount.toFixed(2)}</h2>
            <h2>Net Amount: ${netAmount.toFixed(2)}</h2>
        </>
    );
}


export default Cart;
