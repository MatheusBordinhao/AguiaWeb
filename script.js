document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      const spans = menuToggle.querySelectorAll("span");
      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  const navLinksItems = document.querySelectorAll(".nav-links a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const spans = menuToggle.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.style.boxShadow =
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
  } else {
    navbar.style.boxShadow =
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
  }

  lastScroll = currentScroll;
});

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0) scale(1)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".section-title, .category-title")
  .forEach((title) => {
    title.style.opacity = "0";
    title.style.transform = "translateY(20px)";
    title.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(title);
  });

document.querySelectorAll(".section-subtitle").forEach((subtitle) => {
  subtitle.style.opacity = "0";
  subtitle.style.transform = "translateY(15px)";
  subtitle.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s";
  observer.observe(subtitle);
});

document.querySelectorAll(".feature-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px) scale(0.95)";
  card.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
    index * 0.05
  }s`;
  observer.observe(card);
});

document.querySelectorAll(".team-member").forEach((member, index) => {
  member.style.opacity = "0";
  member.style.transform = "translateY(20px) scale(0.95)";
  member.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
    index * 0.1
  }s`;
  observer.observe(member);
});

document.querySelectorAll(".tech-item").forEach((item, index) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(15px) scale(0.95)";
  item.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
    index * 0.04
  }s`;
  observer.observe(item);
});

document
  .querySelectorAll(".about-text, .about-image")
  .forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${
      index * 0.15
    }s`;
    observer.observe(element);
  });

document
  .querySelectorAll(".contact-info, .contact-form")
  .forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
      index * 0.1
    }s`;
    observer.observe(element);
  });

document.querySelectorAll(".feature-badge").forEach((badge, index) => {
  badge.style.opacity = "0";
  badge.style.transform = "translateY(20px) scale(0.95)";
  badge.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
    index * 0.15
  }s`;
  observer.observe(badge);
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      showNotification("Por favor, preencha todos os campos.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Por favor, insira um email válido.", "error");
      return;
    }

    showNotification(
      "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      "success"
    );

    contactForm.reset();
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  Object.assign(notification.style, {
    position: "fixed",
    top: "100px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    backgroundColor: type === "success" ? "#10b981" : "#ef4444",
    color: "white",
    fontWeight: "600",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    zIndex: "9999",
    animation: "slideInRight 0.3s ease",
    maxWidth: "400px",
  });

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  console.log("Tema escuro detectado");
}

console.log("🦅 Plugin AGUIA - Site carregado com sucesso!");

/**
 * Função para abrir o plugin AGUIA quando o botão de teste for clicado
 */
function abrirPluginAguia() {
  console.log('🎯 Botão "Teste o plugin" clicado!');
  
  // Verificar se o botão do plugin existe
  const aguiaButton = document.getElementById('aguiaButton');
  
  if (aguiaButton) {
    // Adicionar efeito visual de feedback
    const testeBtn = document.getElementById('testePluginBtn');
    if (testeBtn) {
      testeBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        testeBtn.style.transform = '';
      }, 200);
    }
    
    // Pequeno delay para o usuário perceber o clique
    setTimeout(() => {
      // Mostrar o botão do plugin (estava oculto)
      if (typeof window.mostrarBotaoAguia === 'function') {
        window.mostrarBotaoAguia();
      } else {
        aguiaButton.classList.add('aguia-visible');
      }
      
      // Pequeno delay adicional para o botão aparecer antes de clicar
      setTimeout(() => {
        // Simular clique no botão do plugin
        aguiaButton.click();
        console.log('✅ Plugin AGUIA aberto!');
        
        // Mostrar notificação visual
        mostrarNotificacaoTeste();
        
        // Scroll suave até o topo para melhor visualização
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 200);
    }, 300);
  } else {
    console.warn('⚠️ Botão do plugin ainda não foi criado. Aguardando inicialização...');
    
    // Mostrar mensagem de carregamento
    mostrarNotificacaoCarregamento();
    
    // Tentar novamente após 1 segundo
    setTimeout(() => {
      const btn = document.getElementById('aguiaButton');
      if (btn) {
        // Mostrar e clicar
        if (typeof window.mostrarBotaoAguia === 'function') {
          window.mostrarBotaoAguia();
        } else {
          btn.classList.add('aguia-visible');
        }
        
        setTimeout(() => {
          btn.click();
          console.log('✅ Plugin AGUIA aberto (tentativa 2)!');
          mostrarNotificacaoTeste();
        }, 200);
      } else {
        console.error('❌ Plugin não carregou. Verifique o console para erros.');
        mostrarNotificacaoErro();
      }
    }, 1000);
  }
}

