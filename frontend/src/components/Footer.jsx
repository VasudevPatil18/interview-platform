import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-base-content">Talent IQ</h2>
          <p className="mt-3 text-sm text-base-content/60">
            High-quality video conferencing for meetings, webinars, and collaboration.
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-3 text-base-content">Features</h3>
          <ul className="space-y-2 text-sm text-base-content/60">
            <li>HD Video Calls</li>
            <li>Screen Sharing</li>
            <li>Chat &amp; Messaging</li>
            <li>Recording</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3 text-base-content">Company</h3>
          <ul className="space-y-2 text-sm text-base-content/60">
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
          </ul>
        </div>

        {/* Social + Feedback */}
        <div>
          <h3 className="font-semibold mb-3 text-base-content">Connect</h3>
          <div className="flex gap-4 text-sm text-base-content/60">
            <a href="#" className="hover:text-base-content transition-colors">Facebook</a>
            <a href="#" className="hover:text-base-content transition-colors">Twitter</a>
            <a href="#" className="hover:text-base-content transition-colors">LinkedIn</a>
          </div>
          <p className="mt-4 text-sm text-base-content/60">support@talentiq.com</p>
          <Link
            to="/feedback"
            className="mt-4 inline-flex items-center gap-2 btn btn-sm btn-outline btn-primary"
          >
            💬 Share Feedback
          </Link>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-sm mt-10 border-t border-base-300 pt-5 text-base-content/50">
        © {new Date().getFullYear()} Talent IQ. All rights reserved. &nbsp;|&nbsp;
        <Link to="/feedback" className="link link-primary">Give Feedback</Link>
      </div>
    </footer>
  );
}

export default Footer;
