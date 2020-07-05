var vsiGlagoli = VsiGlagoli;

var datumi = [];
var napacniGlagoli = [];
var stGlagolov = [];

var imenaStolpcev = [["Slovenski prevod", "Infinitiv", "3. Person", "Präteritum", "Perfekt"], ["Slovenski prevod, Akkusativ", "Reflexive Verben, Akkusativ"], ["Slovenski prevod, Dativ", "Reflexive Verben, Dativ"]];

function onHover(id)
{
    idd = id.split(","); //dobi id spana
    o = Number(idd[0]); //id se splita med spremenljivke
    r = Number(idd[1]);
    z = Number(idd[2]);
    p = Number(idd[3])
    var b = 1;

    var table = document.createElement("TABLE"); //to kar se bo pojavilo
    var trNaslov = document.createElement("TR");
    var tr = document.createElement("TR");

    table.setAttribute("class", "tabela iskanje naSredini ksmsn");

    for (var u = 0; u <= vsiGlagoli[o].length - 1; u++) //za vsak stolpec
    {
        var tdNaslov = document.createElement("TD");
        var naslov = document.createTextNode(imenaStolpcev[o][u]);
        tdNaslov.appendChild(naslov);
        trNaslov.appendChild(tdNaslov);
        trNaslov.setAttribute("class", "nasloviStolpcev"); //naredi naslov

        var td = document.createElement("TD"); //naredi vse oblike glagola
        var vseOblike = document.createTextNode(vsiGlagoli[o][u][napacniGlagoli[p][o][r][z]][0]);
        if (u == r) //če je pravi stolpec ga wrapa v span da se lahko poudari
        {
            var span = document.createElement("SPAN");
            span.appendChild(vseOblike);
            td.appendChild(span);
        }
        else
        {
            td.appendChild(vseOblike);
        }
        tr.appendChild(td);
    }
    table.appendChild(trNaslov); //doda vrstice v tabelo
    table.appendChild(tr);
    document.getElementById(o + "," + r + "," + z + "," + p).appendChild(table); //tabela gre zraven glagola nad katerim je hover
    var visinaTabele = document.getElementById(o + "," + r + "," + z + "," + p).getElementsByTagName("TABLE")[0].offsetHeight; //dobi višino tabele in jo premakne nad hover glagolom
    table.style.setProperty("--visinaTabele", -(visinaTabele) - 31 + "px");
}

