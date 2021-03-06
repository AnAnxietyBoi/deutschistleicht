var vsiGlagoli = VsiGlagoli;  //vsiGlagoli[navadni ali akkusativ ali dativ][slo prevod ali infiniv ali 3 oseba ali praterium ali perfekt ali slo prevod AK ali nem AK ali slo prevod DAT ali nem DAT][vse oblike glagola][posamezen glagol]

var isMobile = false; //če je telefon
var s = 0; //spremenljivka za switch
var nemCrka = ["ä", "ö", "ü", "ß"]; //array za vse nem črke
var navadneCrke = ["A", "O", "U", "S"];
var celica; //spremenljivka za id določene celice
//var b; //spremenljivka za nem črke
//var c, d; //spremenljivka za nem črke
var zgodovinaIskanja = []; //za zgodovino iskanja
var imenaStolpcev = ["Slovenski prevod", "Infinitiv", "3. Person", "Präteritum", "Perfekt", "Slovenski prevod", "Reflexive Verben, Akkusativ", "Slovenski prevod", "Reflexive Verben, Dativ"];
var p = 1; //spremenljivka za localStorage

function localStoragee()
{
	if (typeof(Storage) !== "undefined") //če lahko brskalnik ima local storage
	{
		if (p) //samo prvič
		{
			p = 0;
		}
		else
		{
		}
	}
}

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

function matchRuleShort(str, rule) {
	return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

function gumbi(hb) //za gumbe ob inputu
{
	var habebin = ["habe ", "bin ", "sich "]; //kar se bo vstavilo na začetek
	var split = document.getElementById("iskaniGlagol").value.toString();
	split = split.split(" ");

	if (split[1] == null)
	{
		document.getElementById("iskaniGlagol").value = habebin[hb] + document.getElementById("iskaniGlagol").value;
	}
	else
	{
		document.getElementById("iskaniGlagol").value = habebin[hb] + split[1];
	}

	document.getElementById("iskaniGlagol").focus();
}

function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	var enter = 0; //za autocomplete da ne bo dvakrat enter
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function() {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
		  /*check if the item starts with the same letters as the text field value:*/
		  arrSplit = arr[i].split(" "); //za iskanje tudi 2. besede
		  for (var l = 0; l <= arrSplit.length - 1; l++){
			//if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			if (arrSplit[l].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				if (l == 1){
					b.innerHTML = arrSplit[0] + " ";
					b.innerHTML += "<strong>" + arrSplit[l].substr(0, val.length) + "</strong>";
					b.innerHTML += arrSplit[l].substr(val.length);
					if (arrSplit[2]) {b.innerHTML += " " + arrSplit[2];} //če je še tretja beseda
				}
				else if (l == 2){
					b.innerHTML = arrSplit[0] + " " + arrSplit[1] + " ";
					b.innerHTML += "<strong>" + arrSplit[l].substr(0, val.length) + "</strong>";
					b.innerHTML += arrSplit[l].substr(val.length);
				}
				else{
					b.innerHTML = "<strong>" + arrSplit[l].substr(0, val.length) + "</strong>";
					b.innerHTML += arr[i].substr(val.length);
				}
				//b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				//b.innerHTML += arrSplit[l].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
					if (!enter)
					{
						document.getElementById("gumb").click();
					}
					enter = 0;
					closeAllLists();
				});
				a.appendChild(b);
			}
		  }
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
		  /*If the arrow DOWN key is pressed,
		  increase the currentFocus variable:*/
		  currentFocus++;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 38) { //up
		  /*If the arrow UP key is pressed,
		  decrease the currentFocus variable:*/
		  currentFocus--;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 13) {
		  /*If the ENTER key is pressed, prevent the form from being submitted,*/
		  e.preventDefault();
		  if (currentFocus > -1) {
			/*and simulate a click on the "active" item:*/
			enter = 1;
			if (x) x[currentFocus].click();
		  }
		}
	});
	function addActive(x) {
	  /*a function to classify an item as "active":*/
	  if (!x) return false;
	  /*start by removing the "active" class on all items:*/
	  removeActive(x);
	  if (currentFocus >= x.length) currentFocus = 0;
	  if (currentFocus < 0) currentFocus = (x.length - 1);
	  /*add class "autocomplete-active":*/
	  x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
	  /*a function to remove the "active" class from all autocomplete items:*/
	  for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("autocomplete-active");
	  }
	}
	function closeAllLists(elmnt) {
	  /*close all autocomplete lists in the document,
	  except the one passed as an argument:*/
	  var x = document.getElementsByClassName("autocomplete-items");
	  for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
		  x[i].parentNode.removeChild(x[i]);
		}
	  }
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

