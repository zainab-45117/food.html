// RESTAURANT MENU DATA

const dishes = [
{
id: 1,
name: "Truffle Cream Pasta",
cat: "Main Course",
price: 1850,
desc: "Creamy pasta with parmesan and truffle.",
img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85"
},
{
id: 2,
name: "Grilled Ribeye Steak",
cat: "Main Course",
price: 3200,
desc: "Premium grilled steak with herbs.",
img: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=900&q=85"
},
{
id: 3,
name: "Golden Crispy Prawns",
cat: "Starters",
price: 1450,
desc: "Crispy prawns with special sauce.",
img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85"
},
{
id: 4,
name: "Chocolate Fondant",
cat: "Desserts",
price: 950,
desc: "Warm chocolate cake with ice cream.",
img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85"
},
{
id: 5,
name: "Classic Tiramisu",
cat: "Desserts",
price: 850,
desc: "Coffee layers with mascarpone cream.",
img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85"
},
{
id: 6,
name: "Rose Lemonade",
cat: "Drinks",
price: 550,
desc: "Fresh lemonade with a hint of rose.",
img: "https://images.unsplash.com/photo-1513558161293-cd2cc7ab8c32?auto=format&fit=crop&w=900&q=85"
},
{
id: 7,
name: "Garden Salad",
cat: "Starters",
price: 1150,
desc: "Fresh greens and seasonal vegetables.",
img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85"
},
{
id: 8,
name: "Saffron Chicken",
cat: "Main Course",
price: 2100,
desc: "Tender chicken with saffron rice.",
img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85"
},
{
id: 9,
name: "Iced Spanish Latte",
cat: "Drinks",
price: 650,
desc: "Smooth iced coffee with milk.",
img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85"
}
];

let cart = [];
let discountRate = 0;

let orders = JSON.parse(
localStorage.getItem("noorOrders") || "[]"
);

let reservations = JSON.parse(
localStorage.getItem("noorReservations") || "[]"
);


// PAGE NAVIGATION

function showPage(id) {

document.querySelectorAll(".page").forEach(page => {
page.classList.toggle("active", page.id === id);
});

document.querySelectorAll("[data-page]").forEach(button => {
button.classList.toggle("active", button.dataset.page === id);
});

if (id === "checkout") {
renderCart();
}

if (id === "summary") {
renderSummary();
}

if (id === "admin") {
renderAdmin();
}

window.scrollTo({
top: 0,
behavior: "smooth"
});

}


// PRICE FORMAT

function money(price) {
return "Rs " + Number(price).toLocaleString("en-PK");
}


// FOOD CARDS

function card(d) {

return `
<article class="food-card overflow-hidden">

<img
class="food-img"
src="${d.img}"
alt="${d.name}"
>

<div class="p-5">

<div class="flex justify-between gap-3">

<span class="section-kicker">${d.cat}</span>

<b class="gold text-sm">
${money(d.price)}
</b>

</div>

<h3 class="text-2xl mt-2">
${d.name}
</h3>

<p class="muted text-xs leading-6 mt-2">
${d.desc}
</p>

<button
class="gold-btn w-full py-3 mt-5 text-xs"
onclick="addToCart(${d.id})">

ADD TO CART

</button>

</div>
</article>
`;

}


// MENU SEARCH AND FILTER

function renderMenu() {

const search =
document.getElementById("menuSearch").value.toLowerCase();

const category =
document.getElementById("categoryFilter").value;

const sort =
document.getElementById("sortFilter").value;

let list = dishes.filter(d => {

return (
(category === "All" || d.cat === category) &&
(
d.name.toLowerCase().includes(search) ||
d.desc.toLowerCase().includes(search)
)
);

});

if (sort === "low") {
list.sort((a, b) => a.price - b.price);
}

if (sort === "high") {
list.sort((a, b) => b.price - a.price);
}

document.getElementById("menuGrid").innerHTML =
list.length
? list.map(card).join("")
: "<p class='muted'>No dishes found.</p>";

}


// ADD TO CART

function addToCart(id) {

const dish = dishes.find(item => item.id === id);

const existing = cart.find(item => item.id === id);

if (existing) {
existing.qty++;
} else {
cart.push({
...dish,
qty: 1
});
}

updateCartCount();
renderCart();

alert(dish.name + " added to cart!");

}


// QUANTITY MANAGEMENT

function changeQty(id, amount) {

const item = cart.find(x => x.id === id);

if (!item) return;

item.qty += amount;

if (item.qty <= 0) {
cart = cart.filter(x => x.id !== id);
}

updateCartCount();
renderCart();

}


// CART COUNT

function updateCartCount() {

const count = cart.reduce(
(total, item) => total + item.qty,
0
);

document.getElementById("cartCount").textContent = count;

}


// CART DISPLAY

