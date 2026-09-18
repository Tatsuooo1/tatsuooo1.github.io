document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  const resumeButton = document.getElementById("download-resume");
  if (resumeButton) resumeButton.addEventListener("click", () => {
    const resume = `CARL JAMES TUAZON
IT Graduate | Virtual Assistant | Data Processing Specialist

ABOUT
Adaptable Information Technology graduate with internship experience in data encoding and administrative support. Skilled in spreadsheets, organization, detail-oriented work, customer support, and AI-assisted data tasks.

EXPERIENCE
Data Analyst Intern — Dhalogi Data Processing Services
February 2025 - May 2025
Generated CRM reports, sent automated SMS campaigns, researched properties, and used AI tools for image extraction and data-related tasks.

EDUCATION
Bachelor of Science in Information Technology — STI College Angeles
2021 - 2025

SKILLS
Microsoft Word, Excel, PowerPoint, Gmail, email management, data entry, research, documentation, HTML, CSS, JavaScript, basic troubleshooting, email support, chat support.

CERTIFICATIONS
SAP Business One Systems Integration & Architecture (2023)
Java Foundations (2022)
STI System Administration (2022)
Data Analyst Internship Certification (2025)
`;
    const blob = new Blob([resume], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Carl-James-Tuazon-Resume.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  const tabs = document.querySelectorAll(".skill-tabs button");
  const cards = document.querySelectorAll(".skill-card");
  tabs.forEach((tab) => tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const selected = tab.dataset.filter;
    cards.forEach((card) => {
      card.style.display = card.dataset.category === selected ? "block" : "none";
    });
  }));

  const form = document.querySelector(".contact-form");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nReply to: ${data.get("email")}`);
    window.location.href = `mailto:carljamestuazon@gmail.com?subject=${subject}&body=${body}`;
    const status = form.querySelector(".form-status");
    if (status) status.textContent = "Opening your email app...";
  });
});