function onLoad()
{
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	isMobile = true;
	}
	
	localStoragee();

	var vsiGlagoliBrezDvojnikov = VsiGlagoli;

	for (var z = 0; z <= vsiGlagoliBrezDvojnikov.length - 1; z++)
	{
		for (var e = 0; e <= vsiGlagoliBrezDvojnikov[z].length - 1; e++)
		{
			for (var w = 0; w <= vsiGlagoliBrezDvojnikov[z][e].length - 1; w++)
			{
				if (vsiGlagoliBrezDvojnikov[z][e][w].length > 1) //če je več različic glagola
				{
					vsiGlagoliBrezDvojnikov[z][e][w].shift(); //prvi element se izbriše
				}
			}
		}
	}
	vsiGlagoliBrezDvojnikov = [].concat.apply([], [].concat.apply([], [].concat.apply([], vsiGlagoliBrezDvojnikov))).filter(function(item, pos, self) {
    	return self.indexOf(item) == pos; //vse arraye da skupaj in izbriše dvojnike
	})

	autocomplete(document.getElementById("iskaniGlagol"), vsiGlagoliBrezDvojnikov); //funkcija za autocompletanje

	document.getElementById("iskaniGlagol").focus(); //fokusira se na vpisno okno

	document.addEventListener("keyup", function(event) { //preveri za pritisk tipke
			//event.preventDefault();

			if ((event.keyCode === 13) && (document.activeElement.id != "gumb")) //&& (currentFocus == -1)) //preveri če je pritisnjena tipka enter in ni ta gumb fokusiran
			{ 
				document.getElementById("gumb").click(); //klikne na gumb preveri
			}

			var crka = navadneCrke.indexOf(String.fromCharCode(event.keyCode)); //katera črka je bila pritisnjena
			if ((crka != -1) && (event.altKey))  //preveri če je pritisnjena tipka a, o, u, s in alt
			{
				
				if (document.getElementById(document.activeElement.id) != null) //če je kako vpisno okno fokusirano
				{
					insertAtCaret(document.activeElement.id, nemCrka[crka]); //doda ustrezno črko

					var event = new Event('input', { //če pritsnem nem črko se brez tega autocomplete ne izvede
						'bubbles': true,
						'cancelable': true
					});

					(document.getElementById("iskaniGlagol")).dispatchEvent(event);
				}
			}
			});

	setInterval(function a(){if (document.getElementById("iskaniGlagol").value == " "){document.getElementById("iskaniGlagol").value = "";}}, 100);

	if((window.innerHeight > window.innerWidth) && isMobile)
	{
		alert("Prosim, obrni telefon v ležeči položaj!");
	}

	window.addEventListener("resize", function() {
		if((window.innerHeight > window.innerWidth) && isMobile)
		{
			alert("Prosim, obrni telefon v ležeči položaj!");
		}
	});
}

