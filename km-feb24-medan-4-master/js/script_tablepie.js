// Memuat data JSON
var xmlhttp = new XMLHttpRequest();
var url = "js/data.json"; // Nama file JSON

xmlhttp.open("GET", url, true);
xmlhttp.send();

// Callback saat data berhasil dimuat
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    displayDataInTable(data); // Memanggil fungsi untuk menampilkan data dalam tabel HTML
  }
};

function displayDataInTable(data) {
  // Mengumpulkan total penjualan per kategori, wilayah, dan mesin
  var categorySales = {};
  var regionSales = {};
  var machineSales = {};

  data.forEach(function (item) {
    var category = item.category;
    var region = item.location;
    var machine = item.machine;
    var total = parseFloat(item.trans_total);

    // Penjualan per kategori
    if (!categorySales[category]) {
      categorySales[category] = 0;
    }
    categorySales[category] += total;

    // Penjualan per wilayah
    if (!regionSales[region]) {
      regionSales[region] = 0;
    }
    regionSales[region] += total;

    // Penjualan per mesin
    if (!machineSales[machine]) {
      machineSales[machine] = 0;
    }
    machineSales[machine] += total;
  });

  // Mengubah data penjualan ke format yang bisa digunakan dalam tabel
  var totalSales = 0;

  // Menghitung total penjualan per kategori
  Object.values(categorySales).forEach(function (sales) {
    totalSales += sales;
  });

  // Menampilkan data per kategori
  displaySalesData(categorySales, totalSales, "Category");

  // Menampilkan data per wilayah
  displaySalesData(regionSales, totalSales, "Region");

  // Menampilkan data per mesin
  displaySalesData(machineSales, totalSales, "Machine");
}

// Fungsi untuk menampilkan data penjualan dalam tabel
function displaySalesData(salesData, totalSales, columnName) {
  var table = document.getElementById(columnName.toLowerCase() + "Table");
  var tbody = table.getElementsByTagName('tbody')[0];

  // Membersihkan isi tabel sebelum menambahkan data baru
  tbody.innerHTML = "";

  // Membuat array untuk menyimpan baris tabel
  var rows = [];

  // Menambahkan data ke dalam array rows
  Object.keys(salesData).forEach(function (label) {
    var sales = salesData[label];
    var percentage = (sales / totalSales) * 100;

    // Menyimpan baris sebagai objek dengan label, penjualan, dan persentase
    rows.push({ label: label, sales: sales, percentage: percentage });
  });

  // Mengurutkan array berdasarkan persentase dari terbesar ke terkecil
  rows.sort(function (a, b) {
    return b.percentage - a.percentage;
  });

  // Menambahkan data yang sudah diurutkan ke dalam tabel
  rows.forEach(function (row) {
    var newRow = tbody.insertRow();
    var cellLabel = newRow.insertCell();
    cellLabel.textContent = row.label;
    var cellSales = newRow.insertCell();
    cellSales.textContent = row.sales;
    var cellPercentage = newRow.insertCell();
    cellPercentage.textContent = row.percentage.toFixed(2) + "%";
  });
}
