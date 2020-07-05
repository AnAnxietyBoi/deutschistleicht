vsiGlagoli = //00-AKKUSATIV slo prevod, 01-AKKUSATIV nem, 10-DATIV slo prevod, 11-DATIV nem, 20-vsi slo prevod, 21-vsi nem
[
[
[["umivati se"], ["česati se"], ["obleči se"], ["sleči se"], ["skriti se"], ["srečati se"], ["usesti se"], ["uleči se"], ["odločiti se"], ["obnašati se"], ["pritožiti se"], ["jeziti se"], ["prijaviti se"], ["posloviti se"], ["spomniti se"], ["povečati se"], ["pomanjšati se"], ["potrpeti"], ["motiti se"], ["zabavati se / pogovarjati se", "zabavati se", "pogovarjati se"], ["zabavati se"], ["prestrašiti se / bati se", "prestrašiti se", "bati se"], ["navaditi se"], ["razburjati se"], ["omejiti se"], ["pripeti se / privezati se", "pripeti se", "privezati se"], ["pretepati se"], ["izgubiti se (peš)", "izgubiti se"], ["izgubiti se (v avtu)", "izgubiti se"], ["izgubiti se (v gorah)", "izgubiti se"], ["počutiti se"], ["pripraviti se"], ["čuditi se"], ["podvizati se"], ["zaljubiti se"], ["zaročiti se"], ["pozdraviti se (z nekom)", "pozdraviti se"], ["opravičiti se"], ["srečati se"], ["sramovati se"], ["zanesti se"], ["hrepeneti"], ["zahvaliti se"], ["nahajati se"], ["zediniti se"], ["poškodovati se"], ["okrevati / spočiti se", "okrevati", "spočiti se"]],

[["waschen"], ["kämmen"], ["anziehen"], ["ausziehen"], ["verstecken"], ["treffen"], ["setzen"], ["legen"], ["entscheiden / entschließen", " entscheiden", " entschließen"], ["benehmen / verhalten", "benehmen", "verhalten"], ["beklagen"], ["ärgern"], ["bewerben"], ["verabschieden"], ["erinnern"], ["vergrößern"], ["verkleinern"], ["gedulden"], ["irren"], ["unterhalten"], ["amüsieren"], ["fürchten"], ["gewöhnen"], ["aufregen"], ["einschränken"], ["anschnallen"], ["prügeln"], ["verlaufen"], ["verfahren"], ["versteigen"], ["fühlen"], ["vorbereiten"], ["wundern"], ["beeilen"], ["verlieben"], ["verloben"], ["begrüßen"], ["entschuldigen"], ["begegnen"], ["schämen"], ["verlassen"], ["sehnen"], ["bedanken"], ["befinden"], ["einigen"], ["verletzen"], ["erholen"]]
],

[
[["želeti si"], ["privoščiti si"], ["zapomniti si"], ["sposoditi si"], ["kupiti si"], ["misliti si"], ["delati si skrbi"], ["dovoliti si"], ["ogledati si"], ["truditi se"]],

[["wünschen"], ["leisten / gönnen", "leisten", "gönnen"], ["merken"], ["leihen"], ["kaufen"], ["denken"], ["Sorgen machen"], ["erlauben"], ["ansehen"], ["Mühe geben"]]
]
]

var i; //spremenljivka za nakjučni glagol
var s = 0; //spremenljivka za switch
var pravilni = [0, 0]; //spremenljivka za računanje procentov
var steviloGlagolov = [0, 0];
var nemCrka = ["ä", "ö", "ü", "ß"]; //array za vse nem črke
var navadneCrke = ["A", "O", "U", "S"];
var celica; //spremenljivka za id določene celice
var f = [0, 0]; //f kot flag za Preskoči
var ff = [0, 0]; //f kot flag za pokaziGlagolskoObliko
var fff = [0, 0]; //f kot flag za vpisiGlagolskoObliko
var AD; //state checkbox gumbov in a ali d
//var b; //spremenljivka za nem črke
//var c, d; //spremenljivka za nem črke
var napacniGlagoli = [[[], []], [[], []]]; //za sezanam napačnih glagolov
var imenaStolpcev = ["Slovenski prevod", "Reflexive Verben", "Akkusativ", "Dativ"];

