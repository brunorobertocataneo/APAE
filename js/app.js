const nav = document.querySelector(".main-nav");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const amountCards = document.querySelectorAll(".amount-card");
const customValue = document.querySelector(".custom-value");
const customInput = document.querySelector(".custom-value input");
const impactNote = document.querySelector(".impact-note");

const impactTexts = {
  10: "Com <strong>R$ 10,00</strong> você ajuda com materiais pedagógicos para uma criança!",
  20: "Com <strong>R$ 20,00</strong> você ajuda a proporcionar uma sessão de fonoaudiologia para quem precisa!",
  50: "Com <strong>R$ 50,00</strong> você apoia uma semana de atividades inclusivas na APAE!",
  custom: "Sua doação personalizada vira cuidado, inclusão e oportunidades reais."
};

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

amountCards.forEach((card) => {
  card.addEventListener("click", () => {
    amountCards.forEach((item) => item.classList.remove("selected"));
    card.classList.add("selected");

    const value = card.dataset.value;
    const isCustom = value === "0";
    customValue.classList.toggle("show", isCustom);

    if (isCustom) {
      customInput.focus();
      impactNote.innerHTML = `<span></span> ${impactTexts.custom}`;
      return;
    }

    impactNote.innerHTML = `<span></span> ${impactTexts[value]}`;
  });
});

customInput.addEventListener("input", () => {
  const value = Number(customInput.value || 0);
  if (value > 0) {
    const formatted = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    impactNote.innerHTML = `<span></span> Com <strong>${formatted}</strong> você fortalece os atendimentos e projetos da APAE Videira!`;
  }
});

const sections = [...document.querySelectorAll("main section[id], footer[id]")];

const setActiveLink = () => {
  const current = sections
    .map((section) => ({
      id: section.id,
      top: Math.abs(section.getBoundingClientRect().top - 90)
    }))
    .sort((a, b) => a.top - b.top)[0];

  if (!current) return;

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();
