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

    // Mengumpulkan total penjualan per kategori
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

    // Mengubah data penjualan ke format yang bisa digunakan oleh Chart.js
    var categoryLabels = Object.keys(categorySales);
    var categoryValues = Object.values(categorySales);
    var regionLabels = Object.keys(regionSales);
    var regionValues = Object.values(regionSales);
    var machineLabels = Object.keys(machineSales);
    var machineValues = Object.values(machineSales);

    // Menghitung total penjualan untuk menghitung persentase
    var totalSales = categoryValues.reduce((a, b) => a + b, 0);

    // Membuat pie chart untuk persentase penjualan per kategori
    const ctxCategoryPie = document
      .getElementById("categoryPieChart")
      .getContext("2d");
    // Update Chart.js options to include tooltips and filtering
    new Chart(ctxCategoryPie, {
      type: "pie",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            data: categoryValues,
            backgroundColor: [
              "#9FCC2E",
              "#AB47BC",
              "#FA9F10",
              "#03A9F4",
              "#800080",
            ],
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let percentage = ((value / totalSales) * 100).toFixed(2) + "%";
              return percentage;
            },
            color: "#111111",
            display: "auto",
          },
          legend: {
            labels: {
              color: "#111111", // Mengubah warna font label menjadi hitam
            },
          },
          title: {
            display: true,
            text: "Sales by Category",
            color: "#111111", // Mengubah warna font judul menjadi hitam
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (tooltipItem) {
                return (
                  tooltipItem.label +
                  ": " +
                  tooltipItem.raw +
                  " (" +
                  ((tooltipItem.raw / totalSales) * 100).toFixed(2) +
                  "%)"
                );
              },
            },
          },
          filtering: {
            enabled: true,
            mode: "index",
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    // Menghitung total penjualan untuk wilayah
    totalSales = regionValues.reduce((a, b) => a + b, 0);

    // Membuat pie chart untuk persentase penjualan per wilayah
    const ctxRegionPie = document
      .getElementById("regionPieChart")
      .getContext("2d");
    new Chart(ctxRegionPie, {
      type: "pie",
      data: {
        labels: regionLabels,
        datasets: [
          {
            data: regionValues,
            backgroundColor: [
              "#9FCC2E",
              "#AB47BC",
              "#FA9F10",
              "#03A9F4",
              "#800080",
            ],
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let percentage = ((value / totalSales) * 100).toFixed(2) + "%";
              return percentage;
            },
            color: "#fff",
            display: "auto",
          },
          legend: {
            labels: {
              color: "#111111", // Mengubah warna font label menjadi hitam
            },
          },
          title: {
            display: true,
            text: "Sales by Region",
            color: "#111111", // Mengubah warna font judul menjadi hitam
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (tooltipItem) {
                return (
                  tooltipItem.label +
                  ": " +
                  tooltipItem.raw +
                  " (" +
                  ((tooltipItem.raw / totalSales) * 100).toFixed(2) +
                  "%)"
                );
              },
            },
          },
          filtering: {
            enabled: true,
            mode: "index",
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    // Menghitung total penjualan untuk mesin
    totalSales = machineValues.reduce((a, b) => a + b, 0);

    // Membuat pie chart untuk persentase penjualan per mesin
    const ctxMachinePie = document
      .getElementById("machinePieChart")
      .getContext("2d");
    new Chart(ctxMachinePie, {
      type: "pie",
      data: {
        labels: machineLabels,
        datasets: [
          {
            data: machineValues,
            backgroundColor: [
              "#9FCC2E",
              "#AB47BC",
              "#FA9F10",
              "#03A9F4",
              "#800080",
            ],
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let percentage = ((value / totalSales) * 100).toFixed(2) + "%";
              return percentage;
            },
            color: "#fff",
            display: "auto",
          },
          legend: {
            labels: {
              color: "#111111", // Mengubah warna font label menjadi hitam
            },
          },
          title: {
            display: true,
            text: "Sales by Machine",
            color: "#111111", // Mengubah warna font judul menjadi hitam
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (tooltipItem) {
                return (
                  tooltipItem.label +
                  ": " +
                  tooltipItem.raw +
                  " (" +
                  ((tooltipItem.raw / totalSales) * 100).toFixed(2) +
                  "%)"
                );
              },
            },
          },
          filtering: {
            enabled: true,
            mode: "index",
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  }
};
