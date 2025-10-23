import { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Home.css";
import ProjectSection from "../components/ProjectSection/ProjectSection.jsx";
import EcopurriffSection from "../components/EcopurriffSection/EcopurriffSection.jsx";

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
      tiposAceitos: ["Computadores", "Celulares", "Tablets", "Impressoras", "Cabos"],
      servicos: ["Desmontagem", "Certificado de Descarte", "Coleta Domiciliar"],
      descricao: "Ponto de coleta para descarte seguro de lixo eletrônico. Aceita computadores, celulares, tablets e outros dispositivos.",
      observacoes: "Necessário agendamento para grandes volumes. Certificado de descarte emitido gratuitamente.",
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
      tiposAceitos: ["Computadores", "Smartphones", "Baterias", "Placas Eletrônicas"],
      servicos: ["Desmontagem Técnica", "Separação de Materiais", "Relatório Ambiental"],
      descricao: "Ponto de coleta especializado em lixo eletrônico com equipe técnica para desmontagem segura.",
      observacoes: "Especializado em equipamentos industriais. Atendimento técnico especializado.",
    },
    {
      id: 3,
      pos: [-3.685047549930062, -40.34695330868966],
      tipo: "descarte",
      titulo: "Secretaria da Conservação e Serviços Públicos",
      endereco: "Vigilância Sanitária - R. Dr. João do Monte - Centro, Sobral - CE",
      cep: "62010-220",
      horario: "Seg a Dom, 10h às 22h",
      telefone: "(88) 3611-3357",
      email: "shopping@ecopurriffmap.com",
      responsavel: "Null",
      capacidade: "Null",
      tiposAceitos: ["Celulares", "Tablets", "Fones", "Carregadores", "Pilhas"],
      servicos: ["Coleta Expressa", "Atendimento ao Cliente", "Educação Ambiental"],
      descricao: "Ponto de coleta em shopping center para facilitar o descarte de pequenos eletrônicos.",
      observacoes: "Null",
    },
    // Locais com Ecopurriff Instalados
    {
      id: 4,
      pos: [-3.6880, -40.3470],
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
      descricao: "Sistema Ecopurriff instalado para captura de gases tóxicos do lixo eletrônico depositado no aterro.",
      observacoes: "Sistema principal com maior capacidade. Monitoramento remoto 24h.",
    },
    {
      id: 5,
      pos: [-3.6840, -40.3530],
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
      descricao: "Barreira Ecopurriff protegendo área industrial contra gases poluentes de resíduos eletrônicos.",
      observacoes: "Proteção para 15 empresas da zona industrial. Sistema automatizado.",
    },
    {
      id: 6,
      pos: [-3.6910, -40.3400],
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
      descricao: "Projeto piloto do Ecopurriff em parceria com a universidade para pesquisa e desenvolvimento.",
      observacoes: "Projeto de pesquisa com dados coletados para estudos acadêmicos.",
    },
  ];

  const [localSelecionado, setLocalSelecionado] = useState(null);

  // Função para criar ícone com emoji
  const createEmojiIcon = (emoji) => {
    return L.divIcon({
      html: `<div style="
        font-size: 30px;
        text-align: center;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 50%;
        border: 3px solid #333;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">${emoji}</div>`,
      className: 'custom-emoji-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });
  };

  // Ícone para pontos de descarte de lixo eletrônico
  const descarteIcon = createEmojiIcon('🗑️');

  // Ícone para locais com Ecopurriff
  const ecopurriffIcon = createEmojiIcon('🌱');


  return (
    <div className="home">
      <div className="home-content">
        <h2>Bem-vindo!</h2>
        <p>
          Explore nosso mapa interativo e descubra pontos estratégicos para o descarte 
          seguro de lixo eletrônico e localizações onde você pode encontrar os dispositivos 
          Ecopurriff em funcionamento. Clique em um marcador para ver mais detalhes sobre 
          cada local e contribua para um futuro mais sustentável.
        </p>
      </div>

      {/* LEGENDA DO MAPA */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "30px", 
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          backgroundColor: "#ffe6e6",
          padding: "8px 15px",
          borderRadius: "20px",
          border: "2px solid #e74c3c"
        }}>
          <span style={{ fontSize: "20px" }}>🗑️</span>
          <span style={{ color: "#e74c3c", fontWeight: "bold" }}>Pontos de Descarte</span>
        </div>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          backgroundColor: "#e6f7e6",
          padding: "8px 15px",
          borderRadius: "20px",
          border: "2px solid #27ae60"
        }}>
          <span style={{ fontSize: "20px" }}>🌱</span>
          <span style={{ color: "#27ae60", fontWeight: "bold" }}>Locais com Ecopurriff</span>
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
              eventHandlers={{
                click: () => setLocalSelecionado(marker),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div>
                  <strong>{marker.titulo}</strong>
                  <br />
                  <span style={{ 
                    color: marker.tipo === "descarte" ? "#e74c3c" : "#27ae60",
                    fontWeight: "bold"
                  }}>
                    {marker.tipo === "descarte" ? "🗑️ Descarte" : "🌱 Ecopurriff"}
                  </span>
                  <br />
                  {marker.endereco.split(" - ")[0]}
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* SEÇÃO DE PROJETO */}
      <ProjectSection />

      {/* SEÇÃO ECOPURRIFF */}
      <EcopurriffSection />

      {/* MODAL */}
      {localSelecionado && (
        <div
          className="modal-overlay"
          onClick={() => setLocalSelecionado(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setLocalSelecionado(null)}
            >
              ✕
            </button>
            <div style={{ 
              backgroundColor: localSelecionado.tipo === "descarte" ? "#ffe6e6" : "#e6f7e6",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              <span style={{ 
                color: localSelecionado.tipo === "descarte" ? "#e74c3c" : "#27ae60",
                fontWeight: "bold",
                fontSize: "18px"
              }}>
                {localSelecionado.tipo === "descarte" ? "🗑️ PONTO DE DESCARTE" : "🌱 LOCAL COM ECOPURRIFF"}
              </span>
            </div>

            <h3 style={{ marginBottom: "20px", color: "#2c3e50" }}>📍 {localSelecionado.titulo}</h3>
            
            {/* Informações Básicas */}
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ color: "#34495e", borderBottom: "2px solid #ecf0f1", paddingBottom: "5px" }}>📋 Informações Básicas</h4>
              <p><strong>Endereço:</strong> {localSelecionado.endereco}</p>
              <p><strong>CEP:</strong> {localSelecionado.cep}</p>
              <p><strong>Horário:</strong> {localSelecionado.horario}</p>
              <p><strong>Telefone:</strong> {localSelecionado.telefone}</p>
              {localSelecionado.email && <p><strong>Email:</strong> {localSelecionado.email}</p>}
              <p><strong>Responsável:</strong> {localSelecionado.responsavel}</p>
            </div>

            {/* Informações Específicas por Tipo */}
            {localSelecionado.tipo === "descarte" ? (
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#e74c3c", borderBottom: "2px solid #ffe6e6", paddingBottom: "5px" }}>♻️ Informações de Descarte</h4>
                <p><strong>Capacidade:</strong> {localSelecionado.capacidade}</p>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Tipos Aceitos:</strong>
                  <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
                    {localSelecionado.tiposAceitos?.map((tipo, index) => (
                      <li key={index}>{tipo}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Serviços Oferecidos:</strong>
                  <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
                    {localSelecionado.servicos?.map((servico, index) => (
                      <li key={index}>{servico}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#27ae60", borderBottom: "2px solid #e6f7e6", paddingBottom: "5px" }}>🌱 Informações do Ecopurriff</h4>
                <p><strong>Data de Instalação:</strong> {localSelecionado.dataInstalacao}</p>
                <p><strong>Capacidade de Filtragem:</strong> {localSelecionado.capacidadeFiltragem}</p>
                <p><strong>Eficiência:</strong> {localSelecionado.eficiencia}</p>
                <p><strong>Manutenção:</strong> {localSelecionado.manutencao}</p>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Sensores Instalados:</strong>
                  <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
                    {localSelecionado.sensores?.map((sensor, index) => (
                      <li key={index}>{sensor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Descrição e Observações */}
            <div>
              <h4 style={{ color: "#34495e", borderBottom: "2px solid #ecf0f1", paddingBottom: "5px" }}>📝 Detalhes</h4>
              <p><strong>Descrição:</strong> {localSelecionado.descricao}</p>
              {localSelecionado.observacoes && (
                <p><strong>Observações:</strong> {localSelecionado.observacoes}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
