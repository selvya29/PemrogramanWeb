<?php
/*
NIM     : 210511139
NAMA    : SELVYA MULYANINGTYAS
KELAS   : D
*/

echo "<h3>Menghitung Lingkaran</h3>"; //judul

//variabel
$phi = 3.14;
$jarijari = 100;

//rumus
$luas = $phi * $jarijari * $jarijari;
$keliling = (2 * $phi * $jarijari);

//output
echo "Jari-jari = " . $jarijari;
echo "<br/>";
echo "phi = " . $phi;
echo "<br/>";
echo "Luas = " . $luas;
echo "<br/>";
echo "Keliling = " . $keliling;
?>