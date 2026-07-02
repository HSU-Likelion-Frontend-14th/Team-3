import ProductCard from './ProductCard'

function ProductList({ products, isLoading, isError, error, onAddToCart }) {
  if (isLoading) {
    return <p className="empty">상품을 불러오는 중...</p>
  }

  if (isError) {
    return <p className="empty">상품을 불러오지 못했어요. {error.message}</p>
  }

  if (products.length === 0) {
    return <p className="empty">해당 카테고리에 상품이 없어요.</p>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}

export default ProductList
