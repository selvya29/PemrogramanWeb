/*--------SIDEBAR--------*/
let sidebarOpen = false;
const sidebar = document.getElementById("sidebar");

// Fungsi untuk membuka sidebar
function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

// Fungsi untuk menutup sidebar
function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

/*--------DATA TABLE--------*/

$(document).ready(function () {
  $("#example").DataTable({
    ajax: {
      url: "js/data.json", 
      dataSrc: "",
    }, 
    columns: [
      { data: "location" },
      { data: "machine" },
      { data: "product" },
      { data: "category" },
      { data: "transaction_date" },
      { data: "line_total" },
    ],
  });
});
