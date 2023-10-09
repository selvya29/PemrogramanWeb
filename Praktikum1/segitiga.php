<?php
/*
NIM     : 210511139
NAMA    : SELVYA MULYANINGTYAS
KELAS   : D
*/

echo "<h3>Menghitung Segitiga</h3>"; //judul

//variabel
$alas = 20;
$sisi2 = 5;
$sisi3 = 15;
$tinggi = 5;

//rumus
$luas = 1/2 * $alas * $tinggi;
$keliling = ($alas + $sisi2 + $sisi3);

//output
echo "Alas = " . $alas;
echo "<br/>";
echo "Sisi 2 = " . $sisi2;
echo "<br/>";
echo "Sisi 3 = " . $sisi3;
echo "<br/>";
echo "Tinggi = " . $tinggi;
echo "<br/>";
echo "Luas = " . $luas;
echo "<br/>";
echo "Keliling = " . $keliling;
?>