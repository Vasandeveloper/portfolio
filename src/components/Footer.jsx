import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-1">
              Keerthivasan Govindaraju
            </h3>
            <p className="text-gray-400 text-sm">
              ECE Student | Embedded & VLSI Enthusiast
            </p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://github.com/Vasandeveloper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/keerthivasan-govindaraju-364076319"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm flex items-center justify-center md:justify-end">
              © {currentYear} Keerthivasan Govindaraju. Made with{' '}
              <span className="mx-1 text-red-500">
                <FaHeart />
              </span>
              & React
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
