import './DiscoverCommon.css';

const TOPICS = [
  'Mars', 'Nebula', 'Astronaut', 'Earth',
  'Moon', 'Rocket', 'Galaxy', 'Saturn',
  'Hubble', 'Apollo'
];

const QuickTopics = ({onSelect, activeQuery}) => {
  return(
    <div className='quick-topics d-flex flex-wrap justify-content-center gap-2 mb-4'>
      {TOPICS.map((topic) => (
        <button key={topic} 
        className={`quick-topics_chip ${activeQuery?.toLowerCase() === topic.toLocaleLowerCase() ? 'quick-topics_chip-active' : ''}`}
        onClick={() => onSelect(topic)}>
          {topic}
        </button>
      ))}
    </div>
  );
};

export default QuickTopics;