document.addEventListener("DOMContentLoaded", () => {
  // Project data
  const projects = [
    {
      id: 1,
      title: "HMU - Social Application",
      description:
        "A real-time chatting application with React.js frontend and NodeJS backend.",
      technologies: [
        "ReactJS",
        "NodeJS",
        "Express",
        "MongoDB",
        "Socket.IO",
        "Material UI",
        "Docker",
      ],
      category: "web",
      image: "assets/images/hmu.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "RepairDesk Mobile App",
      description:
        "Native mobile app with dashboard, invoicing and ticket creation features.",
      technologies: ["React Native", "JavaScript", "Material UI"],
      category: "mobile",
      image: "assets/images/repairdesk.jpg",
      link: "https://play.google.com/store/apps/details?id=com.rdmobile.aaa",
    },
    {
      id: 3,
      title: "Appointment Calendar",
      description:
        "User-friendly, cost and time effective Appointment Calendar using Material-UI.",
      technologies: ["ReactJS", "Material UI", "JavaScript"],
      category: "web",
      image: "assets/images/calendar.jpg",
      link: "http://appowebwidget.com2.s3-website-us-east-1.amazonaws.com/schedule/MTAzMzM=/search#multiStore=yes,primary=f2ba31,secondary=262626",
    },
    {
      id: 4,
      title: "Imerza",
      description:
        "Web application for real estate property management and broker overview.",
      technologies: ["ReactJS", "NodeJS", "MongoDB"],
      category: "web",
      image: "assets/images/imerza.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Home of Custom Suits",
      description: "A Fully Customized SPA for custom suits business.",
      technologies: ["ReactJS", "NodeJS", "MongoDB", "Express"],
      category: "web",
      image: "assets/images/suits.jpg",
      link: "#",
    },
    {
      id: 6,
      title: "PUCIT Job Portal",
      description:
        "An automated website for hiring graduate students of PUCIT.",
      technologies: ["ReactJS", "NodeJS"],
      category: "web",
      image: "assets/images/pucit.jpg",
      link: "#",
    },
  ];

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectsGrid = document.querySelector(".projects-grid");

  // Initialize projects
  renderProjects(projects);

  // Add click event listeners to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      // Get filter category
      const filter = button.getAttribute("data-filter");

      // Filter and render projects
      const filteredProjects =
        filter === "all"
          ? projects
          : projects.filter((project) => project.category === filter);

      renderProjects(filteredProjects);
    });
  });

  // Render projects to the grid
  function renderProjects(projectsToRender) {
    if (!projectsGrid) return;

    // Clear existing projects
    projectsGrid.innerHTML = "";

    // Create project cards
    projectsToRender.forEach((project) => {
      const projectCard = createProjectCard(project);
      projectsGrid.appendChild(projectCard);
    });
  }

  // Create project card element
  function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";

    const technologies = project.technologies
      .map((tech) => `<span class="tech-tag">${tech}</span>`)
      .join("");

    card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${technologies}
                </div>
                <a href="${project.link}" class="btn" target="_blank" rel="noopener noreferrer">
                    View Project
                </a>
            </div>
        `;

    return card;
  }
});
