const IMG = "asset/";

const DEFAULT_ZIPPER_COLORS = ["White", "Rice white", "Beige", "Brown", "Pink", "Red"];
const DEFAULT_LINING_COLORS = ["Brown", "Champagne", "Rust Orange", "Pink", "Sky blue", "Maroon", "Brown", "Dark Peach", "Red", "Light pink"];

const PRODUCT_PHOTO_SETS = [
  {
    name: "AMBER",
    files: ["AMBER.png", "AMBER2.png", "AMBER3.png"],
    note: "Yellow and orange strawberry",
    zipperColors: ["Rice white"],
    liningColors: ["Rust Orange"]
  },
  {
    name: "BEA",
    files: ["BEA.png", "BEA2.png", "BEA3.png"],
    note: "Bunny garden on cream",
    liningColors: ["Brown"],
  },
  {
    name: "BERRY",
    files: ["BERRY.png", "BERRY2.png", "BERRY3.png"],
    note: "Pink classic strawberry",
    zipperColors: ["Red", "Pink"],
    liningColors: ["Red"]
  },
  {
    name: "CHERRIE",
    files: ["CHERRIE.png", "CHERRIE2.png", "CHERRIE3.png"],
    note: "Big cherry on cream",
    liningColors: ["Brown"]
  },
  {
    name: "CLEO",
    files: ["CLEO.png", "CLEO2.png", "CLEO3.png"],
    note: "Beige mini grid",
    zipperColors: ["Brown", "Rice White"],
    liningColors: ["Brown"]
  },
  {
    name: "CLOVER",
    files: ["CLOVER.png", "CLOVER2.png", "CLOVER3.png"],
    note: "Sage ditsy floral",
    zipperColors: ["White"],
    liningColors: ["Dark Peach"]
  },
  {
    name: "HAZEL",
    files: ["HAZEL.png", "HAZEL2.png", "HAZEL3.png"],
    note: "Green autumn leaves",
    zipperColors: ["Rice White", "Beige"],
    liningColors: ["Champagne", "Brown"],
    
  },
  {
    name: "LILY",
    files: ["LILY.png", "LILY2.png", "LILY3.png"],
    category: "everyday-pouch",
    note: "Handmade everyday pouch",
    zipperColors: ["Red"],
    liningColors: ["Red"]
  },
  {
    name: "LUNA",
    files: ["LUNA.png", "LUNA2.png", "LUNA33.png"],
    note: "Butter yellow strawberry",
    zipperColors: ["Red"],
    liningColors: ["Maroon"]
  },
  {
    name: "MARIGOLD",
    files: ["MARIGOLD.png", "MARIGOLD2.png", "MARIGOLD3.png"],
    note: "Yellow and pink daisy",
    zipperColors: ["Rice White"],
    liningColors: ["Rust Orange"]
  },
  {
    name: "MIA",
    files: ["MIA.png", "MIA2.png", "MIA3.png"],
    note: "White mini cherry orange",
    zipperColors: ["Rice White", "White"],
    liningColors: ["Rust Orange", "Sky Blue"]
  },
  {
    name: "MILLIE",
    files: ["MILLIE.png", "MILLIE2.png", "MILLIE3.png"],
    note: "White mixed strawberry",
    zipperColors: ["Red", "Rice White"],
    liningColors: ["Maroon", "Rust Orange"]
  },
  {
    name: "POLLY",
    files: ["POLLY.png", "POLLY2.png", "POLLY3.png"],
    note: "White small cherry",
    zipperColors: ["Red", "White"],
    liningColors: ["Red", "Dark Peach"]
  },
  {
    name: "ROSIE",
    files: ["ROSIE.png", "ROSIE2.png", "ROSIE3.png"],
    note: "Pink strawberry blossom",
    zipperColors: ["Pink"],
    liningColors: ["Light Pink"]
  },
  {
    name: "SOPHIE",
    files: ["SOPHIE.png", "SOPHIE2.png", "SOPHIE3.png"],
    category: "everyday-pouch",
    note: "Handmade everyday pouch",
    zipperColors: ["Red"],
    liningColors: ["Red"]
  },
  {
    name: "STACEY",
    files: ["STACEY.png", "STACEY2.png", "STACEY3.png"],
    category: "everyday-pouch",
    note: "Handmade everyday pouch",
    zipperColors: ["Red"],
    liningColors: ["Red"]
  },
  {
    name: "WINNIE",
    files: ["WINNIE.png", "WINNIE2.png", "WINNIE3.png"],
    note: "Brown cottage garden",
    zipperColors: ["Brown"],
    liningColors: ["Brown"]
  },
  {
    name: "BROWN",
    files: ["BROWN.png"],
    note: "Corduroy",
    zipperColors: ["Brown"],
    liningColors: ["Brown"],
    details: ["Approx. 3.5 × 4.5 inches", "Suitable for all genders"]
  },
  {
    name: "BLACK",
    files: ["BLACK.png", "BLACK2.png"],
    note: "Corduroy",
    zipperColors: ["Black"],
    liningColors: ["Black"],
    details: ["Approx. 3.5 × 4.5 inches", "Suitable for all genders"]
  }
];

