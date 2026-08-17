const foodMenu = [
  {
    id: "fish",
    title: "Fish Dishes",
    titleAmharic: "የ አሳ ምግቦች",
    image: "asset/luow-seafood-4265991_1920.jpg",
    items: [
      ["አሳ ኮምቦ", "Qurxummii Koomboo", "1700 ETB"],
      ["አሳ ኮተሌት", "Qurxummii Koteleetii", "700 ETB"],
      ["አሳ ጥብስ", "Qurxummii Xabsii", "700 ETB"],
      ["አሳ ጉላሽ", "Qurxummii Gulaashii", "700 ETB"],
      ["አሳ ለብ ለብ", "Qurxummii Leb Leb", "700 ETB"],
      ["አሳ ዱለት", "Duuletii Qurxummii", "300 ETB"],
      ["አሳ ክሬም ሾርባ", "Shoorbaa Kiriimii Qurxummii", "300 ETB"]
    ]
  },
  {
    id: "vegetable",
    title: "Vegetable Dishes",
    titleAmharic: "አትክልት ምግቦች",
    image: "asset/1-removebg-preview.png",
    items: [
      ["ስፔሻል አትክልት", "Atkiltii Ispeeshaalii", "300 ETB"],
      ["አትክልት", "Atkiltii", "300 ETB"],
      ["አትክልት ክሬም ሾርባ", "Shoorbaa Kiriimii Atkiltii", "300 ETB"]
    ]
  },
  {
    id: "lunch",
    title: "Lunch Dishes",
    titleAmharic: "የምሳ ምግቦች",
    image: "asset/image-removebg-preview (2).png",
    items: [
      ["በየ አይነት", "Aynetti", "200 ETB"],
      ["ተጋቢኖ", "Tegaabinoo", "200 ETB"],
      ["ሩዝ በአትክልት", "Ruuzaa fi Atkiltii", "200 ETB"],
      ["ሩዝ በሱጎ", "Ruuzaa fi Suugoo", "200 ETB"],
      ["ፖስታ በአትክልት", "Paastaa fi Atkiltii", "200 ETB"],
      ["ፖስታ በሱጎ", "Paastaa fi Suugoo", "200 ETB"]
    ]
  }
];

const drinkMenu = [
  { title: "Beer", titleAmharic: "ቢራ", items: [
    ["Large Beer", "ትልቁ ቢራ", "90 ETB"],
    ["Beer", "ቢራ", "70 ETB"],
    ["Beer", "ቢራ", "70 ETB"]
  ]},
  { title: "Soft Drinks", titleAmharic: "ለስላሳ መጠጦች", items: [
    ["Sprite", "", "60 ETB"], ["Coca-Cola", "", "60 ETB"], ["Fanta", "", "60 ETB"],
    ["Pepsi", "", "60 ETB"], ["Soofii", "", "70 ETB"], ["Malta", "", "70 ETB"], ["Nigus", "ንጉስ", "70 ETB"]
  ]},
  { title: "Water", titleAmharic: "ውሃ", items: [
    ["Large Water", "ትልቁ ውሃ", "60 ETB"],
    ["1 Litre Water", "1 ሊትር ውሃ", "45 ETB"],
    ["1/2 Litre Water", "1/2 ሊትር ውሃ", "40 ETB"],
    ["Ambo Water", "አምቦ ውሃ", "60 ETB"]
  ]}
];

function renderFoodMenu() {
  const root = document.getElementById("foodMenu");
  root.innerHTML = foodMenu.map((cat, index) => `
    <article class="food-category reveal ${index % 2 ? "reverse" : ""}">
      <div class="food-image">
        <img src="${cat.image}" alt="${cat.title} at Jimma Fish & Vegetable" loading="lazy">
      </div>
      <div class="food-items">
        <h3>${cat.title}</h3>
        <p class="amharic">${cat.titleAmharic}</p>
        <ul class="food-list">
          ${cat.items.map(item => `
            <li>
              <div class="food-name">
                <strong>${item[0]}</strong>
                <small>${item[1]}</small>
              </div>
              <span class="food-price">${item[2]}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    </article>
  `).join("");
}

function renderDrinkMenu() {
  const root = document.getElementById("drinkMenu");
  root.innerHTML = drinkMenu.map(cat => `
    <article class="drink-card">
      <div class="drink-card-header">
        <h4>${cat.title}</h4>
        <span>${cat.titleAmharic}</span>
      </div>
      <ul class="drink-list">
        ${cat.items.map(item => `
          <li>
            <span>${item[0]} ${item[1] ? `<em>${item[1]}</em>` : ""}</span>
            <strong>${item[2]}</strong>
          </li>
        `).join("")}
      </ul>
    </article>
  `).join("");
}

function setupNavigation() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  }, { passive: true });

  toggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

  elements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderFoodMenu();
  renderDrinkMenu();
  setupNavigation();
  setupReveal();
  document.getElementById("year").textContent = new Date().getFullYear();
});
