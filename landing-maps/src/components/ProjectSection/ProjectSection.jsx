import "./ProjectSection.css";

export default function ProjectSection() {
  return (
    <div className="info">
      <div className="container">
        <h2>📐 Projeto</h2>
        <p>
          Nosso objetivo é oferecer uma solução digital eficiente e acessível,
          conectando pessoas e negócios de forma prática e moderna.
        </p>

        <div className="cards-video-grid">
          <div className="cards-container">
            <div className="card">
              <h3>💡 Problemática</h3>
              <p>
                A principal motivação deste projeto é a emissão de gases poluentes provenientes do lixo eletrônico. Em 2024, de acordo com o relatório State of Global Air, 8,1 milhões de pessoas morreram devido à exposição a gases tóxicos, representando um aumento de 1,1 bilhão em relação ao ano anterior.
              </p>
            </div>
            <div className="card">
              <h3>🧠 Ideação</h3>
              <p>
                 Combinar a capacidade de adsorção do biocarvão com a retenção de ar proporcionada por placas metálicas recicláveis, criando uma barreira eficaz contra a propagação de gases nocivos que contribuem para o efeito estufa.
              </p>
            </div>
           
          </div>

          <div className="video-area">
            <h2>🎥 Vídeo Explicativo</h2>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/rGBv8tia82c"
                title="Vídeo Explicativo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
