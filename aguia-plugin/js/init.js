/**
 * Arquivo de inicialização do plugin AGUIA para sites standalone
 * Garante que todas as funções sejam carregadas e inicializadas corretamente
 * 
 * @version 2.0 - Atualizado para a versão mais recente do AGUIA
 */

(function() {
    'use strict';
    
    console.log('🦅 Plugin AGUIA v2.0 - Inicializando...');
    
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAguia);
    } else {
        // DOM já está pronto
        initAguia();
    }
    
    function initAguia() {
        console.log('🦅 Plugin AGUIA - DOM pronto, verificando dependências...');
        
        // Contador de tentativas
        let attempts = 0;
        const maxAttempts = 50; // 5 segundos máximo (50 * 100ms)
        
        function checkAndInit() {
            attempts++;
            
            // Verificar se todas as dependências estão carregadas
            const hasAguiaIcons = typeof window.AguiaIcons !== 'undefined';
            const hasCreateButton = typeof window.createAccessibilityButton === 'function';
            const hasMoodleEnv = typeof window.M !== 'undefined' && typeof window.M.cfg !== 'undefined';
            
            if (!hasAguiaIcons || !hasCreateButton || !hasMoodleEnv) {
                if (attempts < maxAttempts) {
                    console.log(`⏳ Aguardando dependências... (tentativa ${attempts}/${maxAttempts})`);
                    setTimeout(checkAndInit, 100);
                    return;
                } else {
                    console.error('❌ Timeout: Dependências não carregadas após 5 segundos');
                    console.error('   AguiaIcons:', hasAguiaIcons);
                    console.error('   createAccessibilityButton:', hasCreateButton);
                    console.error('   Ambiente Moodle (M):', hasMoodleEnv);
                    return;
                }
            }
            
            // Todas as dependências estão disponíveis
            console.log('✅ Todas as dependências carregadas!');
            console.log('   ✓ AguiaIcons (' + Object.keys(window.AguiaIcons).length + ' ícones)');
            console.log('   ✓ Funções de criação de botões');
            console.log('   ✓ Ambiente Moodle simulado');
            
            // Pequeno delay para garantir que tudo está pronto
            setTimeout(function() {
                console.log('🚀 Iniciando componentes do plugin...');
                
                // O acessibilidade_wcag.js já tem um DOMContentLoaded que inicializa tudo
                // Vamos apenas verificar se o botão foi criado
                setTimeout(function() {
                    const button = document.getElementById('aguiaButton');
                    if (button) {
                        console.log('✅ Botão AGUIA criado com sucesso!');
                        console.log('   Posição:', getComputedStyle(button).position);
                        
                        // GARANTIR QUE O BOTÃO ESTÁ OCULTO - só mostra quando usuário clicar no botão de teste
                        button.classList.remove('aguia-visible');
                        console.log('   🔒 Botão ocultado inicialmente (aguardando clique no botão de teste)');
                        
                        // Criar função global para mostrar o botão quando necessário
                        window.mostrarBotaoAguia = function() {
                            button.classList.add('aguia-visible');
                            console.log('   👁️ Botão AGUIA agora visível!');
                        };
                    } else {
                        console.warn('⚠️ Botão AGUIA não foi criado automaticamente');
                        console.log('   Tentando criar manualmente...');
                        
                        if (typeof window.createAccessibilityButton === 'function') {
                            try {
                                window.createAccessibilityButton();
                                console.log('✅ Botão criado manualmente!');
                                
                                // Garantir que está oculto após criar
                                setTimeout(function() {
                                    const btn = document.getElementById('aguiaButton');
                                    if (btn) {
                                        btn.classList.remove('aguia-visible');
                                        window.mostrarBotaoAguia = function() {
                                            btn.classList.add('aguia-visible');
                                        };
                                    }
                                }, 100);
                            } catch (error) {
                                console.error('❌ Erro ao criar botão:', error);
                            }
                        }
                    }
                    
                    // Verificar menu
                    setTimeout(function() {
                        const menu = document.getElementById('aguiaMenu');
                        if (menu) {
                            console.log('✅ Menu AGUIA criado com sucesso!');
                        } else {
                            console.log('ℹ️ Menu AGUIA será criado ao clicar no botão');
                        }
                        
                        console.log('');
                        console.log('🎉 Plugin AGUIA inicializado com sucesso!');
                        console.log('   Procure pelo botão flutuante no canto direito da tela');
                        console.log('');
                    }, 100);
                }, 500);
            }, 100);
        }
        
        // Iniciar verificação
        checkAndInit();
    }
    
    // Adicionar listener para erros JavaScript
    window.addEventListener('error', function(event) {
        if (event.filename && event.filename.includes('aguia-plugin')) {
            console.error('❌ Erro no Plugin AGUIA:', {
                mensagem: event.message,
                arquivo: event.filename,
                linha: event.lineno,
                coluna: event.colno
            });
        }
    });
    
})();