function onLoad()
{
    if (typeof(Storage) !== "undefined") //če lahko brskalnik ima local storage
	{
        for (var u = 0; u <= localStorage.length - 1; u++)
        {
            /*oblike
            var pravilniNavadni = [0, 0, 0, 0, 0];
            var steviloGlagolovNavadni = [0, 0, 0, 0, 0];
            var napacniGlagoliNavadni = [[], [], [], [], []];
            var pravilniSich = [[0, 0]];
            var steviloGlagolovSich = [[0, 0]];
            var napacniGlagoliSich = [[[], []], [[], []]];*/

            //if (localStorage.key(u) == "datumStatistika"){u++;} //če pride do piškotka za redirect pri statistiki

            var split = (localStorage.key(u)).split("_"); //2. del keyja je datum
            var datum = split[0];
            if (!datumi.includes(datum)) //če datum še ne obstaja
            {
                datumi.push(datum); //doda datum v datumi

                //za vsak datum določi vse parametre, če ne obstajajo je array prazen
                //var pravilniNavadni = JSON.parse(localStorage.getItem(datum + "_pravilniNavadni")) || [];
                var steviloGlagolovNavadni = JSON.parse(localStorage.getItem(datum + "_steviloGlagolovNavadni")) || [];
                var napacniGlagoliNavadni = JSON.parse(localStorage.getItem(datum + "_napacniGlagoliNavadni")) || [[], [], [], [], []];
                
                //var pravilniSich = JSON.parse(localStorage.getItem(datum + "_pravilniSich")) || [[], []];
                var steviloGlagolovSich = JSON.parse(localStorage.getItem(datum + "_steviloGlagolovSich")) || [[], []];
                var napacniGlagoliSich = JSON.parse(localStorage.getItem(datum + "_napacniGlagoliSich")) || [[[], []], [[], []]];

                napacniGlagoli.push([napacniGlagoliNavadni, napacniGlagoliSich[0], napacniGlagoliSich[1]]);
                //stGlagolov.push([[pravilniNavadni, steviloGlagolovNavadni], [pravilniSich[0], steviloGlagolovSich[0]], [pravilniSich[1], steviloGlagolovSich[1]]]);
                stGlagolov.push([steviloGlagolovNavadni, steviloGlagolovSich[0], steviloGlagolovSich[1]]);
            }
        }

        var localStorageSorting = [];
        for (var p = 0; p <= napacniGlagoli.length - 1; p++) //za vsak datum
        {
            var par = document.createElement("P");
            par.setAttribute("id", datumi[p]);

            var zacetek = document.createElement("P");
            var vsi = ["", "", ""];
            var skupineGl = ["Nemški nepravilni glagoli: ", "Povratni glagoli, Akkusativ: ", "Povratni glagoli, Dativ: "];

            for (var k = 0; k <= stGlagolov[p].length - 1; k++)
            {
                if (stGlagolov[p][k].length > 0)
                //if ((stGlagolov[p][k][1].indexOf(!0) > -1) && (stGlagolov[p][k][1].length > 0))
                {
                    var napacniSt = 0;
                    napacniGlagoli[p][k].forEach(function(el){napacniSt += el.length});
                    var vsiPravilni = stGlagolov[p][k].reduce(function(a, b){return (a + b);}) - napacniSt;
                    var vsiSteviloGlagolov = stGlagolov[p][k].reduce(function(a, b){return (a + b);});
                    var vsiProcenti = Math.round((vsiPravilni / vsiSteviloGlagolov) * 100);
                    vsi[k] = skupineGl[k] + "<span>" + vsiPravilni + "</span>" + " od " + "<span>" + vsiSteviloGlagolov + "</span>" + " oziroma " + "<span>" + vsiProcenti + "</span>" + "%" + "    ";
                }        
            }

            zacetek.innerHTML = "<span>" + datumi[p] + "</span>" + ": " + vsi;
            zacetek.setAttribute("class", "zacetek");
            par.appendChild(zacetek);

            //pripravi plac
            for (var o = 0; o <= napacniGlagoli[p].length - 1; o++) //za vsako skupino glagolov
            {
                var div = document.createElement("DIV");
                //div.setAttribute("id", o + "," + datumi[p]);
                var g = 0; //če preskoči stolpec ne naredi paragrapha, g = št. p-ja
                
                for (var r = 0; r <= napacniGlagoli[p][o].length - 1; r++) //za vsak stolpec
                {
                    if (napacniGlagoli[p][o][r].length == 0) {continue;} //preskoči stolpec če ni nobenega napačega glagola

                    var paragaph = document.createElement("P");
                    div.appendChild(paragaph);

                    div.getElementsByTagName("P")[g].innerHTML = "<span>" + imenaStolpcev[o][r] + ": " + "<span>" + (stGlagolov[p][o][r] - napacniGlagoli[p][o][r].length) + " od " + stGlagolov[p][o][r] + " oziroma " + Math.round((stGlagolov[p][o][r] - napacniGlagoli[p][o][r].length) * 100 / stGlagolov[p][o][r]) + "%" + "</span>" + "</span>";
                    div.getElementsByTagName("P")[g].getElementsByTagName("SPAN")[0].setAttribute("class", "nasloviStolpcev maliFont");
                    div.getElementsByTagName("P")[g].getElementsByTagName("SPAN")[0].getElementsByTagName("SPAN")[0].setAttribute("class", "statistikaStolpca");

                    for (var z = 0; z <= napacniGlagoli[p][o][r].length - 1; z++) //za vsak glagol določene oblike
                    {
                        var span = document.createElement("SPAN");
                        span.setAttribute("id", o + "," + r + "," + z + "," + p);
                        span.setAttribute("class", "napacniGlagol");

                        span.onmouseover = function() { //če z miško greš čes
                            onHover(this.id);
                        };
                        span.onmouseout = function() {
                            if (document.getElementsByTagName("TABLE")[0] != undefined) //ko gre miška dol z elementa tabela izgine
                            {
                                document.getElementsByTagName("TABLE")[0].remove();
                            }
                        };

                        var spanB = document.createTextNode(vsiGlagoli[o][r][napacniGlagoli[p][o][r][z]][0] + ", ");
                        span.appendChild(spanB);
                        div.getElementsByTagName("P")[g].appendChild(span);
                    }
                    g++; //če preskoči stolpec ne naredi paragrapha, g = št. p-ja
                }
                par.appendChild(div);
            }
            var cas = (new Date(Number(datumi[p].split(".")[2]), Number(datumi[p].split(".")[1]), Number(datumi[p].split(".")[0])).getTime()) / 100000; //cas predstavlja čas od datuma od 1970, deljeno z 100000, da se znabimo ničel
            localStorageSorting.push(cas);
            localStorageSorting.sort(function(a, b){return b - a}); //casi se razporedijo od najvecjega do najmanjsega
            var mesto = localStorageSorting.indexOf(cas);
            if (document.getElementById("vsiNapacniGlagoli").children.length = 0) //če ni še ničesar dodanega
            {
                document.getElementById("vsiNapacniGlagoli").appendChild(par);
            }
            else
            {
                (document.getElementById("vsiNapacniGlagoli")).insertBefore(par, (document.getElementById("vsiNapacniGlagoli")).children[mesto]); //paragraph doda na ustrezno mesto, glede na njegovo velikost
            }
        }
    }
}

function reset()
{
	localStorage.clear();
	location.reload();
}

window.onload= onLoad;