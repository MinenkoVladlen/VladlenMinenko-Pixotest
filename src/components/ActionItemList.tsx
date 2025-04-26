import { FavoriteBorderOutlined, FavoriteOutlined, InfoOutlined } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeFromCart, addToCart } from '../features/cart/cartSlice'
import { Product } from "../types/Product";
import { Link } from "react-router-dom";

interface ActionItemListProps {
    product: Product
}

const ActionItemList: React.FC<ActionItemListProps> = ({ product }) => {
    const [isInCart, setIsInCart] = useState(false);
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cart.items);

    useEffect(() => {
        setIsInCart(cartItems.some(item => item.id === product.id))
    }, [cartItems])

    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id))
    }

    return (
        <Box>
            <IconButton sx={{ marginRight: 1 }} onClick={isInCart ? handleRemoveFromCart : handleAddToCart}>
                {isInCart ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
            </IconButton>
            <IconButton edge="end" component={Link} to={`/product/${product.id}`}>
                <InfoOutlined />
            </IconButton>
        </Box>
    )
}

export default ActionItemList;