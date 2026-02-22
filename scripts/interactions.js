import { skillsData } from "../data/skills.js";

const tabs = document.querySelectorAll(".tab");
const container = document.getElementById("skills-container");

function renderSkills(category) {
  container.innerHTML = "";

  skillsData[category].forEach((skill, index) => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.style.animationDelay = `${index * 0.08}s`;

    card.innerHTML = `
      <i class="${skill.icon} skill-icon"></i>
      <div class="skill-name">${skill.name}</div>
    `;

    container.appendChild(card);
  });
}


tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderSkills(tab.dataset.tab);
  });
});

renderSkills("languages");
