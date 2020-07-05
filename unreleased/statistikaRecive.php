<?php

/*function debug_to_console( $data ) {
    $output = $data;
    if ( is_array( $output ) )
        $output = implode( ',', $output);

    echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
}*/

//$posiljka = $_POST['ajax_data'];
//$posiljka = $_POST["x"];

//Make sure that it is a POST request.
/*if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
    throw new Exception('Request method must be POST!');
}*/

//Make sure that the content type of the POST request has been set to application/json
/*$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if(strcasecmp($contentType, 'application/json') != 0){
    throw new Exception('Content type must be: application/json');
}*/

$posiljka = json_decode(file_get_contents("php://input"), true); //dobi poslano
//$posiljka = var_dump(file_get_contents("php://input")); //dobi poslano

file_put_contents("test.txt", implode(" ", $posiljka));
//If json_decode failed, the JSON is invalid.
/*if(!is_array($decoded)){
    throw new Exception('Received content contained invalid JSON!');
}*/
//echo $posiljka;
//debug_to_console($posiljka);

$sich = 0; //če je sich ali navadni
if (count($posiljka[0]) == 2) //če je dolžina 2 potem je sich
{
    $sich = 1; //pomeni da je dobil sich glagole
    $posiljka[0] = array_merge(... $posiljka[0]); //iz [[0,0],[0,0]] nastane [0,0,0,0]
    $posiljka[1][0] = array_merge(... $posiljka[1][0]); //da se iz dvodimenzionalnega naredi enodimenzionalni
    $posiljka[1][1] = array_merge(... $posiljka[1][1]); //torej da so našteti napačni glagoli brez razlike med oblikami
}
else
{
    $posiljka[1] = array_merge(... $posiljka[1]); 
    $posiljka[1] = [$posiljka[1]]; //zato da je enako oglatih oklepajev pri sich in pri navadnih
}

//dobi staro statistiko
//include 'statistika.txt';

//način da prebere celo, vse skupaj spremeni in prepiše original
//$filename = "stGlagolov.txt";
$filename = "/var/www/stGlagolov.txt";  
$statistika = file($filename, FILE_IGNORE_NEW_LINES); //vsak glagol v svoji vrstici + prazna vrstica med skupinami glagolov
//$statistika = file_get_contents($filename);

for ($x = 0; $x <= count($posiljka[1]) - 1; $x++)
{
    for ($y = 0; $y <= count($posiljka[1][$x]) - 1; $y++) //perbere vsako število iz datoteke
    {
        //dobljeno število + če je sich:(št navadnih glagolov + št akk glagolov (če je dativ) + št praznih vrstic)
        //$statistika[$posiljka[1][$x][$y] + $sich * (133 + $x * 47 + $sich + $x)]++; //spremenjenemu v št doda 1
        $mesto = $posiljka[1][$x][$y] + $sich * (133 + $x * 47 + $sich + $x);
        $statistika[$mesto] = (int)$statistika[$mesto] + 1;
    }
}
file_put_contents($filename, implode("\n", $statistika)); //v datoteko zapiše spremenjeno
/*$fp = fopen($filename, "w+") or die("Couldn't create new file");  
fwrite($fp, implode(",", $statistika)); 
fclose($fp);*/

//način da bere vsko vrstico in jo spremeni
/*$datoteka = fopen("statistika.txt", "r+") or die("Unable to open file!"); //odpre

for ($x = 0; $x <= count($posiljka[1][$o]) - 1; $x++)
{
    for ($y = 0; $y <= count($posiljka[1][$o][$x]) - 1; $y++) //perbere vsako število
    {
        $line = 0;
        while (($buffer = fgets($file)) !== FALSE) //za vsako vrstico
        {
            if ($line == $posiljka[1][$o][$x][$y]) //če je prava vrstica
            {
                intval($buffer)++; //zamenja z 1 več št
                break;
            }   
            $line++;
        }
    }
}
fclose($datoteka); //zapre*/


//include 'stevilo.txt';

/*/////////////////////////////////////////////////////////////////////////
date_default_timezone_set("Europe/Ljubljana"); 
$cas = time("d.m.Y"); //dobi čas

$file = "graf.txt";
$file = escapeshellarg($file); // for the security

$zadnjaVrstica = `tail -n 1 $file`; //dobi zadnjo vrstico, ki izgleda tako datum:[0,0,0,0,0]:[0,0,0,0] ali pa je eden prazen
$zadnjaVrstica = explode(":", $zadnjaVrstica); //razdeli na datum in podatke

if ($zadnjaVrstica[0] == $cas) //če je zadnji datum enak današnjemu in je sich ali navadni
{
    if ($zadnjaVrstica[$sich + 1] == "[]") //če je array v katerega hočemo prišteti prazen prazen
    {
        $zadnjaVrstica[$sich + 1] = $posiljka[0];
    }
    else //drugače prištejemo starim vrednostim
    {
        $zadnjaVrstica[$sich + 1] = str_replace('[', '', $zadnjaVrstica[$sich + 1]); //odstrani []
        $zadnjaVrstica[$sich + 1] = str_replace(']', '', $zadnjaVrstica[$sich + 1]);
        $zadnjaVrstica[$sich + 1] = explode(",", $zadnjaVrstica[0]); //nastane array s številkami

        for ($u = 0; $u <= count($posiljka[0]) - 1; $u++)
        {
            $zadnjaVrstica[$sich + 1][$u] += $posiljka[0][$u]; //doda kar je
        }    
    }

    //izbriše zadnjo vrstico
    $lines = file('stevilo.txt'); 
    $last = sizeof($lines) - 1; 
    unset($lines[$last]); 
    $fp = fopen('stevilo.txt', 'w'); 
    fwrite($fp, implode('', $lines)); 
    fclose($fp);

    $txt = $cas . ":" . $zadnjaVrstica[1] . ":" . $zadnjaVrstica[2]; //združi stringe skupaj
}

else //če je prvi paket v dnevu
{
    if (!$sich)
    {
        $txt = $cas . ":" . $posiljka[0] . ":[]";
    }
    else
    {
        $txt = $cas . ":[]:" . $posiljka[0];
    }
}

echo $txt;
file_put_contents('stevilo.txt', $txt.PHP_EOL , FILE_APPEND | LOCK_EX); //doda novo vrstico v datoteko

/*$datoteka = fopen("stevilo.txt", "w") or die("Unable to open file!"); //odpre
fwrite($datoteka, implode(",", $stevilo)); //zapiše string v datoteko
fclose($datoteka); //zapre*/

?>