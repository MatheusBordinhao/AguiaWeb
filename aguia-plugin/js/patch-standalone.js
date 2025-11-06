/**
 * Patch para fazer o Plugin AGUIA funcionar fora do Moodle
 * Este arquivo cria as variáveis globais necessárias que o plugin espera encontrar
 * 
 * @version 2.0 - Atualizado para compatibilidade com a versão mais recente do AGUIA
 */

(function() {
    'use strict';
    
    console.log('🦅 AGUIA Patch v2.0 - Configurando ambiente standalone...');
    
    // Criar objeto M (Moodle) simulado
    if (typeof window.M === 'undefined') {
        // Detectar o caminho base do site
        const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
        
        window.M = {
            cfg: {
                wwwroot: basePath || '.', // Caminho relativo
                sesskey: 'standalone-' + Date.now(),
                theme: 'aguia-standalone',
                version: '2025110600'
            },
            util: {
                get_string: function(key, component) {
                    // Mapa de strings em português brasileiro
                    const strings = {
                        'pluginname': 'AGUIA - Acessibilidade',
                        'accessibility': 'Acessibilidade',
                        'close': 'Fechar',
                        'save': 'Salvar',
                        'reset': 'Resetar',
                        'increase': 'Aumentar',
                        'decrease': 'Diminuir',
                        'enable': 'Ativar',
                        'disable': 'Desativar',
                        'font': 'Fonte',
                        'color': 'Cor',
                        'contrast': 'Contraste',
                        'navigation': 'Navegação'
                    };
                    return strings[key] || key;
                },
                // Simula requisições AJAX do Moodle
                ajax: function(config) {
                    console.warn('⚠️ AJAX simulado (standalone mode):', config);
                    
                    // Simular sucesso para não quebrar o código
                    if (config.success && typeof config.success === 'function') {
                        setTimeout(() => {
                            config.success({ success: true, data: {} });
                        }, 100);
                    }
                    
                    return {
                        done: function(callback) {
                            if (typeof callback === 'function') {
                                setTimeout(() => callback({ success: true }), 100);
                            }
                            return this;
                        },
                        fail: function(callback) {
                            return this;
                        }
                    };
                }
            }
        };
        console.log('✅ AGUIA Patch - Objeto M criado com wwwroot:', window.M.cfg.wwwroot);
    }
    
    // Criar objeto Y (YUI) simulado se necessário
    if (typeof window.Y === 'undefined') {
        window.Y = {
            use: function() {
                // Simula o carregamento de módulos YUI
                const callback = arguments[arguments.length - 1];
                if (typeof callback === 'function') {
                    setTimeout(callback, 0);
                }
                return this;
            }
        };
        console.log('✅ AGUIA Patch - Objeto Y criado');
    }
    
    // Interceptar e corrigir caminhos de imagens do plugin
    const originalImageSrcSetter = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src').set;
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
        set: function(value) {
            // Corrigir caminho do logo do AGUIA
            if (value && value.includes('/local/aguiaplugin/pix/')) {
                value = value.replace(/.*\/local\/aguiaplugin\/pix\//, 'aguia-plugin/pix/');
                console.log('🔧 Caminho de imagem corrigido:', value);
            }
            originalImageSrcSetter.call(this, value);
        },
        get: function() {
            return this.getAttribute('src');
        }
    });
    
    // Simular localStorage para preferências (caso não exista)
    if (typeof window.localStorage === 'undefined') {
        console.warn('⚠️ localStorage não disponível, criando simulação');
        window.localStorage = {
            _data: {},
            setItem: function(key, value) {
                this._data[key] = String(value);
            },
            getItem: function(key) {
                return this._data[key] || null;
            },
            removeItem: function(key) {
                delete this._data[key];
            },
            clear: function() {
                this._data = {};
            }
        };
    }
    
    console.log('✅ AGUIA Patch - Ambiente configurado com sucesso!');
    console.log('📦 Recursos disponíveis:');
    console.log('   - Objeto M (Moodle simulado)');
    console.log('   - Objeto Y (YUI simulado)');
    console.log('   - Correção automática de caminhos de imagens');
    console.log('   - localStorage para preferências');
})();