function insertAtCaret(areaId, text) {
	var txtarea = document.getElementById(areaId);
	if (!txtarea) { //če ne obstaja to vpisno okno
	return;
	}

	var scrollPos = txtarea.scrollTop;
	var strPos = 0;
	var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
	"ff" : (document.selection ? "ie" : false));
	if (br == "ie") {
	txtarea.focus();
	var range = document.selection.createRange();
	range.moveStart('character', -txtarea.value.length);
	strPos = range.text.length;
	} else if (br == "ff") {
	strPos = txtarea.selectionStart;
	}

	var front = (txtarea.value).substring(0, strPos);
	var back = (txtarea.value).substring(strPos, txtarea.value.length);
	txtarea.value = front + text + back;
	strPos = strPos + text.length;
	if (br == "ie") {
	txtarea.focus();
	var ieRange = document.selection.createRange();
	ieRange.moveStart('character', -txtarea.value.length);
	ieRange.moveStart('character', strPos);
	ieRange.moveEnd('character', 0);
	ieRange.select();
	} else if (br == "ff") {
	txtarea.selectionStart = strPos;
	txtarea.selectionEnd = strPos;
	txtarea.focus();
	}

	txtarea.scrollTop = scrollPos;
}

function nakljucniGlagol() //funkcija ki izbere nakljucni glagol ///////////////////////////////////////
{
    i = [(Math.floor(Math.random() * vsiGlagoli[0][0].length)), (Math.floor(Math.random() * vsiGlagoli[1][0].length))]; //akkusativ in dativ
}

function seSi(hb)
{
	var seSi = [" se", " si"];
	var split = document.getElementById("input1").value.toString();
	split = split.split(" ");

	if (split[1] == null)
	{
		document.getElementById("input1").value = document.getElementById("input1").value + seSi[hb];
	}
	else
	{
		document.getElementById("input1").value = split[0] + seSi[hb];
	}

	document.getElementById("input1").focus();
	document.getElementById("input1").selectionStart = document.getElementById("input1").selectionEnd = (document.getElementById("input1").value.length) - 3;
}

function vedno()
{
	if (document.getElementById("Akkusativ").checked && document.getElementById("Dativ").checked)
	{
		if (i[0] > i[1])
		{
			AD = 0;
		}
		else
		{
			AD = 1;
		}
	}
	else if (document.getElementById("Akkusativ").checked)
	{
		AD = 0;
		j = 0;
	}
	else if (document.getElementById("Dativ").checked)
	{
		AD = 1;
		j = 1;
	}
	else
	{
		return;
	}

	for (var a = 0; a <= 1; a++) { //za vse stolpce se določi vsebina
		celica = document.getElementById(document.getElementById("tabela").rows[3].cells[a].id);

		if (document.getElementById("preskoci" + a).checked) //če je označen prvi radio gumb: Preskoči
		{
            celica.innerHTML = ""; //celica je prazna
            
			f[a] = 1;
			ff[a] = 0;
			fff[a] = 0;
		}
		else if (document.getElementById("pokaziGlagolskoObliko" + a).checked) //če je označen drugi radio gumb: pokaziGlagolskoObliko
		{
            if (celica.getElementsByTagName("DIV").length == 0)
            {
                celica.innerHTML = "";
                var div = document.createElement("DIV");
                div.setAttribute("class", "pokaziGl");
                celica.appendChild(div);
            }

			celica.getElementsByTagName("DIV")[0].innerHTML = vsiGlagoli[AD][a][i[AD]][0]; //nakljucen glagol se izpise

			f[a] = 0;
			ff[a] = 1;
			fff[a] = 0;
		}
		else if ((document.getElementById("vpisiGlagolskoObliko" + a).checked) && (fff[a] == 0))  //če je označen tretji radio gumb: vpisiGlagolskoObliko
		{
			celica.innerHTML = "";//izprazni se celica

			//v vztrezno celico se vztavi okence za vpis in gumbi
			var vpis = document.createElement("INPUT");
			vpis.setAttribute("id", "input" + a); //<input id="input">
            vpis.setAttribute("class", "input");
            celica.appendChild(vpis); //v celico se doda vpsno okno

			if (a == 1)
			{
				/*
				var gumbHabe = document.createElement("INPUT");
				gumbHabe.setAttribute("id", "gumbHabe");
				gumbHabe.setAttribute("type", "radio");
				gumbHabe.setAttribute("name", "habeBin");
				//gumbHabe.setAttribute("onclick", "insertAtCaret(input4, habe)");
				var gumbHabeB = document.createTextNode("Habe");
				gumbHabe.appendChild(gumbHabeB);

				var gumbBin = document.createElement("INPUT");
				gumbBin.setAttribute("id", "gumbBin");
				gumbBin.setAttribute("type", "radio");
				gumbBin.setAttribute("name", "habeBin");
				//gumbBin.setAttribute("onclick", "insertAtCaret(input4, bin)");
				var gumbBinB = document.createTextNode("Bin");
				gumbBin.appendChild(gumbBinB);

				var vpisHabeBin = document.createElement("INPUT");
				vpisHabeBin.setAttribute("id", "inputHabeBin");
				vpisHabeBin.setAttribute("autofocus", "");
				celica.appendChild(vpisHabeBin);
				document.getElementById("inputHabebin").size = 10;
				document.getElementById("inputHabebin").focus();
				*/

				var gumbSe = document.createElement("BUTTON");
				gumbSe.setAttribute("id", "gumbSe");
				gumbSe.setAttribute("onclick", "seSi(0)");
				var gumbSeB = document.createTextNode("Se");
				gumbSe.appendChild(gumbSeB);

				var gumbSi = document.createElement("BUTTON");
				gumbSi.setAttribute("id", "gumbSi");
				gumbSi.setAttribute("onclick", "seSi(1)");
				var gumbSiB = document.createTextNode("Si");
				gumbSi.appendChild(gumbSiB);

				celica.appendChild(gumbSe);
				celica.appendChild(gumbSi);
			}
			
			/*for (var b = 0; b <= 3; b++) //naredi vse gumbe za nem črke
			{ 
				var gumb = document.createElement("BUTTON");
				gumb.setAttribute("type", "button");
				//gumb.setAttribute("id", "nemGumb" + a + b); //nemgumb + v katerem stolcu + katera črka
				gumb.onclick = function(){nemCrke(a, b)};
				console.log(a, b);
				var Bgumb = document.createTextNode(nemCrka[b]); //<button type="button" onclick="nemCrke(a, b)>nemCrka[b]</button>
				gumb.appendChild(Bgumb);

				gumb.addEventListener('click', function() {
    				nemCrke(a, b);
				}, false);

				celica.appendChild(gumb);
			}*/
			vpis.focus();

			f[a] = 0;
			ff[a] = 0;
			fff[a] = 1;
		}
	}
	a = 0;	
}

