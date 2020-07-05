var sloPrevod = ["peči (pecivo)", "ukazati", "začeti", "ugrizniti / gristi", "zaviti / upogniti", "nuditi", "vezati", "prositi", "ostati", "peči (meso)", "zlomiti", "goreti", "prinesti", "misliti", "siliti / prodirati", "smeti", "priporočati", "jesti", "voziti / peljati se", "pasti", "loviti / ujeti", "najti", "leteti", "bežati", "teči (voda)", "žreti", "zmrzniti / zebsti", "roditi", "dati", "uspevati (rastlina)", "iti", "uspevati / posrečiti se", "veljati", "uživati (hrana in drugo)", "zgoditi se", "zmagati / dobiti", "liti / zalivati", "biti enak / primerjati", "drseti /spodrsniti", "kopati", "prijeti / zgrabiti", "imeti", "držati / ustaviti", "viseti", "dvigniti", "imenovati se", "pomagati", "poznati", "zveneti", "priti", "moči / znati", "plaziti se", "vabiti / polniti", "pustiti", "teči", "trpeti", "posoditi", "brati", "ležati", "lagati", "izogibati se", "marati", "morati", "vzeti", "imenovati", "žvižgati", "izvirati", "svetovati", "ribati / drgniti", "trgati", "jezditi / jahati", "teči / dirjati", "dišati / vohati", "klicati", "ustaviti", "ločiti", "sijati / zdeti se", "potiskati / porivati", "streljati", "spati", "tepsti / udariti", "plaziti se", "brusiti", "zapreti / zakleniti", "rezati", "prestrašiti", "pisati", "kričati", "korakati", "molčati", "plavati", "izginiti", "priseči", "gledati / videti", "biti", "poslati", "peti", "potopiti se", "sedeti", "naj bi", "cepiti (drva)", "govoriti", "skočiti", "pičiti / zbosti", "stati", "krasti", "vzpenjati se / naraščati", "umreti", "smrdeti", "suniti / suvati", "prepirati se", "nositi", "srečati / zadeti", "poganjati / gnati", "stopiti / brcniti", "piti", "varati / prevarati", "delati / početi / storiti", "pokvariti", "pozabiti", "izgubiti", "oprostiti", "rasti", "umivati / prati", "kazati", "obrniti", "snubiti", "postati", "vreči / metati", "tehtati", "vedeti", "hoteti", "vleči / seliti se", "siliti /prisiliti"]; //array za use slo prevode nem glagolov
var Infinitiv = ["backen", "befehlen", "beginnen", "beißen", "biegen", "bieten", "binden", "bitten", "bleiben", "braten", "brechen", "brennen", "bringen", "denken", "dringen", "dürfen", "empfehlen", "essen", "fahren", "fallen", "fangen", "finden", "fliegen", "fliehen", "fließen", "fressen", "frieren", "gebären", "geben", "gedeihen", "gehen", "gelingen", "gelten", "genießen", "geschehen", "gewinnen", "gießen", "gleichen", "gleiten", "graben", "greifen", "haben", "halten", "hängen", "heben", "heißen", "helfen", "kennen", "klingen", "kommen", "können", "kriechen", "laden", "lassen", "laufen", "leiden", "leihen", "lesen", "liegen", "lügen", "meiden", "mögen", "müssen", "nehmen", "nennen", "pfeifen", "quellen", "raten", "reiben", "reißen", "reiten", "rennen", "riechen", "rufen", "schaffen", "scheiden", "scheinen", "schieben", "schießen", "schlafen", "schlagen", "schleichen", "schleifen", "schließen", "schneiden", "(er)schrecken", "schreiben", "schreien", "schreiten", "schweigen", "schwimmen", "schwinden", "schwören", "sehen", "sein", "senden", "singen", "sinken", "sitzen", "sollen", "spalten", "sprechen", "springen", "stechen", "stehen", "stehlen", "steigen", "sterben", "stinken", "stoßen", "streiten", "tragen", "treffen", "treiben", "treten", "trinken", "trügen", "tun", "verderben", "vergessen", "verlieren", "verzeihen", "wachsen", "waschen", "weisen", "wenden", "werben", "werden", "werfen", "wiegen", "wissen", "wollen", "ziehen", "zwingen"]; //array za use nem glagole
var odgovor;
var i, j, k, l; //spremenljivke kot mesto arraya
var s = 0; //spremenljivka za switch

function nakljucniGlagol() //funkcija ki izbere nakljucni glagol
{
	i = Math.floor(Math.random() * sloPrevod.length);
	document.getElementById("sloPrevod").innerHTML = sloPrevod[i]; //nakljucen glagol se izpise
}


function preveri()
{
	switch(s){
		case 0:
			document.getElementById("gumb").innerHTML = "Nadaljuj"; //sprmeni gumb v Nadaljuj
			odgovor = document.getElementById("preveri").value.toLowerCase(); //dobi odgovor uporabnika
			k = Infinitiv.indexOf(odgovor) - 1 //preveri ce se odgovor ujema z kaksnim izmed nem glagolov
			
			if (k != -2 || k == i) //če je odgovor pravilen se zpise pravilno oz narobe
			{
				document.getElementById("pravilnost").innerHTML = "PRAVILNO!";
			}
			
			else
			{
				document.getElementById("pravilnost").innerHTML = "NAROBE!";
			}
			s = 1;
			break;
		
		case 1:
			document.getElementById("gumb").innerHTML = "Preveri"; //spremeni gumb v Preveri
			document.getElementById("pravilnost").innerHTML = ""; //izbriše se pravilnost
			nakljucniGlagol(); //izbere naslednji naključni glagol
			s = 0;
			break;
	}

}