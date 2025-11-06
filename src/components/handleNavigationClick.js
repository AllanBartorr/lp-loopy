// 🧩 Dentro do seu componente React (ex: App.js ou Home.jsx)
import React, { useEffect } from 'react';

const SeuComponente = () => {
    // ... seu código de estado e outras funções (ex: handleNavigationClick) ...

    useEffect(() => {
        // Seleciona todas as sections que queremos animar
        const sections = document.querySelectorAll('section'); 
        
        // Configura o Intersection Observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Se a section estiver visível (ou parcialmente visível)
                if (entry.isIntersecting) {
                    // Adiciona a classe de visibilidade para disparar a animação
                    entry.target.classList.add('section-visible');
                    // Opcional: Para que a animação só aconteça uma vez,
                    // remova o observer depois de ativada
                    observer.unobserve(entry.target);
                } 
                // Se quiser que a animação inverta ao sair da tela, remova o observer.unobserve e adicione o 'else'
            });
        }, { 

            rootMargin: '0px 0px -100px 0px' 
        });

        // Aplica as classes iniciais e inicia a observação
        sections.forEach(section => {
            section.classList.add('section-hidden'); // Começa com a classe escondida
            observer.observe(section); // Começa a observar a section
        });

        // Limpeza: desliga o observer quando o componente for desmontado
        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []); // O array vazio garante que rode apenas uma vez ao montar o componente
    
    // ... seu return (JSX) ...
}

export default SeuComponente;