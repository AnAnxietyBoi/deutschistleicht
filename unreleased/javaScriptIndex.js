var vsiGlagoli = VsiGlagoli[0];

var isMobile = false; //če je telefon
var i; //spremenljivka za nakjučni glagol
var s = 0; //spremenljivka za switch
var pravilni = [0, 0, 0, 0, 0]; //spremenljivka za računanje procentov
var steviloGlagolov = [0, 0, 0, 0, 0];
var nemCrka = ["ä", "ö", "ü", "ß"]; //array za vse nem črke
var navadneCrke = ["A", "O", "U", "S"];
var celica; //spremenljivka za id določene celice
var f = [0, 0, 0, 0, 0]; //f kot flag za Preskoči
var ff = [0, 0, 0, 0, 0]; //f kot flag za pokaziGlagolskoObliko
var fff = [0, 0, 0, 0, 0]; //f kot flag za vpisiGlagolskoObliko
//var b; //spremenljivka za nem črke
//var c, d; //spremenljivka za nem črke
var napacniGlagoli = [[], [], [], [], []]; //za sezanam napačnih glagolov
var p = 1; //spremenljivka za localStorage
var datum;

function localStoragee()
{
	var isIE = false || !!document.documentMode; //če je IE
	if ((typeof(Storage) !== "undefined") && !isIE) //če lahko brskalnik ima local storage
	{
		//var storage = window.localStorage;
		if (p) //samo prvič
		{
			p = 0;
			steviloGlagolov = JSON.parse(localStorage.getItem(datum + "_steviloGlagolovNavadni")) || [0, 0, 0, 0, 0]; //json.parse iz stringa naredi array
			napacniGlagoli = JSON.parse(localStorage.getItem(datum + "_napacniGlagoliNavadni")) || [[], [], [], [], []];
			for (let m = 0; m <= pravilni.length - 1; m++)
			{
				pravilni[m] = steviloGlagolov[m] - napacniGlagoli[m].length;
			}
		}
		else
		{
			//storage.setItem(datum + "_pravilniNavadni", JSON.stringify(pravilni)); //array se spremeni v string
			//window.localStorage.setItem(datum + "_steviloGlagolovNavadni", JSON.stringify(steviloGlagolov));
			localStorage.setItem(datum + "_steviloGlagolovNavadni", JSON.stringify(steviloGlagolov)); //array se spremeni v string
			localStorage.setItem(datum + "_napacniGlagoliNavadni", JSON.stringify(napacniGlagoli));
		}
	}
}

/*function localStorageSpace() {
	var allStrings = '';
	for(var key in window.localStorage){
		if(window.localStorage.hasOwnProperty(key)){
			allStrings += window.localStorage[key];
		}
	}
	return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
}*/

/*function nemCrke(c, d)
{
	document.getElementById("input" + c).value = document.getElementById("input" + c).value + nemCrka[d]; //dobi kar je že napisano in doda ustrezno črko
	document.getElementById("input" + c).focus(); //fokusira se na vpisno okno
	console.log(c, d);

	for (var o = 0; o <= 4; o++)
	{
		if (fff[o])
		{
			var input = document.getElementById("input" + o).hasFocus;
			if (input)
			{
				document.getElementById("input" + o).value = document.getElementById("input" + o).value + nemCrka[d]; //dobi kar je že napisano in doda ustrezno črko
				document.getElementById("input" + o).focus(); //fokusira se na vpisno okno
			}

		}
	}
}*/

function insertAtCaret(areaId, text)
{
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
	i = Math.floor(Math.random() * vsiGlagoli[0].length);
}

function habeBin(hb) //za gumba habe in bin
{
	var habebin = ["habe ", "bin "]; //kar se bo vstavilo na začetek
	var split = document.getElementById("input4").value.toString();
	split = split.split(" ");

	if (split[1] == null)
	{
		document.getElementById("input4").value = habebin[hb] + document.getElementById("input4").value;
	}
	else
	{
		document.getElementById("input4").value = habebin[hb] + split[1];
	}

	document.getElementById("input4").focus();
}

