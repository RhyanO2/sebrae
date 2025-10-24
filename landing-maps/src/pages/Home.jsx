import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Home.css";
import ProjectSection from "../components/ProjectSection/ProjectSection.jsx";
import EcopurriffSection from "../components/EcopurriffSection/EcopurriffSection.jsx";
import Header from "../components/Header/Header.jsx";
import { FaCrosshairs } from "react-icons/fa";

export default function Home() {
  const markers = [
    // Pontos de Descarte de Lixo Eletrônico
    {
      id: 1,
      pos: [-3.6894, -40.3488],
      tipo: "descarte",
      titulo: "Centro de Descarte - Centro",
      endereco: "Rua Dom José, 123 - Centro, Sobral, CE",
      cep: "62010-290",
      horario: "Seg a Sex, 08h às 18h",
      telefone: "(88) 3621-1111",
      email: "centro@ecopurriffmap.com",
      responsavel: "João Silva",
      capacidade: "500 kg/dia",
      tiposAceitos: [
        "Computadores",
        "Celulares",
        "Tablets",
        "Impressoras",
        "Cabos",
      ],
      servicos: ["Desmontagem", "Certificado de Descarte", "Coleta Domiciliar"],
      descricao:
        "Ponto de coleta para descarte seguro de lixo eletrônico. Aceita computadores, celulares, tablets e outros dispositivos.",
      observacoes:
        "Necessário agendamento para grandes volumes. Certificado de descarte emitido gratuitamente.",
    },
    {
      id: 2,
      pos: [-3.6854, -40.3512],
      tipo: "descarte",
      titulo: "Centro de Descarte - Derby",
      endereco: "Av. Dr. Guarany, 500 - Derby, Sobral, CE",
      cep: "62020-110",
      horario: "Seg a Sáb, 09h às 17h",
      telefone: "(88) 3621-2222",
      email: "derby@ecopurriffmap.com",
      responsavel: "Maria Santos",
      capacidade: "300 kg/dia",
      tiposAceitos: [
        "Computadores",
        "Smartphones",
        "Baterias",
        "Placas Eletrônicas",
      ],
      servicos: [
        "Desmontagem Técnica",
        "Separação de Materiais",
        "Relatório Ambiental",
      ],
      descricao:
        "Ponto de coleta especializado em lixo eletrônico com equipe técnica para desmontagem segura.",
      observacoes:
        "Especializado em equipamentos industriais. Atendimento técnico especializado.",
    },
    {
      id: 3,
      pos: [-3.685047549930062, -40.34695330868966],
      tipo: "descarte",
      titulo: "Secretaria da Conservação e Serviços Públicos",
      endereco:
        "Vigilância Sanitária - R. Dr. João do Monte - Centro, Sobral - CE",
      cep: "62010-220",
      horario: "Seg a Dom, 10h às 22h",
      telefone: "(88) 3611-3357",
      email: "shopping@ecopurriffmap.com",
      responsavel: "Null",
      capacidade: "Null",
      tiposAceitos: ["Celulares", "Tablets", "Fones", "Carregadores", "Pilhas"],
      servicos: [
        "Coleta Expressa",
        "Atendimento ao Cliente",
        "Educação Ambiental",
      ],
      descricao:
        "Ponto de coleta em shopping center para facilitar o descarte de pequenos eletrônicos.",
      observacoes: "Null",
    },
    // Locais com Ecopurriff Instalados
    {
      id: 4,
      pos: [-3.688, -40.347],
      tipo: "ecopurriff",
      titulo: "Ecopurriff - Aterro Municipal",
      endereco: "Aterro Sanitário Municipal - Zona Rural, Sobral, CE",
      cep: "62050-000",
      horario: "24h - Monitoramento contínuo",
      telefone: "(88) 3621-4444",
      email: "aterro@ecopurriffmap.com",
      responsavel: "Dr. Pedro Almeida",
      dataInstalacao: "15/03/2024",
      capacidadeFiltragem: "10.000 m³/h de gases",
      eficiencia: "95% de captura de gases tóxicos",
      sensores: ["CO2", "Metano", "Compostos Orgânicos Voláteis"],
      manutencao: "Quinzenal - Próxima: 30/10/2024",
      descricao:
        "Sistema Ecopurriff instalado para captura de gases tóxicos do lixo eletrônico depositado no aterro.",
      observacoes:
        "Sistema principal com maior capacidade. Monitoramento remoto 24h.",
    },
    {
      id: 5,
      pos: [-3.684, -40.353],
      tipo: "ecopurriff",
      titulo: "Ecopurriff - Zona Industrial",
      endereco: "Distrito Industrial - Sobral, CE",
      cep: "62030-000",
      horario: "24h - Operação automática",
      telefone: "(88) 3621-5555",
      email: "industrial@ecopurriffmap.com",
      responsavel: "Eng. Ana Costa",
      dataInstalacao: "22/05/2024",
      capacidadeFiltragem: "7.500 m³/h de gases",
      eficiencia: "92% de captura de gases tóxicos",
      sensores: ["NOx", "SOx", "Particulados", "Metais Pesados"],
      manutencao: "Mensal - Próxima: 25/10/2024",
      descricao:
        "Barreira Ecopurriff protegendo área industrial contra gases poluentes de resíduos eletrônicos.",
      observacoes:
        "Proteção para 15 empresas da zona industrial. Sistema automatizado.",
    },
    {
      id: 6,
      pos: [-3.691, -40.34],
      tipo: "ecopurriff",
      titulo: "Ecopurriff - Campus Universitário",
      endereco: "Universidade Federal do Ceará - Campus Sobral, CE",
      cep: "62040-370",
      horario: "24h - Projeto piloto",
      telefone: "(88) 3621-6666",
      email: "campus@ecopurriffmap.com",
      responsavel: "Prof. Dr. Roberto Lima",
      dataInstalacao: "10/08/2024",
      capacidadeFiltragem: "3.000 m³/h de gases",
      eficiencia: "88% de captura de gases tóxicos",
      sensores: ["CO", "CO2", "Ozônio", "Compostos Aromáticos"],
      manutencao: "Semanal - Próxima: 28/10/2024",
      descricao:
        "Projeto piloto do Ecopurriff em parceria com a universidade para pesquisa e desenvolvimento.",
      observacoes:
        "Projeto de pesquisa com dados coletados para estudos acadêmicos.",
    },
  ];

  const [localSelecionado, setLocalSelecionado] = useState(null);

  // Criador de ícones com “pulse ring” no CSS
  const createEmojiIcon = (emoji) =>
    L.divIcon({
      html: `<div class="custom-emoji-icon">
        <span class="pulse-ring"></span>
        <span class="emoji">${emoji}</span>
      </div>`,
      className: "custom-emoji-wrapper",
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -20],
    });

  const descarteIcon = createEmojiIcon("🗑️");
  const ecopurriffIcon = createEmojiIcon("🌱");

  // Reveal on scroll (sem libs)
  const revealRef = useRef([]);
  useEffect(() => {
    const els = revealRef.current.filter(Boolean);
    if (!("IntersectionObserver" in window) || els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("reveal--visible");
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const setRevealRef = (el, index) => {
    revealRef.current[index] = el;
  };

  const getHeaderHeight = () => {
    const v = getComputedStyle(document.documentElement).getPropertyValue(
      "--header-h"
    );
    return parseFloat(v) || 64; // fallback
  };

  const scrollWithOffset = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight();
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="home">
      {/* HERO */}
      <Header />
      <div className="header-spacer" aria-hidden />
      <section className="hero" id="home-top">
        <div className="hero__bg" aria-hidden />
        <div className="hero__content">
          <h1 className="hero__title">
            Ecopurriff<span className="hero__spark">.</span>
          </h1>
          <p className="hero__subtitle">
            Uma barreira sustentável para{" "}
            <strong>capturar gases tóxicos</strong> do lixo eletrônico e
            transformar cidades em <strong>ecossistemas mais seguros</strong>.
          </p>
          <div className="hero__cta">
            <a
              href="#mapa"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                scrollWithOffset("mapa");
              }}
            >
              Ver mapa
            </a>
            <a
              href="#video"
              className="btn btn--ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollWithOffset("video");
              }}
            >
              Assistir vídeo
            </a>
          </div>
          <div className="hero__stats">
            <div className="stat">
              <span className="stat__num">R$ 1</span>
              <span className="stat__label">custo/unidade</span>
            </div>
            <div className="stat">
              <span className="stat__num">95%</span>
              <span className="stat__label">eficiência (piloto)</span>
            </div>
            <div className="stat">
              <span className="stat__num">24h</span>
              <span className="stat__label">monitoramento</span>
            </div>
          </div>
        </div>
        <div className="hero__curve" aria-hidden />
      </section>

      {/* LEGENDA */}
      <div
        className="legend reveal"
        id="mapa"
        ref={(el) => setRevealRef(el, 0)}
      >
        <div className="legend__chip legend__chip--descarte">
          <span className="legend__emoji">🗑️</span>
          <span className="legend__text">Pontos de Descarte</span>
        </div>
        <div className="legend__chip legend__chip--eco">
          <span className="legend__emoji">🌱</span>
          <span className="legend__text">Locais com Ecopurriff</span>
        </div>
      </div>

      {/* MAPA */}
      <div className="map-container">
        <MapContainer
          center={[-3.687, -40.349]}
          zoom={14}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.pos}
              icon={marker.tipo === "descarte" ? descarteIcon : ecopurriffIcon}
              eventHandlers={{ click: () => setLocalSelecionado(marker) }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div>
                  <strong>{marker.titulo}</strong>
                  <br />
                  <span
                    style={{
                      color: marker.tipo === "descarte" ? "#e74c3c" : "#27ae60",
                      fontWeight: "bold",
                    }}
                  >
                    {marker.tipo === "descarte"
                      ? "🗑️ Descarte"
                      : "🌱 Ecopurriff"}
                  </span>
                  <br />
                  {marker.endereco.split(" - ")[0]}
                </div>
              </Tooltip>
            </Marker>
          ))}
          <ResetMapButton center={[-3.687, -40.349]} zoom={14} />
        </MapContainer>
      </div>

      {/* PROJETO */}
      <section className="reveal" id="video" ref={(el) => setRevealRef(el, 2)}>
        <ProjectSection />
      </section>

      {/* ECOPURRIFF */}
      <section
        className="reveal"
        id="ecopurriff"
        ref={(el) => setRevealRef(el, 3)}
      >
        <EcopurriffSection />
      </section>

      {/* MODAL */}
      {localSelecionado && (
        <div
          className="modal-overlay"
          onClick={() => setLocalSelecionado(null)}
        >
          <div
            className="modal-content glass"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setLocalSelecionado(null)}
            >
              ✕
            </button>

            <div
              className={`modal-badge ${
                localSelecionado.tipo === "descarte"
                  ? "modal-badge--descarte"
                  : "modal-badge--eco"
              }`}
            >
              <span>
                {localSelecionado.tipo === "descarte"
                  ? "🗑️ PONTO DE DESCARTE"
                  : "🌱 LOCAL COM ECOPURRIFF"}
              </span>
            </div>

            <h3 className="modal-title">📍 {localSelecionado.titulo}</h3>

            <div className="modal-section">
              <h4>📋 Informações Básicas</h4>
              <p>
                <strong>Endereço:</strong> {localSelecionado.endereco}
              </p>
              <p>
                <strong>CEP:</strong> {localSelecionado.cep}
              </p>
              <p>
                <strong>Horário:</strong> {localSelecionado.horario}
              </p>
              <p>
                <strong>Telefone:</strong> {localSelecionado.telefone}
              </p>
              {localSelecionado.email && (
                <p>
                  <strong>Email:</strong> {localSelecionado.email}
                </p>
              )}
              <p>
                <strong>Responsável:</strong> {localSelecionado.responsavel}
              </p>
            </div>

            {localSelecionado.tipo === "descarte" ? (
              <div className="modal-section">
                <h4 className="accent--descarte">♻️ Informações de Descarte</h4>
                <p>
                  <strong>Capacidade:</strong> {localSelecionado.capacidade}
                </p>
                <div>
                  <strong>Tipos Aceitos:</strong>
                  <ul>
                    {localSelecionado.tiposAceitos?.map((tipo, i) => (
                      <li key={i}>{tipo}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Serviços Oferecidos:</strong>
                  <ul>
                    {localSelecionado.servicos?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="modal-section">
                <h4 className="accent--eco">🌱 Informações do Ecopurriff</h4>
                <p>
                  <strong>Data de Instalação:</strong>{" "}
                  {localSelecionado.dataInstalacao}
                </p>
                <p>
                  <strong>Capacidade de Filtragem:</strong>{" "}
                  {localSelecionado.capacidadeFiltragem}
                </p>
                <p>
                  <strong>Eficiência:</strong> {localSelecionado.eficiencia}
                </p>
                <p>
                  <strong>Manutenção:</strong> {localSelecionado.manutencao}
                </p>
                <div>
                  <strong>Sensores Instalados:</strong>
                  <ul>
                    {localSelecionado.sensores?.map((sensor, i) => (
                      <li key={i}>{sensor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="modal-section">
              <h4>📝 Detalhes</h4>
              <p>
                <strong>Descrição:</strong> {localSelecionado.descricao}
              </p>
              {localSelecionado.observacoes && (
                <p>
                  <strong>Observações:</strong> {localSelecionado.observacoes}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* âncora para CTA “Assistir vídeo” */}
      <div id="video" />
    </div>
  );
}

function ResetMapButton({ center, zoom }) {
  const map = useMap();

  const handleClick = () => {
    map.setView(center, zoom, { animate: true });
  };

  return (
    <button className="reset-map-btn" onClick={handleClick}>
      <FaCrosshairs className="reset-map-icon" />
      <span>Centralizar</span>
    </button>
  );
}
