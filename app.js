const IMG = "asset/jpg/";

const PRODUCTS = [
  {
    id: "mp-cherry",
    name: "CHERRIE",
    category: "wallet",
    image: IMG + "IMG_9360.jpg",
    note: "Big cherry on cream",
    details: [
      "Approx. 3.5 × 4.5 inches",
     
    ]
  },
  {
    id: "mw-bow",
    name: "ROSALIE",
    category: "wallet",
    image: IMG + "IMG_9365.jpg",
    note: "Peach floral ribbon ",
    details: [
      "Approx. 3.5 × 4.5 inches",
    ]
  },
  {
    id: "mp-acorn",
    name: "HAZEL",
    category: "wallet",
    image: IMG + "IMG_9353.jpg",
    note: "Green autumn leaves",
    details: [
      "Approx. 3.5 × 4.5 inches",
      "Dusty sage print with layered cotton lining",
      "Metal zip and hand-finished edges",
      "Perfect for keys, earbuds and accessories"
    ]
  },
  {
    id: "mw-daisy",
    name: "Butter Daisy Mini Wallet",
    category: "wallet",
    image: IMG + "IMG_9376.jpg",
    note: "Yellow blooms, pink zip",
    desc: "Bright floral styling with a cheerful palette and compact proportions for effortless everyday use.",
    details: [
      "Approx. 11 × 8 cm",
      "Soft cotton exterior and cotton lining",
      "Candy pink zip with hand-sewn finish",
      "Slim enough for a coat pocket or handbag"
    ]
  },
  {
    id: "mw-lovely",
    name: "Lovely Citrus Mini Wallet",
    category: "wallet",
    image: IMG + "IMG_9361.jpg",
    note: "Tiny oranges & 'lovely' tags",
    desc: "A playful citrus print with a bright pop of colour and a compact cut designed for daily practicality.",
    details: [
      "Approx. 11 × 8 cm",
      "Structured body with folded-card capacity",
      "Quilted and lined for a soft, durable finish",
      "Made to match a bright everyday outfit"
    ]
  },
  {
    id: "mp-corduroy",
    name: "Midnight Corduroy Mini Wallet",
    category: "wallet",
    image: IMG + "IMG_9378.jpg",
    note: "Chunky wale corduroy",
    desc: "An inky midnight piece with a rich texture and a subtle, roomy profile for effortless carrying.",
    details: [
      "Approx. 13 × 9.5 cm",
      "Textured cotton corduroy with quilted body",
      "Designed for subtle everyday styling",
      "Finished with a soft wristlet loop"
    ]
  },
  {
    id: "mw-bluebow",
    name: "Blue Ribbon Mini Wallet",
    category: "wallet",
    image: IMG + "IMG_9373.jpg",
    note: "Sky blue bows on ivory",
    desc: "Crisp ivory cotton with scattered ribbon details and a clean, minimal finish for daily ease.",
    details: [
      "Approx. 11 × 8 cm",
      "Lightweight cotton body with structured shape",
      "Easy to carry in a bag, pocket or pouch",
      "Softly quilted for a polished finish"
    ]
  }
];

const GALLERY = [
  "IMG_9319.jpg", "IMG_9350.jpg", "IMG_9356.jpg", "IMG_9358.jpg",
  "IMG_9359.jpg", "IMG_9362.jpg", "IMG_9364.jpg", "IMG_9366.jpg",
  "IMG_9367.jpg", "IMG_9369.jpg", "IMG_9379.jpg", "IMG_9381.jpg",
  "IMG_9385.jpg", "IMG_9385_2.jpg"
];

const $ = (sel) => document.querySelector(sel);
let activeFilter = "all";
let activeFilterEmptyMessage = "";
let activeFilterDescription = "";
let activeFilterFeatures = [];
let activeFilterPrice = "";
let activeProduct = null;

function getCategoryLabel(category) {
  if (category === "wallet") return "Mini wallet";
  if (category === "cable-holder") return "Cable holder";
  return "Mini pouch";
}

