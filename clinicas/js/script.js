/* =========================================================
   UNIVERSO PREVIDENCIÁRIO — Landing Page para Clínicas
   JavaScript puro, sem dependências externas.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Ano atual no rodapé ---------- */
  var anoAtual = document.getElementById("anoAtual");
  if (anoAtual) {
    anoAtual.textContent = String(new Date().getFullYear());
  }

  /* ---------- Formulário de interesse ---------- */
  var form = document.getElementById("clinicaForm");
  var successMsg = document.getElementById("formSuccess");
  var errorMsg = document.getElementById("formError");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      successMsg.classList.remove("show");
      errorMsg.classList.remove("show");

      // Honeypot anti-spam: se preenchido, é bot — ignora silenciosamente.
      var honeypot = form.querySelector("#website");
      if (honeypot && honeypot.value.trim() !== "") {
        return;
      }

      if (!form.checkValidity()) {
        errorMsg.classList.add("show");
        errorMsg.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      var formData = new FormData(form);
      var payload = {
        nome: formData.get("nome"),
        clinica: formData.get("clinica"),
        especialidade: formData.get("especialidade"),
        atendimentos: formData.get("atendimentos"),
        cidade: formData.get("cidade"),
        estado: formData.get("estado"),
        telefone: formData.get("telefone"),
        email: formData.get("email"),
        frequencia: formData.get("frequencia"),
        situacoes: formData.getAll("situacoes"),
        mensagem: formData.get("mensagem"),
        origem: "landing-clinicas",
        data: new Date().toISOString()
      };

      /*
        INTEGRAÇÃO FUTURA (Kommo / CRM / Webhook / E-mail / API):
        Substitua o bloco abaixo por uma chamada real ao endpoint de destino.
        Nenhuma credencial, API key ou token deve ser inserida neste arquivo —
        mantenha segredos apenas no servidor/CRM que recebe a requisição.

        Exemplo:
        fetch('https://SEU-ENDPOINT-SEGURO/leads-clinicas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            if (!res.ok) throw new Error('Falha no envio');
            showSuccess();
          })
          .catch(function () {
            showError();
          });
      */

      // Comportamento atual (sem backend): confirma recebimento visualmente
      // e registra o payload no console para fins de teste/depuração.
      console.log("Formulário de interesse (clínicas) — payload pronto para integração:", payload);

      successMsg.classList.add("show");
      form.reset();
      successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Scroll suave com compensação do header fixo ---------- */
  var header = document.querySelector(".site-header");

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      if (target.tagName === "DETAILS") {
        target.open = true;
      }

      var headerHeight = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();
