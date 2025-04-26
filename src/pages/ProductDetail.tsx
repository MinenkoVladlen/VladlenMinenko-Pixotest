import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Product } from '../types/Product'
import axios from 'axios'
import {
    Container,
    Typography,
    CircularProgress,
    Grid2,
    Card,
    CardMedia,
    CardContent,
    Button,
    IconButton,
    Box,
    Badge,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addToCart, removeFromCart } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const ProductDetail: React.FC = () => {
    const [isInCart, setIsInCart] = useState(false);
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cart.items)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
                setProduct(response.data)
            } catch (err) {
                setError('Error loading product.')
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id]);

    useEffect(() => {
        setIsInCart(cartItems.some(item => item.id === Number(id)))
    }, [cartItems])

    const handleAddToCart = () => {
        if (product) dispatch(addToCart(product))
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(Number(id)))
    }

    if (loading) return <CircularProgress />
    if (error) return <Typography color="error">{error}</Typography>
    if (!product) return <Typography>Product not found</Typography>

    return (
        <Container sx={{ mt: 4, minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton component={Link} to="/cart">
                    <Badge badgeContent={cartItems.length} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Box>
            <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.title}
                            sx={{ objectFit: 'contain', height: 400, p: 2 }}
                        />
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <CardContent>
                        <Typography variant="h4">{product.title}</Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {product.price} $
                        </Typography>
                        <Typography variant="body1">{product.description}</Typography>
                        <Typography variant="body2">Category: {product.category}</Typography>
                        <Typography variant="body2">
                            Rating: {product.rating.rate} ({product.rating.count} reviews)
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2 }} onClick={isInCart ? handleRemoveFromCart : handleAddToCart}>
                            {isInCart ? 'Remove from cart' : 'Add to cart'}
                        </Button>
                    </CardContent>
                </Grid2>
            </Grid2>
        </Container>
    )
}

export default ProductDetail
