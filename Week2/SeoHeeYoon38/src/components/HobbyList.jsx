import HobbyItem from './HobbyItem';
import './HobbyList.scss';

const HobbyList = () => {
  const hobbies = [
    { id: 1, title: '영화보기', imgSrc: '/영화보기.jpeg' },
    { id: 2, title: '음악듣기', imgSrc: '/음악듣기.jpeg' },
    { id: 3, title: '공연보기', imgSrc: '/공연보기.jpeg' }
  ];

  return (
    <section id="hobby" className="hobby-section">
      <h2 className="section-title">HOBBY</h2>
      <div className="hobby-container">
        {/* map() 함수를 사용해 배열의 데이터를 하나씩 꺼내 HobbyItem 컴포넌트로 렌더링 */}
        {hobbies.map((hobby) => (
          <HobbyItem 
            key={hobby.id}       
            title={hobby.title}  // Props 전달
            imgSrc={hobby.imgSrc} // Props 전달
          />
        ))}
      </div>
    </section>
  );
};

export default HobbyList;