/**
 * Mostra uma notificação visual quando o plugin é aberto
 */
function mostrarNotificacaoTeste() {
  const notificacao = document.createElement('div');
  notificacao.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 1.5rem;">🦅</span>
      <span>Plugin AGUIA ativado! Use as ferramentas de acessibilidade.</span>
    </div>
  `;
  
  Object.assign(notificacao.style, {
    position: 'fixed',
    top: '30px',
    left: '30px',
    padding: '1.2rem 1.8rem',
    borderRadius: '16px',
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 15px 35px rgba(37, 99, 235, 0.5)',
    zIndex: '9998',
    animation: 'slideInLeft 0.5s ease',
    maxWidth: '450px',
    fontSize: '1rem'
  });
  
  document.body.appendChild(notificacao);
  
  setTimeout(() => {
    notificacao.style.animation = 'slideOutLeft 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(notificacao);
    }, 500);
  }, 4000);
}

/**
 * Integração Gemini (browser) para interpretação de imagens
 * - Persiste API key e modelo em localStorage (prefixo aguia_)
 * - Envia a imagem via inlineData para o endpoint generateContent
 */
(function configurarGeminiUI() {
  const keyInput = document.getElementById('geminiApiKey');
  const modelSelect = document.getElementById('geminiModel');
  const fileInput = document.getElementById('geminiImage');
  const preview = document.getElementById('geminiPreview');
  const btnInterpretar = document.getElementById('btnInterpretarImagem');
  const btnLimpar = document.getElementById('btnLimparGemini');
  const saida = document.getElementById('geminiResultado');

  if (!keyInput || !modelSelect || !fileInput || !btnInterpretar || !saida) {
    return; // UI não presente nesta página
  }

  // Carregar valores salvos
  try {
    const k = localStorage.getItem('aguia_gemini_api_key');
    const m = localStorage.getItem('aguia_gemini_model');
    if (k) keyInput.value = JSON.parse(k);
    if (m) modelSelect.value = JSON.parse(m);
  } catch {}

  // Persistência sob demanda
  keyInput.addEventListener('change', () => {
    localStorage.setItem('aguia_gemini_api_key', JSON.stringify(keyInput.value || ''));
  });
  modelSelect.addEventListener('change', () => {
    localStorage.setItem('aguia_gemini_model', JSON.stringify(modelSelect.value || 'gemini-1.5-flash'));
  });

  // Limpar resultado
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      saida.innerHTML = '<em style="color:#64748b;">Resultado da descrição aparecerá aqui...</em>';
      if (preview) {
        preview.innerHTML = '<em class="gemini-preview-placeholder">Nenhuma imagem selecionada.</em>';
        preview.hidden = true;
      }
      if (fileInput) {
        fileInput.value = '';
      }
    });
  }

  // Pré-visualização da imagem
  let objectUrlAtual = null;
  fileInput.addEventListener('change', () => {
    const f = fileInput.files && fileInput.files[0];
    if (!preview) return;
    if (!f) {
      preview.innerHTML = '<em class="gemini-preview-placeholder">Nenhuma imagem selecionada.</em>';
      preview.hidden = true;
      if (objectUrlAtual) { URL.revokeObjectURL(objectUrlAtual); objectUrlAtual = null; }
      return;
    }
    // Regras básicas
    if (!/^image\//i.test(f.type)) {
      showNotification('Arquivo selecionado não é uma imagem.', 'error');
      fileInput.value = '';
      preview.innerHTML = '<em class="gemini-preview-placeholder">Nenhuma imagem selecionada.</em>';
      preview.hidden = true;
      return;
    }
    if (objectUrlAtual) { URL.revokeObjectURL(objectUrlAtual); objectUrlAtual = null; }
    objectUrlAtual = URL.createObjectURL(f);
    const sizeMB = (f.size / (1024 * 1024)).toFixed(2);
    preview.innerHTML = `
      <figure>
        <img src="${objectUrlAtual}" alt="Pré-visualização da imagem selecionada" />
        <figcaption>${f.name} • ${sizeMB} MB</figcaption>
      </figure>
    `;
    preview.hidden = false;
  });

  // Clique para interpretar
  btnInterpretar.addEventListener('click', async () => {
    const apiKey = keyInput.value.trim();
  const model = modelSelect ? modelSelect.value : 'gemini-2.5-flash';
    const file = fileInput.files && fileInput.files[0];

    // Validações básicas
    if (!apiKey) {
      showNotification('Informe sua API Key do Gemini.', 'error');
      keyInput.focus();
      return;
    }
    if (!file) {
      showNotification('Selecione uma imagem para interpretar.', 'error');
      fileInput.focus();
      return;
    }
    if (file.size > 4 * 1024 * 1024) { // 4MB
      showNotification('Imagem muito grande. Tente um arquivo menor que 4MB.', 'error');
      return;
    }

    // Mostrar estado de carregamento
    saida.textContent = 'Interpretando imagem com ' + model + '...';

    try {
      const b64 = await toBase64(file);
      const mimeType = file.type || 'image/png';

      // Monta o payload conforme API Generative Language v1beta
      const body = {
        contents: [
          {
            parts: [
              { text: 'Gere uma descrição acessível, objetiva e detalhada desta imagem. Foque em conteúdo, contexto, ações e elementos relevantes para texto alternativo (alt).' },
              { inlineData: { mimeType, data: b64.replace(/^data:[^;]+;base64,/, '') } }
            ]
          }
        ]
      };

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      // Trata possíveis respostas não JSON
      const contentType = res.headers.get('content-type') || '';
      let json;
      if (contentType.includes('application/json')) {
        json = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || 'Resposta não-JSON da API');
      }

      if (!res.ok) {
        const msg = (json && (json.error && json.error.message)) || 'Falha na chamada da API';
        throw new Error(msg);
      }

      // Extrair texto
      const text = (json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts && json.candidates[0].content.parts[0] && json.candidates[0].content.parts[0].text) || '';
      saida.textContent = text || 'Nenhuma descrição retornada.';
    } catch (err) {
      console.error('Erro Gemini:', err);
      showNotification('Erro ao interpretar imagem: ' + (err && err.message ? err.message : 'Erro desconhecido'), 'error');
      saida.textContent = 'Erro: ' + (err && err.message ? err.message : String(err));
    }
  });

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
})();

/**
 * Mostra notificação de carregamento
 */
function mostrarNotificacaoCarregamento() {
  const notificacao = document.createElement('div');
  notificacao.id = 'notificacao-carregamento';
  notificacao.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <div style="width: 20px; height: 20px; border: 3px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <span>Carregando plugin AGUIA...</span>
    </div>
  `;
  
  Object.assign(notificacao.style, {
    position: 'fixed',
    top: '30px',
    left: '30px',
    padding: '1.2rem 1.8rem',
    borderRadius: '16px',
    backgroundColor: '#f59e0b',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 15px 35px rgba(245, 158, 11, 0.5)',
    zIndex: '9998',
    maxWidth: '450px',
    fontSize: '1rem'
  });
  
  document.body.appendChild(notificacao);
  
  // Adicionar animação de spin
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinStyle);
  
  // Remover após 3 segundos
  setTimeout(() => {
    const elem = document.getElementById('notificacao-carregamento');
    if (elem) {
      elem.style.animation = 'slideOutLeft 0.5s ease';
      setTimeout(() => {
        if (elem.parentNode) {
          document.body.removeChild(elem);
        }
      }, 500);
    }
  }, 3000);
}

/**
 * Mostra notificação de erro
 */
function mostrarNotificacaoErro() {
  const notificacao = document.createElement('div');
  notificacao.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 1.5rem;">⚠️</span>
      <div>
        <div style="font-weight: bold; margin-bottom: 4px;">Erro ao carregar plugin</div>
        <div style="font-size: 0.85rem; opacity: 0.9;">Recarregue a página e tente novamente</div>
      </div>
    </div>
  `;
  
  Object.assign(notificacao.style, {
    position: 'fixed',
    top: '30px',
    left: '30px',
    padding: '1.2rem 1.8rem',
    borderRadius: '16px',
    backgroundColor: '#ef4444',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 15px 35px rgba(239, 68, 68, 0.5)',
    zIndex: '9998',
    animation: 'slideInLeft 0.5s ease',
    maxWidth: '450px',
    fontSize: '1rem'
  });
  
  document.body.appendChild(notificacao);
  
  setTimeout(() => {
    notificacao.style.animation = 'slideOutLeft 0.5s ease';
    setTimeout(() => {
      if (notificacao.parentNode) {
        document.body.removeChild(notificacao);
      }
    }, 500);
  }, 5000);
}