function onLoad()
{
	nakljucniGlagol(); 

	document.addEventListener("keyup", function(event) { //preveri za pritisk tipke
			//event.preventDefault();

			if ((event.keyCode === 13) && (document.activeElement.id != "gumb")) //preveri če je pritisnjena tipka enter in ni ta gumb fokusiran
			{ 
				document.getElementById("gumb").click(); //klikne na gumb preveri
			}

			if (event.keyCode === 17) //preveri če je pritisnjena tipka Ctrl
			{
				var r = 1;
				tabLoop:
				for (var o = 0; o <= 4; o++)
				{
					if (document.activeElement.id == "input" + o)
					{
						for (var t = 1; t <= 4; t++)
						{
							if (fff[o + t])
							{
								document.getElementById("input" + (o + t)).focus();
								r = 0;
								break tabLoop;
							}
						}
						for (var t = 0; t <= 4; t++)
						{
							if (fff[t])
							{
								document.getElementById("input" + t).focus();
								r = 0;
								break tabLoop;
							}
						}
					}
				}
				for (var o = 0; o <= 4; o++)
				{
					if (fff[o] && (r))
					{
						document.getElementById("input" + o).focus();
						break;
					}
				}
			}

			var crka = navadneCrke.indexOf(String.fromCharCode(event.keyCode)); //katera črka je bila pritisnjena
			if ((crka != -1) && (event.altKey))  //preveri če je pritisnjena tipka a, o, u, s in alt
			{
				
				if (document.getElementById(document.activeElement.id) != null) //če je kako vpisno okno fokusirano
				{
					insertAtCaret(document.activeElement.id, nemCrka[crka]);
					//document.getElementById(document.activeElement.id).value = document.getElementById(document.activeElement.id).value + nemCrka[crka]; //dobi kar je že napisano in doda ustrezno črko
				}
				
			}

			});

	setInterval(vedno, 100); //vedno se ponavlja loop, vsake 100ms
}

