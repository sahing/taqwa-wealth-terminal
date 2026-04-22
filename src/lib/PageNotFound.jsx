import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-onyx noise-bg text-white">
      <div className="max-w-lg w-full text-center">
        <div className="font-serif text-9xl gold-text-gradient font-light mb-4">404</div>
        <div className="hairline mx-auto w-24 mb-8" />
        <div className="text-[10px] uppercase tracking-[0.5em] text-gold mb-4">Page Not Found</div>
        <h2 className="font-serif text-3xl text-white font-light leading-tight mb-6">
          This path is not yet<br /><span className="italic">part of the amanah.</span>
        </h2>
        <p className="text-white/50 font-light mb-10">The page you are seeking does not exist in our ledger. Return to the beginning.</p>
        <Link to="/" className="inline-block px-10 py-4 bg-gold text-onyx text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-champagne transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}