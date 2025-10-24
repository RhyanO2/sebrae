// Header.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  // Fechar com ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Travar scroll quando o drawer abrir
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (open) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }
  }, [open]);

  // Medir altura real do header e expor em --header-h (também para o spacer)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const apply = () => {
      const h = el.offsetHeight;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
      window.dispatchEvent(new Event("ecopurriff:header-resize"));
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  // <<< SCROLL COM OFFSET (em vez de scrollIntoView) >>>
  const scrollWithOffset = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const hVar = getComputedStyle(document.documentElement).getPropertyValue(
      "--header-h"
    );
    const headerH = parseFloat(hVar) || headerRef.current?.offsetHeight || 64;
    const y = target.getBoundingClientRect().top + window.pageYOffset - headerH;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <header ref={headerRef} className="lp-header lp-header--fixed">
        <div className="lp-header__container">
          <button
            className="lp-brand"
            onClick={() => scrollWithOffset("home-top")}
            aria-label="Início"
          >
            <span className="lp-brand__logo">🌿</span>
            <span className="lp-brand__text">Ecopurriff</span>
          </button>

          {/* Desktop */}
          <nav
            className="lp-nav lp-nav--desktop"
            aria-label="Navegação principal"
          >
            <button
              className="lp-nav__link"
              onClick={() => scrollWithOffset("home-top")}
            >
              Início
            </button>
            <button
              className="lp-nav__link"
              onClick={() => scrollWithOffset("mapa")}
            >
              Mapa
            </button>
            <button
              className="lp-nav__link"
              onClick={() => scrollWithOffset("video")}
            >
              Vídeo
            </button>
            <button
              className="lp-nav__link"
              onClick={() => scrollWithOffset("ecopurriff")}
            >
              Ecopurriff
            </button>
          </nav>

          {/* Burger / Drawer */}
          <button
            className="lp-burger"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="lp-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`burger-lines ${open ? "is-open" : ""}`}>
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`lp-overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <aside
        id="lp-drawer"
        className={`lp-drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-label="Menu"
      >
        <div className="lp-drawer__header">
          <span className="lp-drawer__title">Menu</span>
          <button
            className="lp-drawer__close"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>
        <nav className="lp-drawer__nav">
          <button
            className="lp-drawer__link"
            onClick={() => scrollWithOffset("home-top")}
          >
            Início
          </button>
          <button
            className="lp-drawer__link"
            onClick={() => scrollWithOffset("mapa")}
          >
            Mapa
          </button>
          <button
            className="lp-drawer__link"
            onClick={() => scrollWithOffset("video")}
          >
            Vídeo
          </button>
          <button
            className="lp-drawer__link"
            onClick={() => scrollWithOffset("ecopurriff")}
          >
            Ecopurriff
          </button>
        </nav>
        <div className="lp-drawer__footer">
          <small>© {new Date().getFullYear()} Ecopurriff</small>
        </div>
      </aside>
    </>
  );
}