function procentiPravilnih(o) //za izračun procentov pravilnih glagolov
{
	if (fff[o])
	{
		var procent = (pravilni[o] / steviloGlagolov[o]) * 100;
		procent = parseInt(procent.toString()); //pretvori se v intiger in string
		document.getElementById("procenti" + o).setAttribute("class", "procenti");
		document.getElementById("procenti" + o).innerHTML = procent + "%";
	}

	if (fff.indexOf(1) > -1)
	{
		if (document.getElementById("vsiProcenti") == undefined)
		{
			var div = document.createElement("DIV");
			div.setAttribute("id", "vsiProcenti");
			document.getElementsByTagName("P")[0].appendChild(div);
		}

		var vsiPravilni = pravilni.reduce((a, b) => a + b, 0);
		var vsiSteviloGlagolov = steviloGlagolov.reduce((a, b) => a + b, 0);
		var vsiProcenti = (vsiPravilni / vsiSteviloGlagolov) * 100;
		vsiProcenti = parseInt(vsiProcenti.toString()); //pretvori se v intiger in string
		document.getElementById("vsiProcenti").innerHTML = "Delež pravilnih glagolov: " + "<div>" + vsiPravilni + "</div>" + " od " + "<div>" + vsiSteviloGlagolov + "</div>" + " oziroma " + "<div>" + vsiProcenti + "</div>" + "%"; //vse se izpiše
	}
}