function iskanje()
{
	if (document.getElementById("iskaniGlagol").value == "") //če ni nič vpisano
	{
		return;
	}
	switch(s){
		case 0:
			document.getElementById("gumb").innerHTML = "Ponovno iskanje"; //sprmeni gumb v Nadaljuj
			var iskanje = document.getElementById("iskaniGlagol").value.toLowerCase().replace(/\s\s+/g, " "); //dobi odgovor uporabnika
			document.getElementById("iskaniGlagol").setAttribute("class", "skrito"); //odstrani se input

			document.getElementById("gumb0").setAttribute("class", "skrito");
			document.getElementById("gumb1").setAttribute("class", "skrito");
			document.getElementById("gumb2").setAttribute("class", "skrito");
        
			//z - navadni akksativ dativ, e - stolpec, w - različice glagola, t - posamezen glagol
			var iskaniGlagol = []; //array za vse najdene prave glagole
			var mestoIskanegaGlagola = []; //array za mesta najdenih glagolov
			var vsiZadetki = [];
			for (var z = 0; z <= vsiGlagoli.length - 1; z++)
			{
				for (var e = 0; e <= vsiGlagoli[z].length - 1; e++)
				{
					for (var w = 0; w <= vsiGlagoli[z][e].length - 1; w++)
					{
						var nepravilnostCrk = [[], [], [], []];
						var nepravilnostCrkSt = [];
						for (var t = 0; t <= vsiGlagoli[z][e][w].length - 1; t++) //za vsako obliko glagola
						{
							/*if (z == 0)
							{
								var clen = -1; //če člena ni
								var nemClen = -1;
								if (e == 4) //če je 5 stolpec
								{
									var obeB = iskanje.split(" ");
									var nemObe = vsiGlagoli[z][e][w][t].split(" ");
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
	
								for (var u = 1 + clen; u <= iskanje.length - 1; u++) //za vsako črko odgovora začne se po členu
								{
									var nemGlagolCrka = vsiGlagoli[z][e][w][t].charAt(u + nemClen - clen); //razlika clenov
									var odgovorCrka = iskanje.charAt(u);
									if (nemGlagolCrka !== odgovorCrka)
									{
										nepravilnostCrk[z].push(u); //če je doočena črka nepravilna se shrani njena pozicja
									}
								}
							}

							else
							{
								var clen = -1; //če člena ni
								var obeB = iskanje.split(" ");
								if ((e == 0) && (obeB[1] !== undefined)) //če je 5 stolpec
								{
									var nemObe = vsiGlagoli[z][e][w][t].split(" ");
									clen = obeB[1].length;
									if (obeB[1] !== nemObe[1]) //če člen ni isti
									{
										for (var r = obeB[0].length + 1; r <= iskanje.length - 1; r++) //cel člen je nepravilen
										{
											nepravilnostCrk[z].push(r);
										}
									}
								}
	
								for (var u = 0; u <= iskanje.length - 2 - clen; u++) //za vsako črko odgovora, -2 zaradi presledka, -clen ker je na koncu
								{
									var nemGlagolCrka = vsiGlagoli[z][e][w][t].charAt(u);
									var odgovorCrka = iskanje.charAt(u);
	
									if (nemGlagolCrka !== odgovorCrka)
									{
										nepravilnostCrk[z].push(u); //če je doočena črka nepravilna se shrani njena pozicja
									}
								}
							}*/
							
							for (var u = 0; u <= iskanje.length - 1; u++) //za vsako črko iskanja
							{
								var nemGlagolCrka = vsiGlagoli[z][e][w][t].charAt(u);
								var iskanjeCrka = iskanje.charAt(u);
								if (nemGlagolCrka !== iskanjeCrka)
								{
									nepravilnostCrk[t].push(u); //če je doočena črka nepravilna se shrani njena pozicja
								}
							}
							if (matchRuleShort(vsiGlagoli[z][e][w][t], iskanje)) //če se uporabi wildcard *
							{
								nepravilnostCrk[t] = []; //kot da je beseda popoloma pravilna
							}

							nepravilnostCrkSt.push(nepravilnostCrk[t].length);
						}

						var arrayNajblizjeBesede = nepravilnostCrk[nepravilnostCrkSt.indexOf(Math.min.apply(Math, nepravilnostCrkSt))];

						var g = 1; //da se rezultati ne ponavljajo
						for (var t = 0; t <= mestoIskanegaGlagola.length - 1; t++)
						{
							if (mestoIskanegaGlagola[t][0] == z && mestoIskanegaGlagola[t][2] == w)
							{
								if ((iskaniGlagol[0] == undefined) || (iskaniGlagol[0].length == arrayNajblizjeBesede.length))
								{
									vsiZadetki[t].push(e);
								}
								g = 0;
								break;
							}
						}

						if ((iskaniGlagol[0] == undefined) || (iskaniGlagol[0].length == arrayNajblizjeBesede.length) && g) //če ima glagol enako nepravilnosti
						{
							vsiZadetki.push([e]);
							iskaniGlagol.push(arrayNajblizjeBesede);
							mestoIskanegaGlagola.push([z, e, w, t]);		
						}
						else if (iskaniGlagol[0].length > arrayNajblizjeBesede.length) //če je glagol bolj podoben iskanemu
						{
							vsiZadetki = [[e]];
							iskaniGlagol = [arrayNajblizjeBesede];
							mestoIskanegaGlagola = [[z, e, w, t]];
						}			
					}
				}
			}

			var popravljenoPlac = document.createElement("DIV"); //če iskani glagol narobe napišemo ga popravi
			popravljenoPlac.setAttribute("id", "popravljenoPlac");
			popravljenoPlac.setAttribute("class", "popravljeno vecjiFont");
			document.getElementsByTagName("P")[0].appendChild(popravljenoPlac);
			var poprava = iskanje.split("");
			var popravljeno;

			for (var r = 0; r <= iskaniGlagol[0].length - 1; r++) //za vsako napako v besedi
			{
				poprava[iskaniGlagol[0][r]] = "<span>" + poprava[iskaniGlagol[0][r]] + "</span>";
			}
			popravljeno = poprava.join("");
			document.getElementById("popravljenoPlac").innerHTML = popravljeno;
			
			var v = [1, 1, 1]; //spremenljivke za vsako skupino glagolov //za naslove stolpcev
			var ll = [0, 5, 7]; //
			var kk = [4, 1, 1];
			
			for (var k = 0; k <= iskaniGlagol.length - 1; k++)
			{
				var n = mestoIskanegaGlagola[k][0]; //skupina glagolov

				if (v[n]) //izdelava naslovov
				{
					var tr = document.createElement("TR");
					tr.setAttribute("id", "nasloviStolpcev" + n);
					tr.setAttribute("class", "nasloviStolpcev");
					document.getElementById("tabela" + n).appendChild(tr);
					v[n] = 0;
					for (var l = 0; l <= kk[n]; l++)
					{
						var td = document.createElement("TD");
						document.getElementById("nasloviStolpcev" + n).appendChild(td);
						document.getElementById("nasloviStolpcev" + n).getElementsByTagName("TD")[l].innerHTML = imenaStolpcev[l + ll[n]];
					}
				}
				var tr = document.createElement("TR"); //nova vrstica za vse oblike glagola
				document.getElementById("tabela" + n).appendChild(tr);
				var stVrstic = document.getElementById("tabela" + n).getElementsByTagName("TR").length;
				for (var m = 0; m <= kk[n]; m++)
				{
					var td = document.createElement("TD");
					document.getElementById("tabela" + n).getElementsByTagName("TR")[stVrstic - 1].appendChild(td);

					if (vsiZadetki[k].includes(m)) //odebelji iskani glagol spanom
					{
						document.getElementById("tabela" + n).getElementsByTagName("TR")[stVrstic - 1].getElementsByTagName("TD")[m].innerHTML = "<span>" + vsiGlagoli[n][m][mestoIskanegaGlagola[k][2]][0] + "</span>";
					}
					else
					{
						document.getElementById("tabela" + n).getElementsByTagName("TR")[stVrstic - 1].getElementsByTagName("TD")[m].innerHTML = vsiGlagoli[n][m][mestoIskanegaGlagola[k][2]][0];
					}
				}
			}

			/*zgodovinaIskanja.push(vsiGlagoli[mestoIskanegaGlagola[0][0]][mestoIskanegaGlagola[0][1]][mestoIskanegaGlagola[0][2]][0]);
			document.getElementById("zgodovinaIskanja").innerHTML="Zgodovina iskanja:"; //napise zacetni stavek
			document.getElementById("napacniGlagoli").innerHTML = imenaStolpcev[] + ": " + zgodovinaIskanja[]; //izpis*/

            localStoragee();
			s = 1;
			break;
		
		case 1:
			document.getElementById("gumb").innerHTML = "Išči"; //spremeni gumb v Išči
            document.getElementById("iskaniGlagol").setAttribute("class", "input"); //znova se pojavi input
            document.getElementById("iskaniGlagol").focus() //fokusira se na vpisno okno
			document.getElementById("iskaniGlagol").value = ""; //izbrise kar je bilo prej napisano
			
			if (document.getElementById("popravljenoPlac") != undefined) //odstrani popravljeno, če obstaja
			{
				//document.getElementById("popravljenoPlac").remove(); //izbriše popravljeno //nedela v IE
				document.getElementById("popravljenoPlac").parentElement.removeChild(document.getElementById("popravljenoPlac"));
			}

			document.getElementById("gumb0").setAttribute("class", "");
			document.getElementById("gumb1").setAttribute("class", "");
			document.getElementById("gumb2").setAttribute("class", "");
			
			document.getElementById("tabela0").innerHTML = ""; //izbrišejo se rezultati iskanja
			document.getElementById("tabela1").innerHTML = "";
			document.getElementById("tabela2").innerHTML = "";

			s = 0;
			break;
	}
}

function reset()
{
	//localStorage.clear();
	zgodovinaIskanja = [];
	location.reload();
}

window.onload= onLoad;