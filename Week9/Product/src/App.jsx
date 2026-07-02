import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './api/products'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import ProductList from './components/ProductList'
import CartPanel from './components/CartPanel'
import useShopStore, { ALL_CATEGORY } from './store/useShopStore'

function App() {
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const cart = useShopStore((state) => state.cart)
  const selectedCategory = useShopStore((state) => state.selectedCategory)
  const setSelectedCategory = useShopStore((state) => state.setSelectedCategory)
  const addToCart = useShopStore((state) => state.addToCart)
  const increaseQuantity = useShopStore((state) => state.increaseQuantity)
  const decreaseQuantity = useShopStore((state) => state.decreaseQuantity)
  const removeFromCart = useShopStore((state) => state.removeFromCart)

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  })

  const filteredProducts = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) {
      return products
    }

    return products.filter((product) => product.category === selectedCategory)
  }, [products, selectedCategory])

  const cartItems = useMemo(() => {
    const productMap = new Map(products.map((product) => [product.id, product]))

    return cart
      .map((item) => {
        const product = productMap.get(item.id)
        return product ? { ...product, quantity: item.quantity } : null
      })
      .filter(Boolean)
  }, [cart, products])

  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product)
      setIsOrderComplete(false)
    },
    [addToCart],
  )

  const handleIncrease = useCallback(
    (product) => {
      increaseQuantity(product)
    },
    [increaseQuantity],
  )

  const handleDecrease = useCallback(
    (productId) => {
      decreaseQuantity(productId)
    },
    [decreaseQuantity],
  )

  const handleRemove = useCallback(
    (productId) => {
      removeFromCart(productId)
    },
    [removeFromCart],
  )

  return (
    <div className="app">
      <Header totalCount={totalCount} totalPrice={totalPrice} />

      <div className="app__body">
        <main className="app__main">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <ProductList
            products={filteredProducts}
            isLoading={isLoading}
            isError={isError}
            error={error}
            onAddToCart={handleAddToCart}
          />
        </main>

        <CartPanel
          items={cartItems}
          totalPrice={totalPrice}
          isOrderComplete={isOrderComplete}
          onCheckoutSuccess={() => setIsOrderComplete(true)}
          onContinueShopping={() => setIsOrderComplete(false)}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
        />
      </div>
    </div>
  )
}

export default App
