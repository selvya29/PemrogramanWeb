<?php
/*
NIM     : 210511139
NAMA    : SELVYA MULYANINGTYAS
KELAS   : D
*/

echo "<h3>Menghitung Belah Ketupat</h3>"; //judul

//variabel
$d1 = 9;
$d2 = 8;
//keliling
$a = 7;
$b = 7;
$c = 8;
$d = 4;
//rumus 
$luas = 1/2 * $d1 * $d2;
$keliling = $a + $b + $c + $d;

//hasil ouput
echo "Diagonal 1 ". $d1;
echo "<br/>";
echo "Diagonal 2 ". $d2; 
echo "<br/>";
echo "<br/>";
echo "Luas Belah Ketupat ". $luas;
echo "<br/>";
echo "Keliling Belah Ketupat ". $keliling;

?>