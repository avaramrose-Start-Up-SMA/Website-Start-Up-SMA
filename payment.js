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


  alert(
    'Pesanan berhasil dibuat!\n\n' +
    'Metode pembayaran: ' +
    paymentText
  );


  // Kosongkan keranjang
  cart = [];


  // Update tampilan
  updateCartUI();


  // Tutup modal
  closePaymentModal();

}