import {
    Box,
    Grid2,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    IconButton,
    Slider,
    Badge,
} from '@mui/material'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewListIcon from '@mui/icons-material/ViewList'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useAppSelector } from '../hooks'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    view: 'grid' | 'list'
    onViewChange: (view: 'grid' | 'list') => void
    search: string
    onSearchChange: (value: string) => void
    sort: string
    onSortChange: (value: string) => void
    category: string
    onCategoryChange: (value: string) => void
    priceRange: number[]
    onPriceRangeChange: (value: number[]) => void
    categories: string[]
}

const ProductHeader: React.FC<Props> = ({
    view,
    onViewChange,
    search,
    onSearchChange,
    sort,
    onSortChange,
    category,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    categories
}) => {
    const cartItems = useAppSelector(state => state.cart.items)
    const [localPrice, setLocalPrice] = useState<number[]>(priceRange)

    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setLocalPrice(newValue)
            onPriceRangeChange(newValue)
        }
    }

    return (
        <Box sx={{ mb: 3 }}>
            <Grid2 container spacing={2} alignItems="center">
                <Grid2 size={{ xs: 12, sm: 4 }}>
                    <TextField
                        fullWidth
                        label="Search"
                        value={search}
                        onChange={e => onSearchChange(e.target.value)}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6, sm: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel>Sorting by</InputLabel>
                        <Select value={sort} onChange={e => onSortChange(e.target.value)} label="Sorting by">
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                            <MenuItem value="rating">Raiting</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={{ xs: 6, sm: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select value={category} onChange={e => onCategoryChange(e.target.value)} label="Category">
                            <MenuItem value="">All</MenuItem>
                            {categories.map(cat => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 2 }}>
                    <div style={{ width: '80%', margin: 'auto' }}>
                        Price
                        <Slider
                            value={localPrice}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000}
                        />
                    </div>
                </Grid2>
                <Grid2 container sx={{ justifyContent: 'center' }} size={{ xs: 6, sm: 1 }}>
                    <IconButton onClick={() => onViewChange(view === 'grid' ? 'list' : 'grid')}>
                        {view === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
                    </IconButton>
                </Grid2>
                <Grid2 container sx={{ justifyContent: 'center' }} size={{ xs: 6, sm: 1 }}>
                    <IconButton component={Link} to="/cart">
                        <Badge badgeContent={cartItems.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default ProductHeader
