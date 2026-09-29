const IMG = "asset/jpg/";

const PRODUCTS = [
  {
    id: "mp-strawberry-mushroom",
    name: "Strawberry Field Mini Pouch",
    category: "pouch",
    price: 18,
    image: IMG + "IMG_9375.jpg",
    badge: "Bestseller",
    note: "Cream cotton, berry-red zip",
    desc: "Wild strawberries and little mushrooms on soft cream cotton, quilted in a diamond grid and finished with a deep berry zip. Roomy enough for cards, coins and a lip balm."
  },
  {
    id: "mp-cherry",
    name: "Cherry Orchard Mini Pouch",
    category: "pouch",
    price: 18,
    image: IMG + "IMG_9360.jpg",
    badge: "New",
    note: "Hand-painted cherry print",
    desc: "A painterly cherry print with sage leaves on ivory. The quilting runs on the diagonal so the fruit sits between the seams. Pairs beautifully with the red wristlet."
  },
  {
    id: "mw-bow",
    name: "Ribbon Bow Mini Wallet",
    category: "wallet",
    price: 16,
    image: IMG + "IMG_9365.jpg",
    badge: "Gift pick",
    note: "Vintage floral with a blush bow",
    desc: "A soft blush bow framed by antique roses. Slim enough to slip into a coat pocket, with room for four or five cards plus folded notes."
  },
  {
    id: "mp-acorn",
    name: "Acorn Grove Mini Pouch",
    category: "pouch",
    price: 18,
    image: IMG + "IMG_9353.jpg",
    note: "Sage green, brass zip pull",
    desc: "Acorns, oak leaves and tiny wildflowers on dusty sage. Warm linen-toned zip tape and an antique brass pull — the most autumnal piece in the shop."
  },
  {
    id: "mw-daisy",
    name: "Butter Daisy Mini Wallet",
    category: "wallet",
    price: 16,
    image: IMG + "IMG_9376.jpg",
    note: "Yellow blooms, pink zip",
    desc: "Buttery yellow and peach daisies scattered over cream, with a candy pink zip. Cheerful, compact and hard to lose at the bottom of a bag."
  },
  {
    id: "mw-lovely",
    name: "Lovely Citrus Mini Wallet",
    category: "wallet",
    price: 16,
    image: IMG + "IMG_9361.jpg",
    note: "Tiny oranges & 'lovely' tags",
    desc: "A playful print of small oranges, navy leaves and hidden 'LOVELY' tags. Ivory zip, brass pull, and a side loop so you can clip on any strap."
  },
  {
    id: "mp-corduroy",
    name: "Midnight Corduroy Mini Pouch",
    category: "pouch",
    price: 19,
    image: IMG + "IMG_9378.jpg",
    badge: "Limited",
    note: "Chunky wale corduroy",
    desc: "Inky black corduroy, quilted along the wale for a ribbed, pillowy finish. The quiet one of the collection — goes with absolutely everything."
  },
  {
    id: "mw-bluebow",
    name: "Blue Ribbon Mini Wallet",
    category: "wallet",
    price: 16,
    image: IMG + "IMG_9373.jpg",
    note: "Sky blue bows on ivory",
    desc: "Tiny sky-blue ribbons scattered across ivory cotton. Crisp, fresh and the easiest one to match with a bright strap."
  }
];

const GALLERY = [
  "IMG_9319.jpg", "IMG_9350.jpg", "IMG_9356.jpg", "IMG_9358.jpg",
  "IMG_9359.jpg", "IMG_9362.jpg", "IMG_9364.jpg", "IMG_9366.jpg",
  "IMG_9367.jpg", "IMG_9369.jpg", "IMG_9379.jpg", "IMG_9381.jpg",
  "IMG_9385.jpg", "IMG_9385_2.jpg"
];

const CART_KEY = "miiishop.cart.v1";

const $ = (sel) => document.querySelector(sel);
const money = (n) => "$" + n.toFixed(2);

let cart = loadCart();
let activeFilter = "all";
let activeProduct = null;

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ---------- rendering ---------- */

