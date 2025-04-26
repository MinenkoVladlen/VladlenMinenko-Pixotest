import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'
import { Product } from '../types/Product'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { removeFromCart, addToCart } from '../features/cart/cartSlice'

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    sx={{ objectFit: 'contain', height: 200, p: 2 }}
                    image={product.image}
                    alt={product.title}
                />
            </Link>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.price} $
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button size="small" onClick={isInCart ? handleRemoveFromCart : handleAddToCart}>
                    {isInCart ? "Remove from cart" : 'Add to cart'}
                </Button>
                <Button size="small" component={Link} to={`/product/${product.id}`}>
                    More details
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard
