var xmlhttpPreview = new XMLHttpRequest();
var url = 'js/data.json';
xmlhttpPreview.open('GET', url, true);
xmlhttpPreview.send();
xmlhttpPreview.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);

    // Mengumpulkan total sales per produk dengan line_total
    var productSales = {};
    var totalSales = 0;
    data.forEach(function (item) {
      var product = item.product;
      var lineTotal = parseFloat(item.line_total);
      if (!productSales[product]) {
        productSales[product] = 0;
      }
      productSales[product] += lineTotal;
      totalSales += lineTotal; // Menjumlahkan line_total ke totalSales
    });

    // Membulatkan angka desimal ke atas
    totalSales = Math.ceil(totalSales);

    // Mengonversi total sales ke format dolar dengan pemisah ribuan
    var formattedTotalSales = totalSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Memformat angka dengan pemisah ribuan
    formattedTotalSales = '$' + formattedTotalSales; // Menambahkan simbol dolar

    // Menampilkan total sales di HTML
    var element = document.getElementById('totalSales');
    element.innerHTML = formattedTotalSales;
  }
};
/*--------TOTAL TRANSACTIONS CARD--------*/

var xmlhttpPreview = new XMLHttpRequest();
var url = 'js/data.json';

xmlhttpPreview.open('GET', url, true);
xmlhttpPreview.send();

xmlhttpPreview.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
    
    var totaltransaction = data.map(function (transaction) {
    return transaction.line_total
    })
    
    var totalTransactions = totaltransaction.length;

    var element = document.getElementById('totalTransactions');
    element.innerHTML = totalTransactions
  	}
};

/*--------TOTAL PRODUCT CARD--------*/

var xmlhttpPreview = new XMLHttpRequest();
var url = 'js/data.json';

xmlhttpPreview.open('GET', url, true);
xmlhttpPreview.send();


xmlhttpPreview.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
    
    // untuk mengambil product nya saja
	var products = data.map(function (item) {
    return item.product
    })

    // untuk mengambil total product nya
    var totalProduct = new Set(products).size;

    // untuk memasukan ke HTML
    var element = document.getElementById('totalProduct');
    element.innerHTML = totalProduct
	}
};
