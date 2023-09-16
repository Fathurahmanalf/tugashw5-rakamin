// Variabel global untuk menyimpan data pendaftar
const pendaftar = [];

// Fungsi untuk membuka tab
function openTab(tabName, elmnt) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    // Tambahkan event listener untuk form registrasi
    const formRegistrasi = document.getElementById("formRegistrasi");
    formRegistrasi.addEventListener("submit", function (e) {
        e.preventDefault();

        const namaInput = document.getElementById("nama");
        const umurInput = document.getElementById("umur");
        const uangSanguInput = document.getElementById("uangSangu");

        const nama = namaInput.value.trim();
        const umur = parseInt(umurInput.value);
        const uangSangu = parseInt(uangSanguInput.value);

        // Validasi input
        if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
            alert("Mohon isi formulir dengan benar!");
            return;
        }

        // Tambahkan pendaftar ke dalam array
        pendaftar.push({ nama, umur, uangSangu });

        // Reset form
        namaInput.value = "";
        umurInput.value = "";
        uangSanguInput.value = "";

        // Tampilkan pendaftar pada tabel list
        tampilkanPendaftar();
    });
});

function tampilkanPendaftar() {
    const tabelPendaftar = document.getElementById("tabelPendaftar");
    const resumePendaftar = document.getElementById("resumePendaftar");

    // Hapus semua baris dalam tabel kecuali header
    while (tabelPendaftar.rows.length > 1) {
        tabelPendaftar.deleteRow(1);
    }

    // Tampilkan data pendaftar dalam tabel
    pendaftar.forEach((pendaftar, index) => {
        const row = tabelPendaftar.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = pendaftar.nama;
        row.insertCell(2).textContent = pendaftar.umur;
        row.insertCell(3).textContent = pendaftar.uangSangu;
    });

    // Hitung rata-rata umur dan uang saku
    const totalUmur = pendaftar.reduce((total, pendaftar) => total + pendaftar.umur, 0);
    const totalUangSangu = pendaftar.reduce((total, pendaftar) => total + pendaftar.uangSangu, 0);
    const rataRataUmur = pendaftar.length > 0 ? totalUmur / pendaftar.length : 0;
    const rataRataUangSangu = pendaftar.length > 0 ? totalUangSangu / pendaftar.length : 0;

    // Tampilkan resume rata-rata pada tabel
    const resume = `Rata-rata pendaftar memiliki uang saku sebesar ${rataRataUangSangu.toFixed(2)} dengan rata-rata umur ${rataRataUmur.toFixed(2)}`;
    resumePendaftar.textContent = resume;
}

// Tampilkan tab Registrasi secara default
openTab("Registrasi");