const PRODUCTS = PRODUCT_PHOTO_SETS.map(({ name, files, ...options }) => ({
  id: name.toLowerCase(),
  name,
  category: options.category || "wallet",
  image: IMG + files[0],
  images: [
    ...files.map((file) => IMG + file),
    ...((options.category || "wallet") === "wallet" ? [IMG + "WRISTLETS.png"] : [])
  ],
  note: options.note || "Handmade mini wallet",
  zipperColors: options.zipperColors || [...DEFAULT_ZIPPER_COLORS],
  liningColors: options.liningColors || [...DEFAULT_LINING_COLORS],
  details: options.details || ["Approx. 3.5 × 4.5 inches"]
}));

const GALLERY = PRODUCT_PHOTO_SETS.map(({ files }) => files[0]);

const $ = (sel) => document.querySelector(sel);
let activeFilter = "all";
let activeFilterEmptyMessage = "";
let activeFilterDescription = "";
let activeFilterFeatures = [];
let activeFilterPrice = "";
let activeProduct = null;
let activeProductImages = [];
let activeImageIndex = 0;

function getCategoryLabel(category) {
  if (category === "wallet") return "Mini wallet";
  if (category === "everyday-pouch") return "Everyday pouch";
  if (category === "cable-holder") return "Cable holder";
  return "Mini pouch";
}

function renderColorSwatches(listSelector, colors = []) {
  const list = $(listSelector);
  const group = list.closest(".color-group");
  list.replaceChildren(
    ...colors.map((color) => {
      const item = document.createElement("li");
      const swatch = document.createElement("span");
      swatch.className = `color-dot swatch-${color.toLowerCase().replaceAll(" ", "-")}`;
      swatch.setAttribute("aria-hidden", "true");
      item.append(swatch, document.createTextNode(color));
      return item;
    })
  );
  group.hidden = colors.length === 0;
}

function renderProducts() {
  const grid = $("#productGrid");
  const list = PRODUCTS.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );
  if (activeFilter === "all") {
    const categoryOrder = { wallet: 0, "everyday-pouch": 1 };
    const walletEndOrder = { BROWN: 1, BLACK: 2 };
    list.sort((a, b) => {
      const categoryDifference = (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99);
      if (categoryDifference) return categoryDifference;

      if (a.category === "wallet") {
        const aEndOrder = walletEndOrder[a.name] || 0;
        const bEndOrder = walletEndOrder[b.name] || 0;
        if (aEndOrder !== bEndOrder) return aEndOrder - bEndOrder;
      }

      return a.name.localeCompare(b.name);
    });
  }

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

    if (p.soldOut) {
      const status = document.createElement("span");
      status.className = "badge sold-out-badge";
      status.textContent = "Sold out";
      media.append(status);
    }

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
  activeProductImages = p.images || [p.image];
  activeImageIndex = 0;

  updateProductCarousel();
  $("#pmCat").textContent = getCategoryLabel(p.category);
  $("#pmTitle").textContent = p.name;
  $("#pmSoldOut").hidden = !p.soldOut;
  $("#pmDesc").textContent = p.desc;
  const details = p.category === "wallet"
    ? [
        ...p.details.filter((item) => item.startsWith("Approx.") || item === "Suitable for all genders"),
        "Includes a wristlet — color of your choice"
      ]
    : p.details;
  $("#pmMeta").innerHTML = details.map((item) => `<li>${item}</li>`).join("");
  $("#pmOptions").hidden = p.category !== "wallet";
  renderColorSwatches("#pmZipperColors", p.zipperColors);
  renderColorSwatches("#pmLiningColors", p.liningColors);
  $("#pmNote").hidden = p.category !== "wallet";

  $("#productModal").hidden = false;
  document.body.style.overflow = "hidden";
}

function updateProductCarousel() {
  const image = $("#pmImage");
  const previous = $("#pmImagePrevious");
  const next = $("#pmImageNext");
  const indicators = $("#pmImageIndicators");
  const imageCount = activeProductImages.length;

  image.src = activeProductImages[activeImageIndex];
  image.alt = imageCount > 1
    ? `${activeProduct.name}, photo ${activeImageIndex + 1} of ${imageCount}`
    : activeProduct.name;
  previous.hidden = imageCount < 2;
  next.hidden = imageCount < 2;
  indicators.replaceChildren();

  activeProductImages.forEach((_, index) => {
    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.className = "pm-image-indicator";
    indicator.setAttribute("aria-label", `Show photo ${index + 1}`);
    indicator.setAttribute("aria-pressed", String(index === activeImageIndex));
    indicator.addEventListener("click", () => {
      activeImageIndex = index;
      updateProductCarousel();
    });
    indicators.append(indicator);
  });
  indicators.hidden = imageCount < 2;
}

function changeProductImage(direction) {
  if (activeProductImages.length < 2) return;
  activeImageIndex = (activeImageIndex + direction + activeProductImages.length) % activeProductImages.length;
  updateProductCarousel();
}

$("#pmImagePrevious").addEventListener("click", () => changeProductImage(-1));
$("#pmImageNext").addEventListener("click", () => changeProductImage(1));

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
