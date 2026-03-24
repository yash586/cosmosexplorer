import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ICONS }  from '../../../constants/icons';
import styles from './HeroSection.module.css';

/**
 * Hero Section Home page landing area
 * Full screen section with Earth backdrop image
 * Smooth scrolls to feature cards on CTA click
 * @returns {JSX.Element} Hero section
 */
const HeroSection = () => {
  /**
   * Scrolls smoothly to feature cards section
   */
  const handleStartJourney = () => {
    document
      .getElementById('cards')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={ICONS.LOGO} />
        </div>
        <h1 className={styles.title}>
          Cosmos
          <span className={styles.titleAccent}>Explorer</span>
        </h1>
        <p className={styles.subtitle}>
          Your gateway to the universe
        </p>
        <p className={styles.description}>
          Explore NASA's live data asteroids, astronomy, space imagery
          and Earth events all in one immersive experience powered by
          NASA's Open APIs
        </p>
        <button
          className={styles.btn}
          onClick={handleStartJourney}
        >
          Start Your Journey
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      {/* Earth image */}
      <div className={styles.earthWrap}>
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80"
          alt="Earth from space"
          className={styles.earthImg}
          loading="eager"
        />
        <div className={styles.earthFade} />
      </div>

    </section>
  );
};

export default HeroSection;