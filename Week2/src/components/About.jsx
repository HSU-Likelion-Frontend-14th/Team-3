import ProfileCard from './ProfileCard'
import InfoBlock from './InfoBlock'
import '../styles/components/About.scss'

function About() {
  const infoBlocks = [
    {
      title: 'EDUCATION',
      lines: ['한성대학교 컴퓨터공학부', '2021.03~2027.02'],
    },
    {
      title: 'SKILLS',
      lines: ['JavaScript', 'React', 'Java', 'Spring'],
    },
    {
      title: 'WORK',
      lines: ['프론트엔드 개발자'],
    },
    {
      title: 'ACTIVITIES',
      lines: ['멋쟁이사자처럼 14기'],
    },
  ]

  const profileData = {
    name: '김헌영',
    phone: '010.5652.3283',
    email: 'rlagjsdud3@hansung.ac.kr',
    address: '서울특별시 성북구 삼선교로 16길(삼선동2가)',
  }

  return (
    <section className="section" id="about">
      <h2 className="section-title">ABOUT</h2>

      <div className="about-layout">
        <ProfileCard {...profileData} />

        <div className="info-grid">
          {infoBlocks.map((block) => (
            <InfoBlock key={block.title} title={block.title} lines={block.lines} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
