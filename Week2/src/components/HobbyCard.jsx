import '../styles/components/HobbyCard.scss'

function HobbyCard({ title, imageSrc, imageAlt }) {
  return (
    <article className="hobby-card">
      <h3>{title}</h3>
      <img src={imageSrc} alt={imageAlt} />
    </article>
  )
}

export default HobbyCard
