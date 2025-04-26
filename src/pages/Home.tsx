import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchProducts } from '../features/products/productsSlice'
import {
    Container,
    Typography,
    CircularProgress,
    Grid2,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@mui/material'
import ProductCard from '../components/ProductCard'
import ProductHeader from '../components/ProductHeader'
import ActionItemList from '../components/ActionItemList'
import Cookies from 'js-cookie'

type ViewMode = 'grid' | 'list'

const getInitialViewMode = (): ViewMode => {
    const saved = Cookies.get('viewMode')
    return saved === 'list' ? 'list' : 'grid'
}

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const { items, loading, error } = useAppSelector(state => state.products)

    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('name')
    const [category, setCategory] = useState('')
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [view, setView] = useState<ViewMode>(getInitialViewMode)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const categories = useMemo(() => {
        const set = new Set(items.map(i => i.category))
        return Array.from(set)
    }, [items])

    const filteredProducts = useMemo(() => {
        return items
            .filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase()) &&
                (category ? p.category === category : true) &&
                p.price >= priceRange[0] &&
                p.price <= priceRange[1]
            )
            .sort((a, b) => {
                switch (sort) {
                    case 'price':
                        return a.price - b.price
                    case 'rating':
                        return b.rating.rate - a.rating.rate
                    default:
                        return a.title.localeCompare(b.title)
                }
            })
    }, [items, search, sort, category, priceRange])

    const handleViewChange = (newView: ViewMode) => {
        setView(newView)
        Cookies.set('viewMode', newView, { expires: 7 })
    }


    if (loading) return <CircularProgress />
    if (error) return <Typography color="error">{error}</Typography>

    return (
        <Container sx={{ mt: 4, minHeight: '100vh' }}>
            <ProductHeader
                view={view}
                onViewChange={handleViewChange}
                search={search}
                onSearchChange={setSearch}
                sort={sort}
                onSortChange={setSort}
                category={category}
                onCategoryChange={setCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                categories={categories}
            />
            <Typography variant="h5" gutterBottom>
                Find: {filteredProducts.length} products
            </Typography>
            {view === 'grid' ? (
                <Grid2 container spacing={3}>
                    {filteredProducts.map(product => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                            <ProductCard product={product} />
                        </Grid2>
                    ))}
                </Grid2>
            ) : (
                <List>
                    {filteredProducts.map(product => (
                        <ListItem key={product.id} divider secondaryAction={
                            <ActionItemList product={product} />
                        }>
                            <ListItemAvatar>
                                <Avatar src={product.image} variant="square" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${product.title} — $${product.price}`}
                                secondary={`Rating: ${product.rating.rate} | ${product.category}`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    )
}

export default Home
