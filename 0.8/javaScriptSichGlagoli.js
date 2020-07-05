var vsiGlagoli = //00-AKKUSATIV slo prevod, 01-AKKUSATIV nem, 10-DATIV slo prevod, 11-DATIV nem
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

var isMobile = false; //če je telefon
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
var imenaStolpcev = ["Slovenski prevod", "Reflexive Verben"];
var p = 1; //spremenljivka za localStorage

function localStoragee()
{
	if (typeof(Storage) !== "undefined") //če lahko brskalnik ima local storage
	{
		if (p) //samo prvič
		{
			p = 0;
			for (var r = 0; r <= 1; r++)
			{
				pravilni[r] = Number(localStorage.getItem("pravilniSich" + r)) || 0; //iz local storiga dobi vrednosti za pravilneglagole in štglagolov, če jih ni je 0
				steviloGlagolov[r] = Number(localStorage.getItem("steviloGlagolovSich" + r)) || 0;
			}
		}
		else
		{
			for (var r = 0; r <= 1; r++)
			{
				localStorage.setItem("pravilniSich" + r, pravilni[r]); //vsakič pa nove vrednosti zapiše v local storage
				localStorage.setItem("steviloGlagolovSich" + r, steviloGlagolov[r]);
			}
		}
	}
		/*// Code for localStorage/sessionStorage.
		// Store
		localStorage.setItem("lastname", "Smith");
		// Retrieve
		document.getElementById("result").innerHTML = localStorage.getItem("lastname");
		document.getElementById("result").innerHTML = localStorage.lastname;
		localStorage.removeItem("lastname");*/
}

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

function nakljucniGlagol() //funkcija ki izbere nakljucni glagol
{
    i = [(Math.floor(Math.random() * vsiGlagoli[0][0].length)), (Math.floor(Math.random() * vsiGlagoli[1][0].length))]; //akkusativ in dativ
}

function seSi(hb)
{
	var seSi = [" se", " si"];
	var split = document.getElementById("input0").value.toString();
	split = split.split(" ");

	if (split[1] == null)
	{
		document.getElementById("input0").value = document.getElementById("input0").value + seSi[hb];
	}
	else
	{
		document.getElementById("input0").value = split[0] + seSi[hb];
	}

	document.getElementById("input0").focus();
	document.getElementById("input0").selectionStart = document.getElementById("input0").selectionEnd = (document.getElementById("input0").value.length) - 3;
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

			if (a == 1)
			{
				celica.innerHTML = "Sich "
			}
			//v vztrezno celico se vztavi okence za vpis in gumbi
			var vpis = document.createElement("INPUT");
			vpis.setAttribute("id", "input" + a); //<input id="input">
            vpis.setAttribute("class", "input");
            celica.appendChild(vpis); //v celico se doda vpsno okno

			if (a == 0)
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
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
	}
	
	localStoragee();
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
					insertAtCaret(document.activeElement.id, nemCrka[crka]); //dobi kar je že napisano in doda ustrezno črko
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
					var k = -1;
					for (p = 0; p <= vsiGlagoli[AD][0].length - 1; p++) //p je array, kjer je pravilni odgovor
					{
						var kprejsni = vsiGlagoli[AD][o][p].indexOf(odgovor) //preveri ce se odgovor ujema z kaksnim izmed nem glagolov
						if (kprejsni > k)
						{
							k = kprejsni; //k je pravilni odgovor v najbolj notranjem arrayu
							e = 1; //e je flag za pravilnost, ker p nesme bit vec kot arrayev
							break; //to pomeni da je našel pravilni odgovor v arrayu p na k mestu
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

						if (o == 1)
						{
							napacniGlagoli[o][AD].push("sich " + vsiGlagoli[AD][o][i[AD]][0]); //doda glagol ki je bil napačen glede na stolpec	
						}
						else
						{
							napacniGlagoli[o][AD].push(vsiGlagoli[AD][o][i[AD]][0]); //doda glagol ki je bil napačen glede na stolpec
						}
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
						if (document.getElementById("gumbSe") != undefined)
						{
							document.getElementById("gumbSe").setAttribute("class", "skrito");
							document.getElementById("gumbSi").setAttribute("class", "skrito");
						}
						celica.appendChild(divv); //<div id="pravilniGlagol" + o>"Pravilni glagol: " + vsiGlagoli[AD][o][i[AD]][0]</div>
						document.getElementById("pravilniGlagol" + o).innerHTML = "Pravilni glagol: " + "<span>" + vsiGlagoli[AD][o][i[AD]][0] + "</span>";
					}
				}
				procentiPravilnih(o);
				localStoragee();
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

					if ((document.getElementById("gumbSe")) != undefined) //znova se pojavijo gumba habe in bin
					{
						document.getElementById("gumbSe").setAttribute("class", "");
						document.getElementById("gumbSi").setAttribute("class", "");
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

function reset()
{
	localStorage.clear();
	pravilni = [0, 0, 0, 0, 0];
	steviloGlagolov = [0, 0, 0, 0, 0];
	location.reload();
}