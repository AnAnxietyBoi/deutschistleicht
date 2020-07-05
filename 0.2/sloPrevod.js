var sloPrevod = ["peči (pecivo)", "ukazati", "začeti", "ugrizniti / gristi", "zaviti / upogniti", "nuditi", "vezati", "prositi", "ostati", "peči (meso)", "zlomiti", "goreti", "prinesti", "misliti", "siliti / prodirati", "smeti", "priporočati", "jesti", "voziti / peljati se", "pasti", "loviti / ujeti", "najti", "leteti", "bežati", "teči (voda)", "žreti", "zmrzniti / zebsti", "roditi", "dati", "uspevati (rastlina)", "iti", "uspevati / posrečiti se", "veljati", "uživati (hrana in drugo)", "zgoditi se", "zmagati / dobiti", "liti / zalivati", "biti enak / primerjati", "drseti /spodrsniti", "kopati", "prijeti / zgrabiti", "imeti", "držati / ustaviti", "viseti", "dvigniti", "imenovati se", "pomagati", "poznati", "zveneti", "priti", "moči / znati", "plaziti se", "vabiti / polniti", "pustiti", "teči", "trpeti", "posoditi", "brati", "ležati", "lagati", "izogibati se", "marati", "morati", "vzeti", "imenovati", "žvižgati", "izvirati", "svetovati", "ribati / drgniti", "trgati", "jezditi / jahati", "teči / dirjati", "dišati / vohati", "klicati", "ustaviti", "ločiti", "sijati / zdeti se", "potiskati / porivati", "streljati", "spati", "tepsti / udariti", "plaziti se", "brusiti", "zapreti / zakleniti", "rezati", "prestrašiti", "pisati", "kričati", "korakati", "molčati", "plavati", "izginiti", "priseči", "gledati / videti", "biti", "poslati", "peti", "potopiti se", "sedeti", "naj bi", "cepiti (drva)", "govoriti", "skočiti", "pičiti / zbosti", "stati", "krasti", "vzpenjati se / naraščati", "umreti", "smrdeti", "suniti / suvati", "prepirati se", "nositi", "srečati / zadeti", "poganjati / gnati", "stopiti / brcniti", "piti", "varati / prevarati", "delati / početi / storiti", "pokvariti", "pozabiti", "izgubiti", "oprostiti", "rasti", "umivati / prati", "kazati", "obrniti", "snubiti", "postati", "vreči / metati", "tehtati", "vedeti", "hoteti", "vleči / seliti se", "siliti /prisiliti"]; //array za use slo prevode nem glagolov

var Infinitiv = ["backen", "befehlen", "beginnen", "beißen", "biegen", "bieten", "binden", "bitten", "bleiben", "braten", "brechen", "brennen", "bringen", "denken", "dringen", "dürfen", "empfehlen", "essen", "fahren", "fallen", "fangen", "finden", "fliegen", "fliehen", "fließen", "fressen", "frieren", "gebären", "geben", "gedeihen", "gehen", "gelingen", "gelten", "genießen", "geschehen", "gewinnen", "gießen", "gleichen", "gleiten", "graben", "greifen", "haben", "halten", "hängen", "heben", "heißen", "helfen", "kennen", "klingen", "kommen", "können", "kriechen", "laden", "lassen", "laufen", "leiden", "leihen", "lesen", "liegen", "lügen", "meiden", "mögen", "müssen", "nehmen", "nennen", "pfeifen", "quellen", "raten", "reiben", "reißen", "reiten", "rennen", "riechen", "rufen", "schaffen", "scheiden", "scheinen", "schieben", "schießen", "schlafen", "schlagen", "schleichen", "schleifen", "schließen", "schneiden", "(er)schrecken", "schreiben", "schreien", "schreiten", "schweigen", "schwimmen", "schwinden", "schwören", "sehen", "sein", "senden", "singen", "sinken", "sitzen", "sollen", "spalten", "sprechen", "springen", "stechen", "stehen", "stehlen", "steigen", "sterben", "stinken", "stoßen", "streiten", "tragen", "treffen", "treiben", "treten", "trinken", "trügen", "tun", "verderben", "vergessen", "verlieren", "verzeihen", "wachsen", "waschen", "weisen", "wenden", "werben", "werden", "werfen", "wiegen", "wissen", "wollen", "ziehen", "zwingen"]; //array za use nem glagole

var odgovor = document.getElementById("infinitiv");
var i, j, k, l; //spremenljivke kot mesto arraya
var s = 0; //spremenljivka za switch
var procent; //spremenljivke za računanje procentov
var pravilni = 0;
var steviloGlagolov = 0;
var c; //spremenljivka za nem črke

odgovor.addEventListener("keyup", function(event) { //preveri za pritisk tipke
    //event.preventDefault();
    if (event.keyCode === 13) { //preveri če je pritisnjena tipka enter
        document.getElementById("gumb").click(); //klikne na gumb preveri
    }
});

function nemCrke(c)
{
	var nemCrka = ["ä", "ö", "ü", "ß"] //array za vse črke
	var input = document.getElementById("infinitiv").value //dobi kar je že napisano in
    document.getElementById("infinitiv").value = input + nemCrka[c] //dodaj ustrezno črko
    document.getElementById("infinitiv").focus() //fokusira se na vpisno okno
}

function nakljucniGlagol() //funkcija ki izbere nakljucni glagol
{
	i = Math.floor(Math.random() * sloPrevod.length);
	document.getElementById("sloPrevod").innerHTML = sloPrevod[i]; //nakljucen glagol se izpise
}

function procentiPravilnih() //za izračun procentov pravilnih glagolov
{
	procent = (pravilni / steviloGlagolov) * 100
    procent = parseInt(procent.toString()) //pretvori se v intiger in string
    document.getElementById("procenti").innerHTML = "Delež pravilnih glagolov: " + pravilni + " od " + steviloGlagolov + " oziroma " + procent + "%"; //vse se izpiše
}


function preveri()
{
	switch(s){
		case 0:
			document.getElementById("gumb").innerHTML = "Nadaljuj"; //sprmeni gumb v Nadaljuj
			odgovor = document.getElementById("infinitiv").value.toLowerCase(); //dobi odgovor uporabnika
			k = Infinitiv.indexOf(odgovor) - 1 //preveri ce se odgovor ujema z kaksnim izmed nem glagolov
            steviloGlagolov++
			
			if (k != -2 || k == i) //če je odgovor pravilen se zpise pravilno oz narobe
			{
				document.getElementById("pravilnost").innerHTML = "PRAVILNO!";
                pravilni++ //za izračun procetov
			}
			
			else
			{
				document.getElementById("pravilnost").innerHTML = "NAROBE!";
			}
            procentiPravilnih()
			s = 1;
			break;
		
		case 1:
			document.getElementById("gumb").innerHTML = "Preveri"; //spremeni gumb v Preveri
			document.getElementById("pravilnost").innerHTML = ""; //izbriše se pravilnost
            document.getElementById("infinitiv").value = ""; //izbrise kar je bilo prej napisano
			nakljucniGlagol(); //izbere naslednji naključni glagol
            document.getElementById("infinitiv").focus() //fokusira se na vpisno okno
			s = 0;
			break;
	}

}
