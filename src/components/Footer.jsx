import { Facebook, Instagram, Mail } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <a href="#" className="text-lg font-bold text-white hover:text-yellow-500">UPTC - Store</a>
        </div>
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-2">Síguenos en:</h2>
          <ul className="flex justify-center md:justify-start space-x-4">
            <li className="flex items-center space-x-2">
              <Instagram size={24} className="text-white hover:text-yellow-500" />
              <a href="#" className="text-white hover:text-yellow-500">@uptcstore</a>
            </li>
            <li className="flex items-center space-x-2">
              <Facebook size={24} className="text-white hover:text-yellow-500" />
              <a href="#" className="text-white hover:text-yellow-500">uptcstore</a>
            </li>
          </ul>
        </div>
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-2">Contacto:</h2>
          <a href="mailto:unidademprendimiento.sogamoso@uptc.edu.co" className="text-white hover:text-yellow-500 flex items-center space-x-2">
            <Mail size={24} className="text-white hover:text-yellow-500" />
            <span>unidademprendimiento.sogamoso@uptc.edu.co</span>
          </a>
        </div>
        <div className="text-center md:text-right">
          <p className="text-white">All rights reserved &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
