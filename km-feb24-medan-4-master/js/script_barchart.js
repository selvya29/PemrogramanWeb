// Memuat data JSON
var xmlhttp = new XMLHttpRequest();
var url = "js/data.json"; // Nama file JSON

xmlhttp.open("GET", url, true);
xmlhttp.send();

// Callback saat data berhasil dimuat
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data);

    // Mengumpulkan total sales per produk
    var productSales = {};
    data.forEach(function (item) {
      var product = item.product;
      var total = parseFloat(item.trans_total);

      if (!productSales[product]) {
        productSales[product] = 0;
      }
      productSales[product] += total;
    });

    // Mengurutkan produk berdasarkan total sales dan mengambil 10 produk teratas
    var sortedProducts = Object.keys(productSales)
      .sort((a, b) => productSales[b] - productSales[a])
      .slice(0, 10);
    var sortedSales = sortedProducts.map((product) => productSales[product]);

    const ctxBar = document.getElementById("barChart").getContext("2d");
    var barChart = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: sortedProducts,
        datasets: [
          {
            label: "Total Sales",
            data: sortedSales,
            backgroundColor: ["#A05AFF"],
            borderColor: "#111111",
            borderWidth: 1,
            borderRadius: 5, // Mengatur border radius pada batang
          },
        ],
      },
      options: {
        indexAxis: "y", // Mengubah bar chart menjadi horizontal
        responsive: true,
        maintainAspectRatio: false, // Memungkinkan kita mengatur tinggi chart dengan CSS
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#111111", // Mengubah warna font label sumbu y menjadi hitam
            },
          },
          x: {
            ticks: {
              color: "#111111", // Mengubah warna font label sumbu x menjadi hitam
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#111111", // Mengubah warna font label legenda menjadi hitam
            },
          },
          tooltip: {
            backgroundColor: "#333", // Mengubah warna background tooltip
            titleColor: "#fff", // Mengubah warna font title tooltip
            bodyColor: "#fff", // Mengubah warna font body tooltip
          },
        },
      },
    });

    // Fungsi untuk mengurutkan ulang chart
    function updateChart(order) {
      sortedProducts = Object.keys(productSales)
        .sort((a, b) =>
          order === "asc"
            ? productSales[a] - productSales[b]
            : productSales[b] - productSales[a]
        )
        .slice(0, 10);
      sortedSales = sortedProducts.map((product) => productSales[product]);
      barChart.data.labels = sortedProducts;
      barChart.data.datasets[0].data = sortedSales;
      barChart.update();
    }

    // Event listener untuk tombol sort
    document
      .getElementById("sortUpButton")
      .addEventListener("click", function () {
        updateChart("asc");
      });

    document
      .getElementById("sortDownButton")
      .addEventListener("click", function () {
        updateChart("desc");
      });
  }
};