function preveri()
{
	switch(s){
		case 0:
			document.getElementById("gumb").innerHTML = "Nadaljuj"; //sprmeni gumb v Nadaljuj
			var kprejsni;
			var e = 0; //kot flag za pravilnost

			for (var o = 0; o <= 1; o++)
			{
				document.getElementById("preskoci" + o).setAttribute("disabled","disabled"); //vsak gumb deaktivira
				document.getElementById("pokaziGlagolskoObliko" + o).setAttribute("disabled","disabled");
				document.getElementById("vpisiGlagolskoObliko" + o).setAttribute("disabled","disabled");
				document.getElementById("Akkusativ").setAttribute("disabled","disabled");
				document.getElementById("Dativ").setAttribute("disabled","disabled");
				
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[0].setAttribute("class","prozorno"); //vsak gumb postane prozoren malo
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[1].setAttribute("class","prozorno");
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[2].setAttribute("class","prozorno");
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[3].setAttribute("class","prozorno");
				
				var p;
				if (fff[o] == 1)
				{

					var odgovor = document.getElementById("input" + o).value.toLowerCase().replace(/\s\s+/g, " "); //dobi odgovor uporabnika
					var k = -2;
					for (p = 0; p <= vsiGlagoli[AD][0].length - 1; p++) //p je array, kjer je pravilni odgovor
					{
						var kprejsni = vsiGlagoli[AD][o][p].indexOf(odgovor) - 1 //preveri ce se odgovor ujema z kaksnim izmed nem glagolov
						if (kprejsni > k)
						{
							k = kprejsni; //k je pravilni odgovor v najbolj notranjem arrayu
							e = 1; //e je flag za pravilnost, ker p nesme bit vec kot arrayev
							break; //to pomeni da je našel pravilni odgovor v arrayu p na k mestu - 1
						}
					}
					
					steviloGlagolov[o]++;

					//če je odgovor pravilen se zpise pravilno oz narobe
					if (p == i && e) //PRAVILNO
					{
						e = 0;
						document.getElementById("pravilnost" + o).setAttribute("class", "pravilno");
						document.getElementById("pravilnost" + o).innerHTML = "PRAVILNO!";
						pravilni[o]++; //za izračun procetov
					}
					
					else //NAROBE
					{
						document.getElementById("pravilnost" + o).setAttribute("class", "narobe");
						document.getElementById("pravilnost" + o).innerHTML = "NAROBE!";

						napacniGlagoli[o][AD].push(vsiGlagoli[AD][o][i[AD]][0]); //doda glagol ki je bil napačen glede na stolpec///////////////////
						//napacniGlagoli.toString;
						/*if (napacniGlagoli.length > 1)
						{
							//napacniGlagoli.split(",").join("<br />");
							//napacniGlagoli.replace(",", "<br />");
							napacniGlagoli.join("\r\n");
						}*/
						document.getElementById("kajsemorassenaucit").innerHTML="Kaj se moraš še naučit:"; //napise zacetni stavek
						document.getElementById("napacniGlagoli" + o + AD).innerHTML = imenaStolpcev[o] + ": " + "<br>" + imenaStolpcev[AD + 2] + ":" + napacniGlagoli[o][AD]; //izpis


						celica = document.getElementById(document.getElementById("tabela").rows[3].cells[o].id); //v div je glagol, ki ga je bilo vpisati (Pravilni glagol:)
						var divv = document.createElement("DIV"); //div element z id pravilniGlagol + o in classom pravilniGlagol
						divv.setAttribute("id", "pravilniGlagol" + o); 
						divv.setAttribute("class", "pravilniGlagol"); //v celico divv appendam spodaj
						
						if (document.getElementById("input" + o).value != "") //če ni odgovor prazen
						{
							var nepravilnostCrk = [[], [], [], []];
							var nepravilnostCrkSt = [];
							for (var z = 0; z <= vsiGlagoli[AD][o][i[AD]].length - 1; z++) //za vsako besedo v arrayu glagola
							{
								for (var u = 0; u <= odgovor.length - 1; u++) //za vsako črko odgovora
								{
									var nemGlagolCrka = vsiGlagoli[AD][o][i[AD]][z].charAt(u);
									var odgovorCrka = odgovor.charAt(u);
									if (nemGlagolCrka !== odgovorCrka)
									{
										nepravilnostCrk[z].push(u); //če je doočena črka nepravilna se shrani njena pozicja
									}
								}
								nepravilnostCrkSt.push(nepravilnostCrk[z].length);
							}

							var najblizjaBeseda = nepravilnostCrkSt.indexOf(Math.min.apply(Math, nepravilnostCrkSt)); //beseda, ki ima najmanj različnih črk od originala
							var popravljenoPlac = document.createElement("DIV");
							popravljenoPlac.setAttribute("id", "popravljenoPlac" + o);
							popravljenoPlac.setAttribute("class", "popravljeno");
							celica.appendChild(popravljenoPlac);
							var poprava = document.getElementById("input" + o).value.split("");
							var popravljeno;

							for (var r = 0; r <= nepravilnostCrk[najblizjaBeseda].length - 1; r++) //za vsako napako v besedi
							{
								poprava[nepravilnostCrk[najblizjaBeseda][r]] = "<span>" + poprava[nepravilnostCrk[najblizjaBeseda][r]] + "</span>";
							}
							popravljeno = poprava.join("");

							document.getElementById("popravljenoPlac" + o).innerHTML = popravljeno;
						}
						document.getElementById("input" + o).setAttribute("class", "skrito"); //odstrani se input in gumba habe in bin
						if (document.getElementById("gumbHabe") != undefined)
						{
							document.getElementById("gumbHabe").setAttribute("class", "skrito");
							document.getElementById("gumbBin").setAttribute("class", "skrito");
						}
						celica.appendChild(divv); //<div id="pravilniGlagol" + o>"Pravilni glagol: " + vsiGlagoli[AD][o][i[AD]][0]</div>
						document.getElementById("pravilniGlagol" + o).innerHTML = "Pravilni glagol: " + "<span>" + vsiGlagoli[AD][o][i[AD]][0] + "</span>";
					}
				}
				procentiPravilnih(o);
			}
			s = 1;
			break;
		
		case 1:
			document.getElementById("gumb").innerHTML = "Preveri"; //spremeni gumb v Preveri
			var j = 1;

			document.getElementById("Akkusativ").removeAttribute("disabled");
			document.getElementById("Dativ").removeAttribute("disabled");

			for (var o = 0; o <= 1; o++)
			{
				document.getElementById("preskoci" + o).removeAttribute("disabled"); //vsi gumbi so aktivirani
				document.getElementById("pokaziGlagolskoObliko" + o).removeAttribute("disabled");
				document.getElementById("vpisiGlagolskoObliko" + o).removeAttribute("disabled");

				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[0].removeAttribute("class"); //vsi gumbi niso več prozorni
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[1].removeAttribute("class");
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[2].removeAttribute("class");
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[3].removeAttribute("class");

				if (fff[o] == 1)
				{
					document.getElementById("input" + o).setAttribute("class", "input"); //znova se pojavi input

					if ((document.getElementById("gumbHabe")) != undefined) //znova se pojavijo gumba habe in bin
					{
						document.getElementById("gumbHabe").setAttribute("class", "");
						document.getElementById("gumbBin").setAttribute("class", "");
					}

					if (document.getElementById("popravljenoPlac" + o) != undefined) //odstrani popravljeno, če obstaja
					{
						document.getElementById("popravljenoPlac" + o).remove(); //izbriše popravljeno
					}

					if (j)
					{
						document.getElementById("input" + o).focus() //fokusira se na prvo vpisno okno
						j = 0;
					}

					document.getElementById("pravilnost" + o).innerHTML = ""; //izbriše se pravilnost
					document.getElementById("input" + o).value = ""; //izbrise kar je bilo prej napisano
					if (document.getElementById("pravilniGlagol" + o) != null)
					{
						document.getElementById("pravilniGlagol" + o).remove(); //izbriše se pravilni glagol (div)
					}
				}
			}
			
			nakljucniGlagol(); //izbere naslednji naključni glagol
			s = 0;
			break;
	}

}