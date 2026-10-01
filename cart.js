/* =========================================
   DATA KERANJANG
========================================= */

let cart = [];


/* =========================================
   FORMAT HARGA RUPIAH
========================================= */

function formatRupiah(number) {
  return 'Rp ' + number.toLocaleString('id-ID');
}


/* =========================================
   TAMBAH PRODUK KE KERANJANG
========================================= */

function addToCart(name, price) {

  const existingItem = cart.find(
    item => item.name === name
  );

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  }

  updateCartUI();
}


/* =========================================
   TAMBAH JUMLAH (+)
========================================= */

function increaseQty(index) {

  if (!cart[index]) return;

  cart[index].qty += 1;

  updateCartUI();
}


/* =========================================
   KURANGI JUMLAH (-)
========================================= */

function decreaseQty(index) {

  if (!cart[index]) return;

  if (cart[index].qty > 1) {

    cart[index].qty -= 1;

  } else {

    // Kalau jumlah tinggal 1,
    // langsung hapus dari keranjang
    cart.splice(index, 1);

  }

  updateCartUI();
}


/* =========================================
   HAPUS PRODUK
========================================= */

function removeFromCart(index) {

  if (!cart[index]) return;

  cart.splice(index, 1);

  updateCartUI();
}


/* =========================================
   UPDATE TAMPILAN KERANJANG
========================================= */

function updateCartUI() {

  const container =
    document.getElementById('cart-items-container');

  const cartCount =
    document.getElementById('cart-count');

  const cartTotal =
    document.getElementById('cart-total');

  const btnCheckout =
    document.getElementById('btn-checkout');


  /* =====================================
     HITUNG TOTAL ITEM
  ====================================== */

  const totalItems = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );


  /* =====================================
     HITUNG TOTAL HARGA
  ====================================== */

  const subtotal = cart.reduce(
    (sum, item) => {
      return sum + (item.price * item.qty);
    },
    0
  );


  /* =====================================
     UPDATE HEADER
  ====================================== */

  cartCount.innerText = totalItems;

  cartTotal.innerText =
    formatRupiah(subtotal);


  /* =====================================
     KERANJANG KOSONG
  ====================================== */

  if (cart.length === 0) {

    container.innerHTML = `
      <p class="empty-cart">
        Keranjang masih kosong.
      </p>
    `;

    btnCheckout.disabled = true;

    return;
  }


  /* =====================================
     TAMPILKAN ITEM
  ====================================== */

  container.innerHTML = cart.map(
    (item, index) => {

      return `
        <div class="cart-item">

          <!-- INFORMASI PRODUK -->
          <div class="cart-item-info">

            <strong>
              ${item.name}
            </strong>

            <small>
              ${formatRupiah(item.price)}
            </small>

          </div>


          <!-- KONTROL JUMLAH -->
          <div class="cart-item-controls">

            <div class="quantity-control">

              <button
                class="qty-btn"
                onclick="decreaseQty(${index})"
              >
                −
              </button>

              <span class="qty-number">
                ${item.qty}
              </span>

              <button
                class="qty-btn"
                onclick="increaseQty(${index})"
              >
                +
              </button>

            </div>


            <!-- TOTAL PRODUK -->
            <strong class="item-total">
              ${formatRupiah(
                item.price * item.qty
              )}
            </strong>


            <!-- HAPUS -->
            <button
              class="remove-btn"
              onclick="removeFromCart(${index})"
            >
              Hapus
            </button>

          </div>

        </div>
      `;

    }
  ).join('');


  /* =====================================
     AKTIFKAN CHECKOUT
  ====================================== */

  btnCheckout.disabled = false;
}


/* =========================================
   BUKA MODAL KERANJANG
========================================= */

function openCartModal() {

  document.getElementById(
    'cartModal'
  ).style.display = 'flex';

}


/* =========================================
   TUTUP MODAL KERANJANG
========================================= */

function closeCartModal() {

  document.getElementById(
    'cartModal'
  ).style.display = 'none';

}

/* =========================================
   FILTER & SEARCH MENU
========================================= */

let activeCategory = 'semua';


function filterMenu(category, button) {

  activeCategory = category;

  const buttons =
    document.querySelectorAll('.category');

  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  button.classList.add('active');

  applyMenuFilter();
}


function searchMenu() {

  applyMenuFilter();

}


function applyMenuFilter() {

  const keyword =
    document.getElementById('search-menu')
      .value
      .toLowerCase()
      .trim();

  const cards =
    document.querySelectorAll('.food-card');


  cards.forEach(card => {

    const name =
      card.querySelector('h3')
        .innerText
        .toLowerCase();

    const description =
      card.querySelector('p')
        .innerText
        .toLowerCase();

    const category =
      card.getAttribute('data-category');


    const matchSearch =
      name.includes(keyword) ||
      description.includes(keyword);

    const matchCategory =
      activeCategory === 'semua' ||
      category === activeCategory;


    if (matchSearch && matchCategory) {

      card.style.display = '';

    } else {

      card.style.display = 'none';

    }

  });

}