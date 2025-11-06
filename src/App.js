import React, { useEffect, useState } from 'react'; // 🚨 Importação do useEffect é crucial!
import NavbarHandler from './components/NavbarHandler';
import PlanoPersonalizado from './components/PlanoPersonalizado';



function App() {
    // 1. Chamada do Custom Hook NavbarHandler()
    const { 
        isMobileMenuOpen, 
        toggleMobileMenu,
        handleNavigationClick,
        headerRef, 
        navItemRefs, 
        sectionRefs 
    } = NavbarHandler();
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Rola suavemente
        });
    };
    // Funções auxiliares para mapeamento de Refs
    const setNavItemRef = (el, index) => {
        if (el) navItemRefs.current[index] = el;
    };
    
    const setSectionRef = (el, index) => {
        if (el) sectionRefs.current[index] = el;
    };

    useEffect(() => {
        // Seleciona todas as seções que queremos animar (exceto a primeira, #home)
        const sectionsToAnimate = document.querySelectorAll('main section:not(#home)'); 
        
        // Configuração do Intersection Observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe de visibilidade para disparar a animação CSS
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target); // Anima só uma vez
                }
            });
        }, {
            // threshold: 0.1 significa que a animação começa quando 10% da seção está visível
            threshold: 0.1 
        });

        // Aplica as classes iniciais e inicia a observação
        sectionsToAnimate.forEach(section => {
            section.classList.add('section-hidden'); // Começa com a classe escondida
            observer.observe(section); // Começa a observar a section
        });

        // Limpeza: desliga o observer quando o componente for desmontado
        return () => {
             sectionsToAnimate.forEach(section => observer.unobserve(section));
        };
    }, []); // Executa apenas uma vez ao montar
