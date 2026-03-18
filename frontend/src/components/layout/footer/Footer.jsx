import './Footer.css';
const Footer = () => {
  return (
    <footer className="cosmos-footer">
      <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
        <span className="cosmos-footer_star">✦</span>
        <span className="cosmos-footer_brand">CosmosExplorer</span>
      </div>
      <p className="cosmos-footer_text mb-0">
        Powered by{' '}
        <a
          href="https://api.nasa.gov"
          target="_blank"
          rel="noreferrer"
          className="cosmos-footer_link"
        >
          NASA Open APIs
        </a>
        {' '} · Built by Yash Kalan · {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;