// Urutan bulan dalam angka (0-11)
const monthOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// Fungsi untuk mendapatkan nama bulan dari indeks
function getMonthName(monthIndex) {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return monthNames[monthIndex];
}

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

    // Mengumpulkan data penjualan per kategori setiap bulan
    var categorySales = {};
    var regionSales = {};
    data.forEach(function (item) {
      var category = item.category;
      var region = item.location;
      var date = new Date(item.transaction_date);
      var monthIndex = date.getMonth(); // Menggunakan indeks bulan (0-11)
      var month = getMonthName(monthIndex); // Mendapatkan nama bulan dari indeks
      var total = parseFloat(item.trans_total);

      // Mengumpulkan data penjualan per kategori
      if (!categorySales[month]) {
        categorySales[month] = {};
      }
      if (!categorySales[month][category]) {
        categorySales[month][category] = 0;
      }
      categorySales[month][category] += total;

      // Mengumpulkan data penjualan per wilayah
      if (!regionSales[month]) {
        regionSales[month] = {};
      }
      if (!regionSales[month][region]) {
        regionSales[month][region] = 0;
      }
      regionSales[month][region] += total;
    });

    // Mengurutkan bulan sesuai dengan urutan bulan yang sudah ditentukan
    var months = monthOrder.map(monthIndex => getMonthName(monthIndex));

    var categoryLabels = [...new Set(data.map((item) => item.category))];
    var regionLabels = [...new Set(data.map((item) => item.location))];

    var categoryColors = ["#9FCC2E", "#AB47BC", "#FA9F10", "#03A9F4"];
    var regionColors = ["#9FCC2E", "#AB47BC", "#FA9F10", "#03A9F4"];

    // Mengubah data penjualan kategori ke format yang bisa digunakan oleh Chart.js
    var categoryDatasets = categoryLabels.map((label, index) => ({
      label: label,
      data: months.map((month) => categorySales[month][label] || 0),
      fill: false,
      borderColor: categoryColors[index % categoryColors.length],
      tension: 0.4, // Menambahkan kelengkungan pada garis
    }));

    // Mengubah data penjualan region ke format yang bisa digunakan oleh Chart.js
    var regionDatasets = regionLabels.map((label, index) => ({
      label: label,
      data: months.map((month) => regionSales[month][label] || 0),
      fill: false,
      borderColor: regionColors[index % regionColors.length],
      tension: 0.4, // Menambahkan kelengkungan pada garis
    }));

    var ctxCategoryLine = document
      .getElementById("categoryLineChart")
      .getContext("2d");
    var ctxRegionLine = document
      .getElementById("regionLineChart")
      .getContext("2d");

    // Membuat chart penjualan per kategori
    var categoryChart = new Chart(ctxCategoryLine, {
      type: "line",
      data: {
        labels: months,
        datasets: categoryDatasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#111111", // Ubah warna label legend menjadi putih
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Month",
              color: "#111111", // Ubah warna title sumbu x menjadi hitam
            },
            ticks: {
              color: "#111111", // Ubah warna ticks sumbu x menjadi hitam
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Sales Total",
              color: "#111111", // Ubah warna title sumbu y menjadi hitam
            },
            ticks: {
              color: "#111111", // Ubah warna ticks sumbu y menjadi hitam
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Membuat chart penjualan per wilayah
    var regionChart = new Chart(ctxRegionLine, {
      type: "line",
      data: {
        labels: months,
        datasets: regionDatasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#111111", // Ubah warna label legend menjadi hitam
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Month",
              color: "#111111", // Ubah warna title sumbu x menjadi hitam
            },
            ticks: {
              color: "#111111", // Ubah warna ticks sumbu x menjadi hitam
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Sales Total",
              color: "#111111", // Ubah warna title sumbu y menjadi hitam
            },
            ticks: {
              color: "#111111", // Ubah warna ticks sumbu y menjadi hitam
            },
            beginAtZero: true,
          },
        },
      },
    });

    window.updateCharts = function () {
      var startMonth = document.getElementById("startMonth").value;
      var endMonth = document.getElementById("endMonth").value;

      var startIndex = monthOrder.indexOf(monthOrder.findIndex(monthIndex => getMonthName(monthIndex) === startMonth));
      var endIndex = monthOrder.indexOf(monthOrder.findIndex(monthIndex => getMonthName(monthIndex) === endMonth));

      if (startIndex > endIndex) {
        alert("End month should be after start month");
        return;
      }

      var selectedMonthIndices = monthOrder.slice(startIndex, endIndex + 1);
      var selectedMonths = selectedMonthIndices.map(monthIndex => getMonthName(monthIndex));

      categoryChart.data.labels = selectedMonths;
      categoryChart.data.datasets.forEach(function (dataset) {
        dataset.data = selectedMonths.map(month => categorySales[month][dataset.label] || 0);
      });
      
      regionChart.data.labels = selectedMonths;
      regionChart.data.datasets.forEach(function (dataset) {
      dataset.data = selectedMonths.map(month => regionSales[month][dataset.label] || 0);
      });
      
      categoryChart.update();
      regionChart.update();
    }
  }
}