function renderCart() {

const box = document.getElementById("cartItems");

if (!box) return;

if (cart.length === 0) {

box.innerHTML = `
<div class="panel p-7 muted text-sm">
Your cart is empty.
<button
class="gold underline"
onclick="showPage('menu')">
Explore the menu
</button>
</div>
`;

} else {

box.innerHTML = cart.map(item => `

<div class="flex items-center gap-4 border-b border-[#3b3020] py-5">

<img
src="${item.img}"
class="w-20 h-20 object-cover"
alt="${item.name}"
>

<div class="flex-1">

<h3 class="text-xl">${item.name}</h3>

<p class="gold text-sm">
${money(item.price)}
</p>

<div class="flex gap-3 items-center mt-2">

<button
class="outline-btn px-2"
onclick="changeQty(${item.id},-1)">
−
</button>

<span>${item.qty}</span>

<button
class="outline-btn px-2"
onclick="changeQty(${item.id},1)">
+
</button>

</div>

</div>

<b>${money(item.price * item.qty)}</b>

</div>

`).join("");

}

const subtotal = cart.reduce(
(sum, item) => sum + item.price * item.qty,
0
);

const discount = Math.round(subtotal * discountRate);

document.getElementById("subtotal").textContent =
money(subtotal);

document.getElementById("discount").textContent =
money(discount);

document.getElementById("total").textContent =
money(subtotal - discount);

}


// PROMO CODE

function applyPromo() {

const code = document
.getElementById("promoInput")
.value.trim().toUpperCase();

const message =
document.getElementById("promoMessage");

if (code === "NOOR10") {

discountRate = 0.10;

message.textContent =
"Congratulations! 10% discount applied.";

message.className = "text-xs gold mt-2";

} else {

discountRate = 0;

message.textContent =
"Invalid code. Try NOOR10.";

message.className = "text-xs text-red-400 mt-2";

}

renderCart();

}


// PLACE ORDER

function placeOrder() {

if (cart.length === 0) {

alert("Your cart is empty!");

return;

}

const subtotal = cart.reduce(
(sum, item) => sum + item.price * item.qty,
0
);

const discount = Math.round(subtotal * discountRate);

const order = {

id: "NOOR-" + Date.now().toString().slice(-6),

date: new Date().toLocaleString(),

items: cart.map(item => ({ ...item })),

total: subtotal - discount

};

orders.unshift(order);

localStorage.setItem(
"noorOrders",
JSON.stringify(orders)
);

cart = [];
discountRate = 0;

updateCartCount();
renderSummary();

showPage("summary");

}


// ORDER SUMMARY

function renderSummary() {

const box = document.getElementById("orderSummary");

if (!box) return;

if (orders.length === 0) {

box.innerHTML = `
<p class="muted text-sm">
No order placed yet.
</p>
`;

return;

}

const order = orders[0];

box.innerHTML = `

<div class="flex flex-wrap justify-between gap-3">

<div>

<p class="section-kicker">
Order confirmation
</p>

<h2 class="text-3xl gold mt-2">
${order.id}
</h2>

</div>

<p class="muted text-xs">
${order.date}
</p>

</div>

<div class="mt-6">

${order.items.map(item => `

<div class="flex justify-between py-3 border-b border-[#51432c] text-sm">

<span>
${item.name} × ${item.qty}
</span>

<b>
${money(item.price * item.qty)}
</b>

</div>

`).join("")}

</div>

<div class="flex justify-between text-xl mt-6">

<b>Total</b>

<b class="gold">
${money(order.total)}
</b>

</div>

<p class="muted text-xs mt-5">
Demo order. No real payment processed.
</p>

`;

}


// RESERVATION FORM

document
.getElementById("reservationForm")
.addEventListener("submit", function(e) {

e.preventDefault();

const data = Object.fromEntries(
new FormData(this).entries()
);

reservations.unshift(data);

localStorage.setItem(
"noorReservations",
JSON.stringify(reservations)
);

document.getElementById("reservationMessage").textContent =
"Thank you! Your reservation request has been saved.";

this.reset();

});


// CONTACT FORM

document
.getElementById("contactForm")
.addEventListener("submit", function(e) {

e.preventDefault();

document.getElementById("contactMessage").textContent =
"Thank you! Your message has been received.";

this.reset();

});


// MANAGEMENT DASHBOARD

function renderAdmin() {

document.getElementById("adminMenuCount").textContent =
dishes.length;

document.getElementById("adminOrderCount").textContent =
orders.length;

document.getElementById("adminReservationCount").textContent =
reservations.length;


document.getElementById("adminReservations").innerHTML =

reservations.length

? reservations.map(r => `

<div class="py-3 border-b border-[#51432c]">

<b class="gold">${r.name}</b>

· ${r.date} at ${r.time}

· ${r.guests} guests

</div>

`).join("")

: "No reservations yet.";


document.getElementById("adminOrders").innerHTML =

orders.length

? orders.map(o => `

<div class="py-3 border-b border-[#51432c]">

<b class="gold">${o.id}</b>

· ${o.date}

· ${money(o.total)}

</div>

`).join("")

: "No orders yet.";

}


// INITIAL WEBSITE DISPLAY

document.getElementById("homeFeatured").innerHTML =
dishes.slice(0, 3).map(card).join("");

document.getElementById("detailsGrid").innerHTML =
dishes.slice(0, 6).map(card).join("");

renderMenu();

updateCartCount();

renderCart();

function showPage(pageId) {
  if(pageId == 'product'){ pageId = 'shop'; }
  document.querySelectorAll('section').forEach(function(s){ s.classList.add('hidden'); });
  let p = document.getElementById(pageId);
  if(p){ p.classList.remove('hidden'); }
  window.scrollTo(0,0);
}