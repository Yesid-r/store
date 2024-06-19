import { Facebook, Instagram, Mail } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="logo">
          <a href="#" className="text- font-bold text-white hover:text-yellow-500">UPTC - Store</a>
        </div>
        <div className="social-media">
          <h2 className="text-xl font-bold text-white hover:text-yellow-500">Síguenos en:</h2>
          <ul className="flex justify-start">
            <li className="mr-4">
              <Instagram size={24} className="text-white hover:text-yellow-500" />
              <a href="#" className="text-white hover:text-yellow-500">@uptcstore</a>
            </li>
            <li className="mr-4">
              <Facebook size={24} className="text-white hover:text-yellow-500" />
              <a href="#" className="text-white hover:text-yellow-500">uptcstore</a>
            </li>
          </ul>
        </div>
        <div className="contact">
          <h2 className="text-xl font-bold text-white hover:text-yellow-500">Contacto:</h2>
          <a href="mailto:unidademprendimiento.sogamoso@uptc.edu.co" className="text-white hover:text-yellow-500">
            <Mail size={24} className="text-white hover:text-yellow-500" />
            unidademprendimiento.sogamoso@uptc.edu.co
          </a>
        </div>
        <p className="py-2 text-white sm:py-0">All rights reserved &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;