/* =========================================
   BIAYA LAYANAN
========================================= */

const serviceFee = 0;


/* =========================================
   METODE PEMBAYARAN
========================================= */

let selectedPayment = 'cash';


/* =========================================
   BUKA MODAL PEMBAYARAN
========================================= */

function openPaymentModal() {

  // Tutup modal keranjang
  closeCartModal();


  // Hitung subtotal
  const subtotal = cart.reduce(
    (sum, item) => {
      return sum + (item.price * item.qty);
    },
    0
  );


  // Hitung total
  const grandTotal = subtotal + serviceFee;


  // Tampilkan subtotal
  document.getElementById(
    'summary-subtotal'
  ).innerText = formatRupiah(subtotal);


  // Tampilkan total
  document.getElementById(
    'summary-grandtotal'
  ).innerText = formatRupiah(grandTotal);


  // Default pilih Cash
  selectPayment('cash');


  // Buka modal pembayaran
  document.getElementById(
    'paymentModal'
  ).style.display = 'flex';

}


/* =========================================
   PILIH METODE PEMBAYARAN
========================================= */

function selectPayment(method) {

  selectedPayment = method;


  const cashOption =
    document.getElementById('cash-option');

  const qrisOption =
    document.getElementById('qris-option');

  const cashPayment =
    document.getElementById('cash-payment');

  const qrisPayment =
    document.getElementById('qris-payment');


  /* =====================================
     RESET PILIHAN
  ====================================== */

  cashOption.classList.remove('active');
  qrisOption.classList.remove('active');

  cashPayment.style.display = 'none';
  qrisPayment.style.display = 'none';


  /* =====================================
     CASH
  ====================================== */

  if (method === 'cash') {

    cashOption.classList.add('active');

    cashPayment.style.display = 'block';

  }


  /* =====================================
     QRIS
  ====================================== */

  if (method === 'qris') {

    qrisOption.classList.add('active');

    qrisPayment.style.display = 'block';

  }

}


/* =========================================
   TUTUP MODAL PEMBAYARAN
========================================= */

function closePaymentModal() {

  document.getElementById(
    'paymentModal'
  ).style.display = 'none';

}

/* =========================================
   SELESAIKAN PESANAN
========================================= */

function finishOrder() {

  let paymentText = 'Cash';

  if (selectedPayment === 'qris') {
    paymentText = 'QRIS';
  }


  /* =========================================
     HITUNG TOTAL
  ========================================= */

  const subtotal = cart.reduce(
    (sum, item) => {
      return sum + (item.price * item.qty);
    },
    0
  );

  const grandTotal = subtotal + serviceFee;


  /* =========================================
     BUAT PESAN WHATSAPP
  ========================================= */

  let pesan = 'Halo, saya ingin memesan:%0A%0A';

  cart.forEach((item) => {

    pesan +=
      '• ' +
      item.name +
      ' x' +
      item.qty +
      ' - Rp ' +
      (item.price * item.qty).toLocaleString('id-ID') +
      '%0A';

  });

  pesan +=
    '%0ASubtotal: Rp ' +
    subtotal.toLocaleString('id-ID');

  pesan +=
    '%0ABiaya layanan: Rp ' +
    serviceFee.toLocaleString('id-ID');

  pesan +=
    '%0ATotal: Rp ' +
    grandTotal.toLocaleString('id-ID');

  pesan +=
    '%0AMetode pembayaran: ' +
    paymentText;


  /* =========================================
     NOMOR WHATSAPP
  ========================================= */

  const nomorWA = '628XXXXXXXXXX';


  /* =========================================
     DIRECTION KE WHATSAPP
  ========================================= */

  window.location.href =
    'https://wa.me/' +
    nomorWA +
    '?text=' +
    pesan;


  /* =========================================
     KOSONGKAN KERANJANG
  ========================================= */

  cart = [];

  updateCartUI();

  closePaymentModal();

}