function renderProducts() {
  const grid = $("#productGrid");
  const list = PRODUCTS.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  grid.replaceChildren(
    ...list.map((p) => {
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

      if (p.badge) {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = p.badge;
        media.append(badge);
      }

      const body = document.createElement("div");
      body.className = "card-body";

      const cat = document.createElement("p");
      cat.className = "card-cat";
      cat.textContent = p.category === "wallet" ? "Mini wallet" : "Mini pouch";

      const title = document.createElement("h3");
      title.className = "card-title";
      title.textContent = p.name;

      const note = document.createElement("p");
      note.className = "card-note";
      note.textContent = p.note;

      const foot = document.createElement("div");
      foot.className = "card-foot";

      const price = document.createElement("span");
      price.className = "price";
      price.textContent = money(p.price);

      const add = document.createElement("button");
      add.className = "add-btn";
      add.textContent = "Add";
      add.addEventListener("click", () => addToCart(p.id, 1, "Cream"));

      foot.append(price, add);
      body.append(cat, title, note, foot);
      card.append(media, body);
      return card;
    })
  );
}

function renderGallery() {
  const grid = $("#galleryGrid");
  grid.replaceChildren(
    ...GALLERY.map((file) => {
      const img = document.createElement("img");
      img.src = IMG + file;
      img.alt = "MIIISHOP handmade mini pouch and wallet";
      img.loading = "lazy";
      return img;
    })
  );
}

function renderCart() {
  const box = $("#cartItems");
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const total = cart.reduce((n, i) => n + i.qty * i.price, 0);

  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = money(total);

  if (!cart.length) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "Your cart is empty.";
    box.replaceChildren(p);
    return;
  }

  box.replaceChildren(
    ...cart.map((item, index) => {
      const row = document.createElement("div");
      row.className = "line-item";

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;

      const mid = document.createElement("div");
      const name = document.createElement("div");
      name.className = "li-name";
      name.textContent = item.name;
      const opt = document.createElement("div");
      opt.className = "li-opt";
      opt.textContent = "Strap: " + item.strap;

      const controls = document.createElement("div");
      controls.className = "li-controls";
      const minus = document.createElement("button");
      minus.textContent = "−";
      minus.setAttribute("aria-label", "Decrease quantity");
      minus.addEventListener("click", () => changeQty(index, -1));
      const qty = document.createElement("span");
      qty.className = "li-qty";
      qty.textContent = item.qty;
      const plus = document.createElement("button");
      plus.textContent = "+";
      plus.setAttribute("aria-label", "Increase quantity");
      plus.addEventListener("click", () => changeQty(index, 1));
      controls.append(minus, qty, plus);
      mid.append(name, opt, controls);

      const right = document.createElement("div");
      right.className = "li-right";
      const sum = document.createElement("strong");
      sum.textContent = money(item.price * item.qty);
      const remove = document.createElement("button");
      remove.className = "li-remove";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => removeItem(index));
      right.append(sum, remove);

      row.append(img, mid, right);
      return row;
    })
  );
}

/* ---------- cart actions ---------- */

function addToCart(id, qty, strap) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((i) => i.id === id && i.strap === strap);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 10);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      strap,
      qty
    });
  }
  saveCart();
  renderCart();
  showToast(product.name + " added to cart");
}

function changeQty(index, delta) {
  const item = cart[index];
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

/* ---------- product modal ---------- */

function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  activeProduct = p;

  $("#pmImage").src = p.image;
  $("#pmImage").alt = p.name;
  $("#pmCat").textContent = p.category === "wallet" ? "Mini wallet" : "Mini pouch";
  $("#pmTitle").textContent = p.name;
  $("#pmPrice").textContent = money(p.price);
  $("#pmDesc").textContent = p.desc;
  $("#pmQty").value = 1;
  $("#pmStrap").selectedIndex = 0;

  openOverlay($("#productModal"));
}

/* ---------- overlays ---------- */

function openOverlay(el) {
  el.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeOverlays() {
  $("#productModal").hidden = true;
  $("#cartDrawer").hidden = true;
  document.body.style.overflow = "";
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
}

/* ---------- wiring ---------- */

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) closeOverlays();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOverlays();
});

$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  activeFilter = chip.dataset.filter;
  document.querySelectorAll(".chip").forEach((c) =>
    c.classList.toggle("is-active", c === chip)
  );
  renderProducts();
});

$("#cartBtn").addEventListener("click", () => openOverlay($("#cartDrawer")));

$("#pmAdd").addEventListener("click", () => {
  if (!activeProduct) return;
  const qty = Math.max(1, Math.min(10, Number($("#pmQty").value) || 1));
  addToCart(activeProduct.id, qty, $("#pmStrap").value);
  closeOverlays();
});

$("#checkoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }
  cart = [];
  saveCart();
  renderCart();
  closeOverlays();
  showToast("Thank you! This demo doesn't take real payments.");
});

$("#year").textContent = new Date().getFullYear();
renderProducts();
renderGallery();
renderCart();