useEffect(() => {
        // Função para verificar se a página foi rolada o suficiente
        const toggleVisibility = () => {
            if (window.scrollY > 300) { // Aparece depois de rolar 300px
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);
    // ----------------------------------------------------
    // --- RENDERIZAÇÃO DO COMPONENTE ---
    // ----------------------------------------------------
    return (
        <>
            <header ref={headerRef}>
                <nav id="navbar">
                    <img src="img/Loopy-header.png" className="logo-header" alt="logo"/>
                    <ul id="nav_list">
                        <li className="nav-item active" ref={(el) => setNavItemRef(el, 0)}>
                           <a href="#home" onClick={(e) => handleNavigationClick(e, 'home')}>Home</a>
                        </li>
                        <li className="nav-item" ref={(el) => setNavItemRef(el, 1)}>
                           <a href="#function" onClick={(e) => handleNavigationClick(e, 'function')}>Funcionalidade</a>
                        </li>
                        <li className="nav-item" ref={(el) => setNavItemRef(el, 2)}>
                           <a href="#planos" onClick={(e) => handleNavigationClick(e, 'planos')}>Planos</a>
                        </li>
                        <li className="nav-item" ref={(el) => setNavItemRef(el, 3)}>
                           <a href="#testimonials" onClick={(e) => handleNavigationClick(e, 'testimonials')}>Depoimentos</a>
                        </li>
                        <li className="nav-item" ref={(el) => setNavItemRef(el, 4)}>
                           <a href="#sobre" onClick={(e) => handleNavigationClick(e, 'sobre')}>Sobre</a>
                        </li>
                    </ul>
                    <button 
                        className="btn-default"
                        onClick={(e) => handleNavigationClick(e, 'planos')}
                    >
                        Começar Agora
                    </button>
                    
                    <button id="mobile_btn" onClick={toggleMobileMenu}> 
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </nav>
                
                <div id="mobile_menu" className={isMobileMenuOpen ? 'open' : ''}>
                    <ul id="mobile_nav_list">
                        <li className="nav-item">
                            <a href="#home" onClick={(e) => handleNavigationClick(e, 'home')}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#function" onClick={(e) => handleNavigationClick(e, 'function')}>Funcionalidade</a>
                        </li>
                        <li className="nav-item">
                            <a href="#planos" onClick={(e) => handleNavigationClick(e, 'planos')}>Planos</a>
                        </li>
                        <li className="nav-item">
                            <a href="#testimonials" onClick={(e) => handleNavigationClick(e, 'testimonials')}>Depoimentos</a>
                        </li>
                        <li className="nav-item">
                            <a href="#sobre" onClick={(e) => handleNavigationClick(e, 'sobre')}>Sobre</a>
                        </li>
                    </ul>
                    <button className="btn-default"
                    onClick={(e) => handleNavigationClick(e, 'planos')}>
                        Começar Agora
                    </button>  
                </div>
            </header>

            {/* --- CONTEÚDO PRINCIPAL (Sections) --- */}
            <main id="content">
                
                {/* SEÇÃO 1: Home (Index 0) */}
                {/* A HOME GERALMENTE NÃO É ANIMADA, POIS JÁ ESTÁ VISÍVEL */}
                <section id="home" ref={(el) => setSectionRef(el, 0)}>
                    <div id="cta">
                        <h1 className="title"> Soluções completas de atendimento com <span>Inteligência artificial</span></h1>
                        <p className="description"> Quem responde primeiro, vende mais.</p>
                        <div id="cta_button">
                            <a href="#"> <button className="btn-default">Assine já</button></a>
                            <a href="tel:+5555555555">
                                <button className="btn-default">
                                    <i className="fa-solid fa-phone"></i>
                                    Falar com um especialista  
                                </button>
                            </a>
                        </div>
                        <div className="social-media-buttons">
                            <a href=""><i className="fa-brands fa-whatsapp"></i></a>
                            <a href=""><i className="fa-brands fa-facebook"></i></a>
                            <a href=""><i className="fa-brands fa-instagram"></i></a>
                            <a href=""><i className="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>
                    <div id="banner">
                        <img src="img/hero-lp.png" alt="banner"/>
                    </div>
                </section> 
                
                {/* SEÇÃO 2: Funcionalidade (Index 1) */}
                <section id="function" ref={(el) => setSectionRef(el, 1)}>
                    <h1 className="section-title">Funcionalidades</h1>
                    <h3 className="section-subtitle">Transforme seu atendimento com a <span>Loopy</span></h3>
                    <div id="grid">
                        {/* Itens do Grid */}
                        <div id="grid-function">
                            <h4> <i className="fa-solid fa-robot"></i> Chatbot Avançado</h4>
                            <p>Automatize conversas com inteligência artificial que entende e responde seus clientes em tempo real, 24 horas por dia.</p>
                        </div>
                        <div id="grid-function">
                              <h4> <i className="fa-solid fa-chart-simple"></i> Relatórios Completo</h4>
                            <p>Acompanhe métricas detalhadas de atendimento, desempenho da equipe e satisfação dos clientes com dashboards interativos.</p>
                        </div>
                        <div id="grid-function">
                            <h4> <i className="fa-solid fa-business-time"></i> Agendamento</h4>
                            <p>Permita que seus clientes agendem atendimentos, reuniões ou serviços diretamente pelo chat, com confirmação automática.</p>
                        </div>
                        <div id="grid-function">
                            <h4> <i className="fa-solid fa-earth-americas"></i> Plataforma Web</h4>
                            <p>Gerencie todo o fluxo de atendimento em um painel web intuitivo, acessível de qualquer lugar e dispositivo.</p>
                        </div>
                        <div id="grid-function">
                            <h4> <i className="fa-solid fa-comments"></i> Atendimento Rápido</h4>
                            <p>Reduza filas e melhore a experiência do cliente com respostas imediatas e encaminhamentos automáticos.</p>
                        </div>
                        <div id="grid-function">
                            <h4>  <i className="fa-solid fa-users-gear"></i> Suporte Especializado</h4>
                            <p>Conte com uma equipe técnica preparada para personalizar, integrar e otimizar sua solução Loopy conforme sua necessidade.</p>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 3: Planos (Index 2) */}
                <section id="planos" ref={(el) => setSectionRef(el, 2)}>
                    <h2 className="section-title"> Planos</h2>
                    <PlanoPersonalizado /> 

                </section>
                {/* SEÇÃO 4: Depoimentos (Index 3) */}
                <section id="testimonials" ref={(el) => setSectionRef(el, 3)}> 
                    <img src="img/Loopy.png" id="logoTest" alt="logo"/>
                    <div id="testimonials-content">
                        <h2 className="section-title"> Depoimentos</h2>
                        <h3 className="section-subtitle">O que nossos clientes falam sobre nós</h3>
                        
                        <div id="feedbacks">
                            <div className="feedback">
                                <img src="img/users.png" className="feedback-avatar" alt="usuario"/>
                                <div className="feedback-content">
                                    <p> Fátima Souza - Segmento Saúde
                                        <span>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </span>
                                    </p>
                                    <p>"Conseguimos atender 3x mais leads simultâneos. O CRM integrado nos ajudou a não perder nenhuma oportunidade de negócio."</p>
                                </div>
                            </div>
                            <div className="feedback">
                                <img src="img/users.png" className="feedback-avatar" alt="usuario"/>
                                <div className="feedback-content">
                                    <p> Fernando Ribeiro - Segmento E-Commerce
                                        <span>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </span>
                                    </p>
                                    <p>"Com a Loopy aumentamos nossas vendas em 45% no primeiro mês. A automação do WhatsApp foi um divisor de águas para nosso negócio."</p>
                                </div>
                            </div>
                            <div className="feedback">
                                <img src="img/users.png" className="feedback-avatar"  alt="usuario"/>
                                <div className="feedback-content">
                                    <p> Paulo Ferreira - Segmento Financeiro 
                                        <span>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </span>
                                    </p>
                                    <p>"O agendamento automatizado via WhatsApp reduziu nossa taxa de no-show em 60%. Nossos pacientes adoram a praticidade."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Seção 5: Sobre/Placeholder para a última seção (Index 4) */}
                <section id="sobre" ref={(el) => setSectionRef(el, 4)}> 
                </section>
            </main>
            
            {/* --- FOOTER --- */}
<footer id="footer">
    <img src="img/wave.png" id="img-footer" alt="ondadecorativa"/> 
    <div id="footer-main-content">
        
        {/* COLUNA 1: Logo e Descrição */}
        <div className="footer-col" id="footer-col-logo">    
            <img src="img/Loopy-header.png" className="footer-logo" alt="Logo Loopy"/>
            <p className="footer-description">
                Plataforma de Multi-Atendimento que transforma conversas em resultados.
            </p>
            <div className="">
                <a href=""><i className="fa-brands fa-whatsapp"></i></a>
                <a href=""><i className="fa-brands fa-facebook"></i></a>
                <a href=""><i className="fa-brands fa-instagram"></i></a>
                <a href=""><i className="fa-brands fa-linkedin"></i></a>
            </div>
        </div>

        {/* COLUNA 2: Menu Produto */}
        <div className="footer-col footer-nav-col">
            <h4 className="footer-title">Produto</h4>
            <ul className="footer-menu">
                <li><a href="#function">Funcionalidades</a></li>
                <li><a href="#">Sistema</a></li>
                <li><a href="#">Integrações</a></li>
                <li><a href="#planos">Preços</a></li>
            </ul>
        </div>
        

        {/* COLUNA 3: Menu Recursos */}
        <div className="footer-col footer-nav-col">
            <h4 className="footer-title">Recursos</h4>
            <ul className="footer-menu">
                <li><a href="#testimonials">Depoimentos</a></li>
                <li><a href="#">FAQ</a></li>
            </ul>
        </div>
        {/* 💡 NOVO BOTÃO: Voltar ao Topo */}
    {isVisible && (
        <button 
            id="back-to-top"
            onClick={scrollToTop}
            aria-label="Voltar ao Topo da Página"
        >
            <i className="fa-solid fa-arrow-up"></i>
        </button>
    )}

        {/* COLUNA 4: Menu Suporte/Contato */}
        <div className="footer-col footer-nav-col">
            <h4 className="footer-title">Suporte</h4>
            <ul className="footer-menu">
                <li>WhatsApp: (11) 95456-5656</li>
                <li>teste@teste.com.br</li>
            </ul>
        </div>

    </div> 
    
    {/* Linha final para Copyright (movido para fora do bloco principal de colunas) */}
    <div id="footer-bottom">
        <span id="copyright">
            &copy; 2025 Full Service
        </span>
    </div>

</footer>
        </>
    );
}
export default App;