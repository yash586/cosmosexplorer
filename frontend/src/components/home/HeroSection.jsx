import './HeroSection.css';

const HeroSection = () => {
  
  const handleStartJourney = () => {
    document.getElementById('cards').scrollIntoView({behavior: 'smooth'});
  }

  return (
    <section className="hero-section">
      {/* Star particles background */}
      <div className="hero-section_stars" />

      <div className="hero-section_content">
        {/* Logo mark */}
        <div className="hero-section_icon">✦</div>

        {/* Title */}
        <h1 className="hero-section_title">
          Cosmos<span className="hero-section_title-accent">Explorer</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-section_subtitle">
          Your gateway to the universe
        </p>

        {/* Description */}
        <p className="hero-section_description">
          Explore NASA's live data — asteroids, astronomy, space imagery
          and Earth events all in one immersive experience powered by
          NASA's Open APIs
        </p>

        {/* CTA Button */}
        <button
          className="hero-section_btn"
          onClick={handleStartJourney}
        >
          Start Your Journey →
        </button>
      </div>
      <div className="hero_section_earth-wrap">
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80"
          alt="Earth from ISS"
          className="hero_section_earth-img"
        />
        <div className="hero_section_earth-fade" />
      </div>
    </section>
  );
};

export default HeroSection;