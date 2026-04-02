import './HobbyItem.scss';

// 부모 컴포넌트로부터 title과 imgSrc 데이터를 Props로 받아옴.
const HobbyItem = ({ title, imgSrc }) => {
  return (
    <div className="hobby-card">
      <div className="hobby-card-title">{title}</div>
      <img src={imgSrc} alt={title} className="hobby-img" />
    </div>
  );
};

export default HobbyItem;