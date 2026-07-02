import { memo } from 'react'

function ProductCard({ product, onAddToCart }) {
  console.log(`${product.name} 카드 렌더링됨`)
  const isSoldOut = product.stock === 0

  return (
    <div className="product-card">
      <div className="product-card__thumb">{product.emoji}</div>
      <span className="product-card__category">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="product-card__price">{product.price.toLocaleString()}원</p>
      <p className={isSoldOut ? 'product-card__stock product-card__stock--empty' : 'product-card__stock'}>
        {isSoldOut ? '품절' : `재고 ${product.stock}개`}
      </p>
      <button disabled={isSoldOut} onClick={() => onAddToCart(product)}>
        담기
      </button>
    </div>
  )
}

export default memo(ProductCard)
