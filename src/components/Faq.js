import React, { useState } from 'react';
import '../styles/FAQSection.css';

// Dados das perguntas e respostas (para simulação)
const faqData = [
  { question: "O Loopy pode ser conectado a quais canais?", answer: "O Loopy oferece integração com o WhatsApp Business App, tornando-o um canal de comunicação e conversão muito mais potente." },
  { question: "Qual é a diferença entre o WhatsApp Business App e o Loopy?", answer: "O Loopy é um produto da Mutant que permite adicionar recursos exclusivos do WhatsApp API da Meta, tornando o uso do WhatsApp Business App mais sofisticado. Com a integração, você poderá usar Inteligência Artificial para responder seus clientes e criar campanhas segmentadas de mensagem em massa diretamente pela plataforma.Essa versão é ideal para empresas que buscam escalar o atendimento sem perder a qualidade." },
  { question: "Perco meu histórico de conversa com meus clientes?", answer: "Não! A integração do Loopy com o seu WhatsApp Business App mantém todo o histórico de conversas no aplicativo." },
  { question: "O que acontece se o assistente virtual não souber responder a alguma solicitação?", answer: "O Loopy está equipado para lidar com situações em que o assistente virtual encontra limitações. Se uma pergunta ou solicitação do cliente não puder ser resolvida automaticamente, o sistema encaminha a conversa, de forma inteligente, para um atendente humano. Isso ocorre de maneira fluida, garantindo que o cliente receba a assistência necessária sem interrupções ou atrasos. Esse processo de transbordo para atendimento humano é parte essencial da estratégia de garantir um serviço de atendimento ao cliente de alta qualidade." },
  { question: "Como posso garantir que tenho controle do assistente virtual?", answer: "Você pode monitorar e acompanhar todos os atendimentos em tempo real pelo próprio WhatsApp Business App e, se necessário, intervir nas conversas para manter a qualidade e a eficiência do atendimento." },
  { question: "Vou perder a proximidade com meu cliente?", answer: "De forma alguma! O Loopy é projetado para aumentar a eficiência do seu atendimento enquanto mantém a qualidade e a personalização das interações. Com recursos como Inteligência Artificial segmentação de público, você pode garantir que cada cliente receba uma experiência de atendimento acolhedora e adaptada às suas necessidades.Além disso, o sistema permite que atendentes humanos assumam a conversa sempre que necessário, garantindo que o toque pessoal não se perca." },
  { question: "Como funciona a cobrança do Loopy?", answer: "No Plano Loopy Essential, você paga uma mensalidade de R$ 299,00 e tem conversas e mensagens ilimitadas pelo WhatsApp Business App. Além disso, você tem uma franquia mensal de 100 disparos ativos para campanhas pelo Loopy. Caso queira fazer mais campanhas, você será cobrado R$0,60 por disparo." },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="faq-item">
    {/* Cabeçalho/Pergunta */}
    <button className="faq-question-button" onClick={onClick} aria-expanded={isOpen}>
      <span className="faq-question-text">{question}</span>
      {/* Ícone de Seta (pode ser um SVG ou um caractere estilizado) */}
      <span className={`faq-arrow ${isOpen ? 'open' : ''}`}>&#x27A4;</span> {/* Seta para a direita */}
    </button>
    
    {/* Conteúdo/Resposta */}
    {isOpen && (
      <div className="faq-answer-content">
        <p>{answer}</p>
      </div>
    )}
  </div>
);

const FAQSection = () => {
  // Estado para controlar o índice do item aberto (null = nenhum aberto)
  const [openIndex, setOpenIndex] = useState(null);

  const handleItemClick = (index) => {
    // Se o item clicado já estiver aberto, fecha. Senão, abre o novo.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {/* Título Principal */}
      <h1 className="main-title">Com o <span>Loopy</span>, ter um contato inteligente é muito mais fácil.</h1>
      
      {/* Subtítulo */}
      <h2 className="subtitle">Veja as principais dúvidas ao implementar o Loopy:</h2>
      
      {/* Lista de Itens do FAQ */}
      <div className="faq-list">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;