function renderProducts() {
  const grid = $("#productGrid");
  const list = PRODUCTS.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  if (list.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.setAttribute("role", "status");
    emptyState.textContent = activeFilterEmptyMessage;
    grid.replaceChildren(emptyState);
    return;
  }

  const productCards = list.map((p) => {
    const card = document.createElement("article");
    card.className = "card";

    const media = document.createElement("button");
    media.className = "card-media";
    media.setAttribute("aria-label", "View " + p.name);
    media.addEventListener("click", () => openProduct(p.id));

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;
    img.loading = "lazy";
    media.append(img);

    const body = document.createElement("div");
    body.className = "card-body";

    const cat = document.createElement("p");
    cat.className = "card-cat";
    cat.textContent = getCategoryLabel(p.category);

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = p.name;

    const note = document.createElement("p");
    note.className = "card-note";
    note.textContent = p.note;

    const foot = document.createElement("div");
    foot.className = "card-foot";

    const view = document.createElement("button");
    view.className = "add-btn";
    view.textContent = "View details";
    view.addEventListener("click", (event) => {
      event.stopPropagation();
      openProduct(p.id);
    });

    foot.append(view);
    body.append(cat, title, note, foot);
    card.append(media, body);
    return card;
  });

  const content = [];
  if (activeFilterDescription) {
    const description = document.createElement("p");
    description.className = "filter-description";
    description.textContent = activeFilterDescription;
    content.push(description);
  }
  if (activeFilterFeatures.length) {
    const features = document.createElement("ul");
    features.className = "filter-features";
    features.setAttribute("aria-label", "Mini wallet features");
    activeFilterFeatures.forEach((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      features.append(item);
    });
    content.push(features);
  }
  if (activeFilterPrice) {
    const price = document.createElement("div");
    price.className = "filter-price";
    price.setAttribute("aria-label", `${activeFilterPrice} each`);
    const amount = document.createElement("span");
    amount.className = "filter-price-amount";
    amount.textContent = activeFilterPrice;
    const unit = document.createElement("span");
    unit.className = "filter-price-unit";
    unit.textContent = "each";
    price.append(amount, unit);
    content.push(price);
  }
  content.push(...productCards);

  grid.replaceChildren(
    ...content
  );

}

function renderGallery() {
  const grid = $("#galleryGrid");
  grid.replaceChildren(
    ...GALLERY.map((file) => {
      const img = document.createElement("img");
      img.src = IMG + file;
      img.alt = "MIIISHOP handmade everyday pouch and wallet";
      img.loading = "lazy";
      return img;
    })
  );
}

function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  activeProduct = p;

  $("#pmImage").src = p.image;
  $("#pmImage").alt = p.name;
  $("#pmCat").textContent = getCategoryLabel(p.category);
  $("#pmTitle").textContent = p.name;
  $("#pmDesc").textContent = p.desc;
  const details = p.category === "wallet"
    ? [...p.details.filter((item) => item.startsWith("Approx.")), "Includes a wristlet — color of your choice"]
    : p.details;
  $("#pmMeta").innerHTML = details.map((item) => `<li>${item}</li>`).join("");
  $("#pmOptions").hidden = p.category !== "wallet";
  $("#pmNote").hidden = p.category !== "wallet";

  $("#productModal").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  $("#productModal").hidden = true;
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) closeProductModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProductModal();
});

$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  activeFilter = chip.dataset.filter;
  activeFilterEmptyMessage = chip.dataset.emptyMessage || "";
  activeFilterDescription = chip.dataset.description || "";
  activeFilterFeatures = chip.dataset.features ? chip.dataset.features.split("|") : [];
  activeFilterPrice = chip.dataset.price || "";
  document.querySelectorAll(".chip").forEach((c) =>
    c.classList.toggle("is-active", c === chip)
  );
  renderProducts();
});

$("#year").textContent = new Date().getFullYear();
renderProducts();
renderGallery();
