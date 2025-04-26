import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Button,
    Grid2,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useAppDispatch, useAppSelector } from '../hooks'
import { removeFromCart } from '../features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

const Cart: React.FC = () => {
    const cartItems = useAppSelector(state => state.cart.items)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id))
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <Container sx={{ mt: 4, minHeight: '100vh' }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                Back
            </Button>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Grid2 container sx={{ justifyContent: 'center' }}>
                    <Typography variant="h6">Your cart is empty </Typography>
                </Grid2>
            ) : (
                <>
                    <List>
                        {cartItems.map(item => (
                            <ListItem key={item.id} divider>
                                <ListItemAvatar>
                                    <Avatar src={item.image} variant="square" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${item.title}`}
                                    secondary={`Count: ${item.quantity} | Price: $${item.price}`}
                                />
                                <IconButton edge="end" onClick={() => handleRemove(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                </>
            )}
        </Container>
    )
}

export default Cart
