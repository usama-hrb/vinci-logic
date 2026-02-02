import { FadeUp } from "./animate/FadeUp";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "/docs" },
      { label: "API", href: "/api" },
    ],
    company: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Cookies", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex justify-between items-center border-x border-b border-border/50">
        <Logo />
        <div className="flex gap-4 mt-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
              aria-label={label}
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-x  border-border/50 ">
        <div className="grid grid-cols-2 md:grid-cols-8 gap-8 md:gap-12 ">
          {/* Links Sections */}
          <div className="col-span-1 md:col-span-2">
            <FadeUp delay={0.2}>
              <h3 className="text-md font-semibold text-foreground mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-md text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          <div className="col-span-1 md:col-span-2">
            <FadeUp delay={0.3}>
              <h3 className="text-md font-semibold text-foreground mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-md text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          <div className="col-span-1 md:col-span-2">
            <FadeUp delay={0.4}>
              <h3 className="text-md font-semibold text-foreground mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-md text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          <div className="col-span-2 md:col-span-2">
            <FadeUp delay={0.5}>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Talk to Vinci Logic
              </h3>

              <p className="text-md text-muted-foreground mb-6 max-w-sm">
                Have questions about detection-as-code, integrations, or
                architecture? Let’s talk.
              </p>

              <button className="inline-flex items-center justify-center h-9 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Contact us
              </button>
            </FadeUp>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          {/* <FadeUp delay={0.6}> */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Vinci Logic.
          </p>
          {/* </FadeUp> */}
        </div>
      </div>
    </footer>
  );
}
