(function () {
  "use strict";

  // E-mail que recebe as mensagens do formulário de contato
  var CONTACT_EMAIL = "petrussas@ufc.br";

  // ---------- Contador regressivo ----------
  // A data fica no HTML: <div id="countdown" data-target="2026-10-20T08:00:00-03:00">
  var countdown = document.getElementById("countdown");
  var DAY = 86400000;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function showMessage(text) {
    countdown.innerHTML =
      '<span style="color:rgba(255,255,255,0.8);font-size:0.9rem;">' +
      text +
      "</span>";
  }

  if (countdown) {
    var target = new Date(countdown.dataset.target);
    var timerId = null;

    var updateCountdown = function () {
      var diff = target - new Date();

      if (diff <= 0) {
        // evento em andamento (primeiros 2 dias) ou já encerrado
        showMessage(
          diff > -2 * DAY
            ? "O evento está acontecendo agora!"
            : "Esta edição já aconteceu. Acompanhe as novidades da próxima!",
        );
        clearInterval(timerId);
        return;
      }

      document.getElementById("cd-days").textContent = pad(Math.floor(diff / DAY));
      document.getElementById("cd-hours").textContent = pad(
        Math.floor((diff % DAY) / 3600000),
      );
      document.getElementById("cd-mins").textContent = pad(
        Math.floor((diff % 3600000) / 60000),
      );
      document.getElementById("cd-secs").textContent = pad(
        Math.floor((diff % 60000) / 1000),
      );
    };

    if (isNaN(target.getTime())) {
      // data inválida ou ausente: esconde o contador em vez de mostrar 00:00:00:00
      countdown.hidden = true;
    } else {
      updateCountdown();
      timerId = setInterval(updateCountdown, 1000);
    }
  }

  // ---------- Animação de entrada ao rolar a página ----------
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // ---------- Abas da programação (clique e setas do teclado) ----------
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"));

  function selectTab(tab) {
    tabs.forEach(function (t) {
      var active = t === tab;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
      document
        .getElementById(t.dataset.day)
        .classList.toggle("active", active);
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () {
      selectTab(tab);
    });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        selectTab(next);
        next.focus();
      }
    });
  });

  // ---------- Menu do celular ----------
  var hamburger = document.querySelector(".nav-hamburger");
  var nav = document.querySelector("nav");

  function setMenu(open) {
    hamburger.classList.toggle("open", open);
    nav.classList.toggle("nav-mobile-open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  hamburger.addEventListener("click", function () {
    setMenu(!nav.classList.contains("nav-mobile-open"));
  });
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("nav-mobile-open")) {
      setMenu(false);
      hamburger.focus();
    }
  });

  // ---------- Formulário de contato ----------
  // Site estático (sem servidor): ao enviar, abre o app de e-mail do usuário
  // com a mensagem já preenchida, endereçada ao PET.
  var form = document.getElementById("contato-form");
  var status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // evita recarregar a página

      var nome = form.nome.value.trim();
      var email = form.email_contato.value.trim();
      var assunto = form.assunto.options[form.assunto.selectedIndex].text;
      var mensagem = form.mensagem.value.trim();

      var subject = "[Circuitão] " + assunto + " — " + nome;
      var body = mensagem + "\n\n— " + nome + " (" + email + ")";
      var url =
        "mailto:" +
        CONTACT_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      var link = document.createElement("a");
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();

      status.textContent =
        "Abrimos o seu aplicativo de e-mail com a mensagem pronta. Se nada abrir, escreva para " +
        CONTACT_EMAIL +
        ".";
    });
  }
})();
