import HobbyCard from './HobbyCard'
import foodImage from '../assets/food.jpg'
import filmImage from '../assets/film.jpg'
import japanImage from '../assets/japan.jpg'
import '../styles/components/Hobby.scss'

function Hobby() {
  const hobbies = [
    {
      title: '맛있는 음식 먹기',
      imageSrc: foodImage,
      imageAlt: '맛있는 음식 사진',
    },
    {
      title: '필름 사진 찍기',
      imageSrc: filmImage,
      imageAlt: '필름 카메라로 찍은 사진',
    },
    {
      title: '여행가기',
      imageSrc: japanImage,
      imageAlt: '일본 여행 사진',
    },
  ]

  return (
    <section className="section" id="hobby">
      <h2 className="section-title">HOBBY</h2>
      <div className="hobby-grid">
        {hobbies.map((hobby) => (
          <HobbyCard
            key={hobby.title}
            title={hobby.title}
            imageSrc={hobby.imageSrc}
            imageAlt={hobby.imageAlt}
          />
        ))}
      </div>
    </section>
  )
}

export default Hobby