function popUpImage()
{
	var modal = document.querySelector(".modal");
	var closeButton = document.querySelector(".close-button");
	
	function toggleModal() { //doda ali odstrani class show-modal
		modal.classList.toggle("show-modal");
	}
	
	function windowOnClick(event) { //če se klikne na modal
		if (event.target === modal) {
			toggleModal();
		}
	}
	
	toggleModal(); //prvič se pokaže
	
	closeButton.addEventListener("click", toggleModal); //se izbriše če se bil pritisnjen križec
	window.addEventListener("click", windowOnClick); //se izbriše če se klikne na ozadje

	window.addEventListener("resize", function() { //ko se spremeni orjentacija
		if((window.innerHeight > window.innerWidth) && !modal.classList.contains("show-modal")) //če je v portraid modu in če ni na ekranu modela
		{
			toggleModal();
		}
	});
}

function vedno()
{
	for (var a = 0; a <= 4; a++) { //za vse stolpce se določi vsebina
		celica = document.getElementById(document.getElementById("tabela").rows[3].cells[a].id);

		if (fff[a] && (document.getElementById("input" + a).value == " "))
		{
			document.getElementById("input" + a).value = "";
		}

		if (document.getElementById("preskoci" + a).checked) //če je označen prvi radio gumb: Preskoči
		{
            celica.innerHTML = ""; //celica je prazna
            
			f[a] = 1;
			ff[a] = 0;
			fff[a] = 0;
		}
		else if (document.getElementById("pokaziGlagolskoObliko" + a).checked) //če je označen drugi radio gumb: pokaziGlagolskoObliko
		{
			celica.innerHTML = "";
			var div = document.createElement("DIV");
			div.setAttribute("class", "pokaziGl");
			celica.appendChild(div);
            
            celica.getElementsByTagName("DIV")[0].innerHTML = vsiGlagoli[a][i][0]; //nakljucen glagol se izpise
            
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

			if (a == 4)
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

				var gumbHabe = document.createElement("BUTTON");
				gumbHabe.setAttribute("onclick", "habeBin(0)");
				gumbHabe.setAttribute("id", "gumbHabe");
				var gumbHabeB = document.createTextNode("Habe");
				gumbHabe.appendChild(gumbHabeB);

				var gumbBin = document.createElement("BUTTON");
				gumbBin.setAttribute("onclick", "habeBin(1)");
				gumbBin.setAttribute("id", "gumbBin");
				var gumbBinB = document.createTextNode("Bin");
				gumbBin.appendChild(gumbBinB);

				celica.appendChild(gumbHabe);
				celica.appendChild(gumbBin);
			}

			celica.appendChild(vpis); //v celico se doda vpsno okno
			
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
	/*var smth = window.screen.lockOrientation("landscape");*/
	}

	var date = new Date();
	datum = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
	
	localStoragee();
	nakljucniGlagol(); 

	document.addEventListener("keyup", function(event) { //preveri za pritisk tipke
			//event.preventDefault();

			if ((event.keyCode === 13) && (document.activeElement.id != "gumb")) //preveri če je pritisnjena tipka enter in ni ta gumb fokusiran
			{
				if (isMobile)
				{
					var m = 1;
					enterLoop:
					for (var p = 0; p <= 4; p++)
					{
						if (document.activeElement.id == "input" + p)
						{
							for (let a = 1; a <= 4; a++)
							{
								if (fff[p + a])
								{
									document.getElementById("input" + (p + a)).focus();
									m = 0;
									break enterLoop;
								}
								else //če je zadnji stolpec za upisat
								{
									document.getElementById("gumb").click(); //klikne na gumb preveri
									m = 0;
									break enterLoop;
								}
							}
						}
					}
					if (m) //če ni nobenega vpisnega polja
					{
						m = 0;
						document.getElementById("gumb").click(); //klikne na gumb preveri
					}
				}
				else
				{
					document.getElementById("gumb").click(); //klikne na gumb preveri
				}
			}

			if ((event.keyCode === 72) && (document.getElementById("input4") !== null) && fff[4]) //h --> habe
			{
				if (document.getElementById("input4").value == "h")
				{
					document.getElementById("input4").value = "habe ";
				}
			}

			if ((event.keyCode === 66) && (document.getElementById("input4") !== null) && fff[4]) //b --> bin
			{
				if (document.getElementById("input4").value == "b")
				{
					document.getElementById("input4").value = "bin ";
				}
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

	if (isMobile)
	{
		popUpImage();
	}
	
	if (isMobile)
	{
		window.addEventListener("visibilitychange", function() {
			console.log(document.visibilityState);
			var data = [steviloGlagolov, napacniGlagoli];
			let result = navigator.sendBeacon('statistikaRecive.php', JSON.stringify(data));
			
			if (result) { 
			  console.log('Successfully queued!');
			} else {
			  console.log('Failure.');
			}
		});	
	}
	else
	{
		window.addEventListener('unload', function(event) {
			if (!navigator.sendBeacon) {return;}
			var data = [steviloGlagolov, napacniGlagoli];
			//var blob = new Blob([JSON.stringify(data)], {type : 'application/json'});

			/*var reader = new FileReader();
			reader.addEventListener("loadend", function() {
			   // reader.result contains the contents of blob as a typed array
			   console.log(reader.result);
			});
			reader.readAsText(blob);*/
	
			// Content-Type of the Beacon HTTP request will be application/json in this case
			navigator.sendBeacon('statistikaRecive.php', JSON.stringify(data));
			//navigator.sendBeacon('statistikaRecive.php', blob);
			//let result = navigator.sendBeacon('statistikaRecive.php', blob);

			//TODO: če uporabnik večkrat v enem dnevu pride na stran potem pošlje stare rezultate*********************************************
			//TODO: če uporabnik reloada stran*********************************************
			/*if (result) { 
			  console.log('Successfully queued!');
			} else {
			  console.log('Failure.');
			}*/
		}, false);	
	}
	setInterval(vedno, 100); //vedno se ponavlja loop, vsake 100ms
}

function procentiPravilnih(o) //za izračun procentov pravilnih glagolov
{
	if (fff[o])
	{
		var procent = Math.round((pravilni[o] / steviloGlagolov[o]) * 100);
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

		//var vsiPravilni = pravilni.reduce((a, b) => a + b, 0); //ker => nedela v IE
		//var vsiSteviloGlagolov = steviloGlagolov.reduce((a, b) => a + b, 0);
		var vsiPravilni = pravilni.reduce(function(a, b){return (a + b);});
		var vsiSteviloGlagolov = steviloGlagolov.reduce(function(a, b){return (a + b);});
		var vsiProcenti = Math.round((vsiPravilni / vsiSteviloGlagolov) * 100);
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

			for (var o = 0; o <= 4; o++)
			{
				document.getElementById("preskoci" + o).setAttribute("disabled","disabled"); //vsak gumb deaktivira
				document.getElementById("pokaziGlagolskoObliko" + o).setAttribute("disabled","disabled");
				document.getElementById("vpisiGlagolskoObliko" + o).setAttribute("disabled","disabled");
				
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[0].setAttribute("class","prozorno"); //vsak gumb postane prozoren malo
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[1].setAttribute("class","prozorno");
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[2].setAttribute("class","prozorno");
				
				var p;
				if (fff[o] == 1)
				{

					var odgovor = document.getElementById("input" + o).value.toLowerCase().replace(/\s\s+/g, " "); //dobi odgovor uporabnika
					var k = -1;
					for (p = 0; p <= vsiGlagoli[0].length - 1; p++) //p je array, kjer je pravilni odgovor
					{
						var kprejsni = vsiGlagoli[o][p].indexOf(odgovor) //preveri ce se odgovor ujema z kaksnim izmed nem glagolov
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

						napacniGlagoli[o].push(i); //doda glagol ki je bil napačen glede na stolpec

						celica = document.getElementById(document.getElementById("tabela").rows[3].cells[o].id); //v div je glagol, ki ga je bilo vpisati (Pravilni glagol:)
						var divv = document.createElement("DIV"); //div element z id pravilniGlagol + o in classom pravilniGlagol
						divv.setAttribute("id", "pravilniGlagol" + o); 
						divv.setAttribute("class", "pravilniGlagol"); //v celico divv appendam spodaj
						
						if (document.getElementById("input" + o).value != "") //če ni odgovor prazen
						{
							var nepravilnostCrk = [[], [], [], [], [], [], []];
							var nepravilnostCrkSt = [];
							for (var z = 0; z <= vsiGlagoli[o][i].length - 1; z++) //za vsako besedo v arrayu glagola
							{
								/*var obeB = odgovor.split(" ");
								var nemObe = vsiGlagoli[o][i][z].split(" ");

								if (obeB.length > nemObe.length)
								{
									obeB = [obeB.join("")];
								}

								for (var t = 0; t <= obeB.length - 1; t++)
								{
									for (var u = 0; u <= obeB[t].length - 1; u++)
									{
										var t0 = 0;
										var t1 = 0;
										if (nemObe[t - 1] != undefined)
										{
											var t0 = nemObe[t - 1].length;
										}
										if (nemObe[t - 2] != undefined)
										{
											var t1 = nemObe[t - 2].length;
										}
										var nemGlagolCrka = vsiGlagoli[o][i][z].charAt(u + t + t0 + t1);
										var odgovorCrka = odgovor.charAt(u + t + t0 + t1);
										if (nemGlagolCrka !== odgovorCrka)
										{
											nepravilnostCrk[z].push(u + t + t0 + t1); //če je doočena črka nepravilna se shrani njena pozicja
										}
									}
								}*/


								var clen = -1; //če člena ni
								var nemClen = -1;
								if (o == 4) //če je 5 stolpec
								{
									var obeB = odgovor.split(" ");
									var nemObe = vsiGlagoli[o][i][z].split(" ");
									clen = obeB[0].length;
									nemClen = nemObe[0].length;
									if (obeB[0] !== nemObe[0]) //če člen ni isti
									{
										for (var r = 0; r <= clen - 1; r++) //cel člen je nepravilne
										{
											nepravilnostCrk[z].push(r);
										}
									}
								}

								for (var u = 1 + clen; u <= odgovor.length - 1; u++) //za vsako črko odgovora začne se po členu
								{
									var nemGlagolCrka = vsiGlagoli[o][i][z].charAt(u + nemClen - clen); //razlika clenov
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
						celica.appendChild(divv); //<div id="pravilniGlagol" + o>"Pravilni glagol: " + vsiGlagoli[o][i][0]</div>
						document.getElementById("pravilniGlagol" + o).innerHTML = "Pravilno: " + "<span>" + vsiGlagoli[o][i][0] + "</span>";
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

			for (var o = 0; o <= 4; o++)
			{
				document.getElementById("preskoci" + o).removeAttribute("disabled"); //vsi gumbi so aktivirani
				document.getElementById("pokaziGlagolskoObliko" + o).removeAttribute("disabled");
				document.getElementById("vpisiGlagolskoObliko" + o).removeAttribute("disabled");

				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[0].removeAttribute("class"); //vsi gumbi niso več prozorni
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[1].removeAttribute("class");
				document.getElementsByClassName("vsiGumbi")[o].getElementsByTagName("LABEL")[2].removeAttribute("class");

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
						document.getElementById("input" + o).focus(); //fokusira se na prvo vpisno okno
						j = 0;
					}

					document.getElementById("pravilnost" + o).innerHTML = ""; //izbriše se pravilnost
					document.getElementById("input" + o).value = ""; //izbrise kar je bilo prej napisano
					if (document.getElementById("pravilniGlagol" + o) != null)
					{
						//document.getElementById("pravilniGlagol" + o).remove(); //izbriše se pravilni glagol (div) //nedela v IE
						document.getElementById("pravilniGlagol" + o).parentElement.removeChild(document.getElementById("pravilniGlagol" + o));
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
	//izbriše morda samo za tisti dan????
	//localStorage.removeItem(/pravilniNavadni_/); //izbriše samo procente
	//localStorage.removeItem(/napacniGlagoliNavadni_/);
	//localStorage.clear();
	
	localStorage.removeItem(datum + "_pravilniNavadni");
	localStorage.removeItem(datum + "_steviloGlagolovNavadni");
	localStorage.removeItem(datum + "_napacniGlagoliNavadni");
	pravilni = [0, 0, 0, 0, 0];
	steviloGlagolov = [0, 0, 0, 0, 0];
	location.reload();
}

window.onload= onLoad;