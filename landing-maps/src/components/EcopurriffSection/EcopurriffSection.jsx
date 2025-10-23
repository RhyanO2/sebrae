import "./EcopurriffSection.css";

export default function EcopurriffSection() {
  return (
    <div className="ecopurriff-section">
      <div className="container">
        <h2>🌱 Ecopurriff</h2>
        <p className="subtitle">
          Nossa Inovação sustentável para combater a poluição do lixo eletrônico
        </p>

        <div className="content-grid">
          <div className="info-card">
            <h3>🛡️ O que é o Ecopurriff?</h3>
            <p>
              O Ecopurriff é uma barreira adsorvente inovadora que captura e retém 
              gases tóxicos liberados pelo lixo eletrônico, responsável por 70% dos 
              gases poluentes que contribuem para milhões de mortes anuais.
            </p>
          </div>

          <div className="info-card">
            <h3>⚙️ Como Funciona?</h3>
            <p>
              Composto por três placas de metais reciclados e biocarvão interno, 
              o dispositivo funciona como um filtro: os gases entram pelos furos 
              das placas metálicas e são capturados pelo biocarvão, impedindo 
              sua liberação na atmosfera.
            </p>
          </div>

          <div className="info-card">
            <h3>💰 Custo Acessível</h3>
            <p>
              Com custo de produção de apenas R$ 1 por unidade, utiliza materiais 
              reciclados do próprio lixo eletrônico e 100g de biocarvão, tornando 
              a solução economicamente viável e sustentável.
            </p>
          </div>

          <div className="info-card">
            <h3>🌍 Impacto Ambiental</h3>
            <p>
              Contribui para a redução de mortes por gases tóxicos, diminuição 
              do efeito estufa, combate às mudanças climáticas e redução do 
              aquecimento global através de parcerias estratégicas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
