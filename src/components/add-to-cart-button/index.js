'use client'

import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button"
import { addToCart, removeFromCart } from "@/store/slices/cart-slice";

/**
 * Component này được sử dụng trong ProductDetails.jsx
 * ProductDetails.jsx nằm trong folder [details]
 */

const AddToCartButton = ({ productItem }) => {

    const { cart } = useSelector(state => state);
    console.log(cart?.cartItems);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(productItem))
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(productItem?.id))
        // console.log(productItem?.id);
    }

    return (
        <div className="mt-8 max-w-md">
            <Button 
                type="button"
                onClick={cart?.cartItems.some((item) => item.id === productItem.id) ? handleRemoveFromCart : handleAddToCart}
            >
                {
                    cart?.cartItems.some((item) => item.id === productItem.id) ? "Remove from cart" : "Add to cart"
                }
            </Button>
        </div>
    )
}

export default AddToCartButton