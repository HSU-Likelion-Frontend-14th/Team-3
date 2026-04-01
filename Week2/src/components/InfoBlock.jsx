import '../styles/components/InfoBlock.scss'

function InfoBlock({ title, lines }) {
  return (
    <article className="info-block">
      <h3>{title}</h3>
      <p>
        {lines.map((line, index) => (
          <span key={`${title}-${line}`}>
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </article>
  )
}

export default InfoBlock
