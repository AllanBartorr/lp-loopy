import { useState, useEffect, useRef, useCallback } from 'react';
// import ScrollReveal from 'scrollreveal';

// 🚨 CORREÇÃO 1: Mantemos a função com o nome que será exportado para evitar o erro do linter.
function NavbarHandler() { 
    
    // 1. Estados
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // 2. Refs
    const headerRef = useRef(null);
    const navItemRefs = useRef([]); 
    const sectionRefs = useRef([]); 

    // 3. Função para alternar o menu móvel
    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prevState => !prevState);
    }, []);
    
    // 🚨 NOVO: Função para lidar com o clique no menu (para rolagem suave)
    const handleNavigationClick = useCallback((event, targetId) => {
        event.preventDefault(); // Impede o comportamento de pulo imediato
        
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Rolagem suave
                block: 'start'      // Alinha o topo da seção
            });
        }
        
        // Se estiver no menu móvel, feche-o
        setIsMobileMenuOpen(false);
        
    }, []);


    // 4. Efeito para lidar com a lógica de rolagem (Scroll Spy e Sombra do Header)
    const handleScroll = useCallback(() => {
        if (!headerRef.current || sectionRefs.current.length === 0) return;

        const headerHeight = headerRef.current.offsetHeight;
        const scrollPosition = window.scrollY;

        // Lógica da sombra do header
        if (scrollPosition <= 10) { 
            headerRef.current.style.boxShadow = 'none';
        } else {
            headerRef.current.style.boxShadow = '5px 1px 5px rgba(0,0,0, 0.1)';
        }

        // Lógica para destacar o item de navegação ativo (Scroll Spy)
        let activeIndex = 0;
        // Offset que compensa a altura do header fixo (ajuste conforme o design, se necessário)
        const offset = headerHeight + 10; 
        
        // Itera de trás para frente para pegar a seção mais próxima do topo
        for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
            const section = sectionRefs.current[i];
            if (!section) continue;

            const sectionTop = section.offsetTop;
            
            // Verifica se a posição de rolagem ultrapassou o topo da seção (com o offset)
            if (scrollPosition >= sectionTop - offset) {
                activeIndex = i;
                break;
            }
        }
        
        // Remove 'active' de todos os itens primeiro
        navItemRefs.current.forEach(item => {
            if (item) item.classList.remove('active');
        });

        // Adiciona 'active' ao item de navegação correspondente
        if (navItemRefs.current[activeIndex]) {
            navItemRefs.current[activeIndex].classList.add('active');
        }
    }, [headerRef, navItemRefs, sectionRefs]);

    // Adiciona o listener de scroll ao montar o componente
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Inicializa o estado
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]); 

    // Efeito para o ScrollReveal (se você o estiver usando globalmente)
    useEffect(() => {
        const sr = window.ScrollReveal || (() => ({ reveal: () => {} }));
        
        sr().reveal('#cta', { origin: 'left', duration: 2000, distance: '20%' });
        sr().reveal('#function', { origin: 'bottom', duration: 2000, distance: '20%' });
        sr().reveal('#feedbacks', { origin: 'right', duration: 2000, distance: '20%' });
    }, []);

    // 🚨 Retorna as ferramentas que o App.js precisa
    return {
        isMobileMenuOpen,
        toggleMobileMenu,
        handleNavigationClick, 
        headerRef,
        navItemRefs,
        sectionRefs
    };
}

// 🚨 CORREÇÃO 2: Exportamos a função com o nome que ela foi definida (NavbarHandler)
export default NavbarHandler;