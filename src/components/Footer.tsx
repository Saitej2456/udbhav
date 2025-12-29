import { useState } from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import PacManGame from "./PacManGame";

const Footer = () => {
  const [showGame, setShowGame] = useState(false);
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      icon: Twitter,
      href: "https://x.com/udbhav_iiits",
      label: "Twitter",
    },
    {
      icon: Github,
      href: "https://github.com/",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/udbhav-inter-iiit/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/udbhav.iiit",
      label: "Instagram",
    },
    {
      icon: Mail,
      href: "mailto:udbhav@iiits.in",
      label: "Email",
    },
  ];
  const footerLinks = [
    {
      title: "Event",
      links: [
        {
          name: "About",
          path: "/",
        },
        {
          name: "Sponsors",
          path: "/sponsors",
        },
        {
          name: "Prizes",
          path: "/",
        },
      ],
    },
    {
      title: "Participate",
      links: [
        {
          name: "IIITs",
          path: "/iiits",
        },
        {
          name: "Leaderboard",
          path: "/leaderboard/round-2",
        },
        {
          name: "Projects",
          path: "/projects",
        },
      ],
    },
    {
      title: "Connect",
      links: [
        {
          name: "Teams",
          path: "/teams",
        },
        {
          name: "Contact",
          path: "/",
        },
        {
          name: "FAQ",
          path: "/",
        },
      ],
    },
  ];
  return (
    <footer className="relative border-t border-border/50 bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <button
              onClick={() => setShowGame(true)}
              className="inline-block mb-6 cursor-pointer hover:scale-105 transition-transform"
              title="🎮"
            >
              <img
                src={logo}
                alt="UDBHAV"
                className="h-14 w-auto"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(0, 200, 200, 0.3))",
                  mixBlendMode: "screen",
                }}
              />
            </button>
            <p className="text-muted-foreground mb-6 max-w-md">
              Bringing together the brightest minds from 24 IIITs across India.
              A platform where innovation meets collaboration.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg border border-border bg-card hover:bg-primary/10 hover:border-primary/50 flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} UDBHAV - The Inter IIIT Hackathon. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-muted-foreground/50">
              First Edition
            </span>
            <div className="font-mono text-xs text-primary/30">
              {">"} System Online
              <span className="animate-pulse ml-1">_</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Overlay */}
      {/* <div className="absolute inset-0 grid-overlay pointer-events-none opacity-20" /> */}

      {/* Easter Egg Game */}
      <PacManGame isOpen={showGame} onClose={() => setShowGame(false)} />
    </footer>
  );
};
export default Footer;
