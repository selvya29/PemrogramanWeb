<?php
/*
NIM     : 210511139
NAMA    : SELVYA MULYANINGTYAS
KELAS   : D
*/

echo "<h3>Menghitung Jajar Genjang</h3>"; //judul

//variabel
$alas = 20;
$sisi2 = 5;
$sisi3 = 15;
$sisi4 = 10;
$tinggi = 5;

//rumus
$luas = $alas * $tinggi;
$keliling = ($alas + $sisi2 + $sisi3 + $sisi4);

//output
echo "Alas = " . $alas;
echo "<br/>";
echo "Sisi 2 = " . $sisi2;
echo "<br/>";
echo "Sisi 3 = " . $sisi3;
echo "<br/>";
echo "Sisi 4 = " . $sisi4;
echo "<br/>";
echo "Tinggi = " . $tinggi;
echo "<br/>";
echo "Luas = " . $luas;
echo "<br/>";
echo "Keliling = " . $keliling;
?>