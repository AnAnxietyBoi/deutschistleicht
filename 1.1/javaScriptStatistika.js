var vsiGlagoli = VsiGlagoli;

var pravilniNavadni = [[], [], [], [], []];
var steviloGlagolovNavadni = [[], [], [], [], []];

var pravilniSichAkk = [[], []];
var steviloGlagolovSichAkk = [[], []];

var pravilniSichDat = [[], []];
var steviloGlagolovSichDat = [[], []];

var datumi = []; //vsi datumi ko smo vadili katero koli skupino glagolov
var datumiNav = []; //datumi ko smo vadili to skupino glagolov
var datumiSich = [];

var napacniGlagoli = [];
//var stGlagolov = [];

var vsiPravilni = [[], [], []];
var vsiStGlagolov = [[], [], []];

var chartNavadni;
var hidden01 = 0;

var imenaStolpcev = [["Slovenski prevod", "Infinitiv", "3. Person", "Präteritum", "Perfekt"], ["Slovenski prevod, Akkusativ", "Reflexive Verben, Akkusativ", "Slovenski prevod, Dativ", "Reflexive Verben, Dativ"]];

function array_move(arr, old_index, new_index)
{
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
}

function Charts()
{
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontSize = 20;
    Chart.scaleService.updateScaleDefaults('linear', { //najmanj je 0
        ticks: {
            min: 0
        }
    });
    /*Chart.defaults.global.legend.onClick = function(e, legendItem) {
        var index = legendItem.datasetIndex;
        var ci = this.chart;
        var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

        ci.data.datasets.forEach(function(e, i) {
        var meta = ci.getDatasetMeta(i);

        if (i !== index) {
            if (!alreadyHidden) {
            meta.hidden = meta.hidden === null ? !meta.hidden : null;
            } else if (meta.hidden === null) {
            meta.hidden = true;
            }
        } else if (i === index) {
            meta.hidden = null;
        }
        });

        ci.update();
    };*/

    var lokalnoNavadni = document.getElementById("lokalniNavadni").getContext('2d');
    var config = {
    type: 'line',

    data: {
        labels: datumiNav,

        datasets: [{
            label: 'Skupni seštevek',
            data: vsiStGlagolov[0],
            borderColor: "rgba(0, 0, 0, 1)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            fill: 'false',
            pointRadius: 5,
            hidden: false,
        }, {
            label: 'Pravilni Skupni seštevek',
            data: vsiPravilni[0],
            fill: 'start',
            borderColor: "rgba(0, 0, 0, 1)",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            pointRadius: 5,
        }],
    },
    options: {
        title: {
            display: true,
            text: "Statistika tvojih rezultatov: Nemški nepravilni glagoli",
            fontSize: 50,
            /*layout: {
            padding: {
                left: 2600,
                top: 0,
                right: 0,
                bottom: 0,
            }},*/
        },
        onHover: function(event, legendItem) { //če ni več nad legendo
            document.getElementById("lokalniNavadni").style.cursor = 'auto';
        },
        legend: {
            onHover: function(event, legendItem) {
                document.getElementById("lokalniNavadni").style.cursor = 'pointer';
            },
            onClick: function(e, legendItem) {//ta funkcija naredi obratno kot v originalu, torej ob kliku izginejo vsi razen kliknjenega, dodan je še njegov par
                var index = legendItem.datasetIndex;
                var drugiPar = [1,0,3,2,5,4,7,6,9,8,11,10].indexOf(index);
                var ci = this.chart;
                var alreadyHidden = ((ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden) && ((ci.getDatasetMeta(drugiPar).hidden === null) ? false : ci.getDatasetMeta(drugiPar).hidden);
    
                if (hidden01)
                {
                    odstraniSkupniSestevek(0);
                }

                ci.data.datasets.forEach(function(e, i) {
                var meta = ci.getDatasetMeta(i);

                if ((i !== index) && (i !== drugiPar)) {
                    if (!alreadyHidden) {
                    meta.hidden = meta.hidden === null ? !meta.hidden : null;
                    } else if (meta.hidden === null) {
                    meta.hidden = true;
                    }
                } else if ((i === index) || (i === drugiPar)) {
                    meta.hidden = null;
                }
                });
    
                ci.update();
            },
        }
       /* scales: {
            yAxes: [{
                stacked: true
            }]
        }
        plugins: {
            filler: {
                propagate: true
            }
        }*/
    }};

    chartNavadni = new Chart(lokalnoNavadni, config);

    var barve = ["0, 255, 255", "0, 255, 0", "255, 153, 0", "255, 0, 0", "0, 0, 255"];
    for (var z = 0; z <= 4; z++)
    {
        var lokalnoNavadniDataset1 = {
            label: imenaStolpcev[0][z],
            data: steviloGlagolovNavadni[z],
            borderColor: "rgba(" + barve[z] + ", 1)",
            backgroundColor: "rgba(" + barve[z] + ", 0.5)",
            /*pointHoverBorderColor: "rgba(0, 0, 0, 1)",
            pointHoverBackgroundColor: "rgba(0, 0, 0, 1)",*/
            fill: 'false',
            pointRadius: 5,
        };

        var lokalnoNavadniDataset2 = {
            label: 'Pravilni ' + imenaStolpcev[0][z],
            data: pravilniNavadni[z],
            borderColor: "rgba(" + barve[z] + ", 1)",
            backgroundColor: "rgba(" + barve[z] + ", 0.2)",
            fill: 'start',
            pointRadius: 5,
        };

        config.data.datasets.push(lokalnoNavadniDataset1);
        config.data.datasets.push(lokalnoNavadniDataset2);
    }
    chartNavadni.update();

    var lokalnoSich = [document.getElementById("lokalniSich0").getContext('2d'), document.getElementById("lokalniSich1").getContext('2d')];
    var chartSich = [];
    var AD = ["Akkusativ", "Dativ"]

    for (var r = 0; r <= 1; r++)
    {
        chartSich[r] = new Chart(lokalnoSich[r], {
            type: 'line',
            data: {
                labels: datumiSich,

                datasets: [{
                    label: AD[r],
                    data: vsiStGlagolov[1 + r],
                    borderColor: "rgba(255, 153, 0, 1)",
                    backgroundColor: "rgba(255, 153, 0, 0.5)",
                    fill: 'false',
                    pointRadius: 5,
                }, {
                    label: 'Pravilni ' + AD[r],
                    data: vsiPravilni[1 + r],
                    fill: 'start',
                    borderColor: "rgba(255, 153, 0, 1)",
                    backgroundColor: "rgba(255, 153, 0, 0.2)",
                    pointRadius: 5,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Statistika tvojih rezultatov: Povratni glagoli v " + (4-r) + ". sklonu",
                    fontSize: 30,
                },
                onHover: function(event, legendItem) { //če ni več nad legendo
                    document.getElementById("lokalniSich0").style.cursor = 'auto';
                    document.getElementById("lokalniSich1").style.cursor = 'auto';
                },
                legend: {
                    onHover: function(event, legendItem) {
                        document.getElementById("lokalniSich0").style.cursor = 'pointer';
                        document.getElementById("lokalniSich1").style.cursor = 'pointer';
                    },
                    onClick: function(e, legendItem) {
                        var index = legendItem.datasetIndex;
                        var ci = this.chart;
                        var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
                
                        ci.data.datasets.forEach(function(e, i) {
                            var meta = ci.getDatasetMeta(i);
                
                            if (i !== index) {
                            if (!alreadyHidden) {
                                meta.hidden = meta.hidden === null ? !meta.hidden : null;
                            } else if (meta.hidden === null) {
                                meta.hidden = true;
                            }
                            } else if (i === index) {
                            meta.hidden = null;
                            }
                        });
                
                        ci.update();
                    },
                }
            }
        });
    }
}

function Najvec()
{
    var vsiSkupaj = [[[], [], [], [], []], [[], [], [], []]]; //na prvem mestu (ne arrayu) pravilni na drugem st na tretjem procenti vsakega stolpca
    for (let t = 0; t <= steviloGlagolovNavadni.length - 1; t++)
    {
        vsiSkupaj[0][t].push(pravilniNavadni[t].reduce((a, b) => a + b, 0));
        vsiSkupaj[0][t].push(steviloGlagolovNavadni[t].reduce((a, b) => a + b, 0));
    }
    for (let t = 0; t <= steviloGlagolovSichAkk.length - 1; t++)
    {
        vsiSkupaj[1][t].push(pravilniSichAkk[t].reduce((a, b) => a + b, 0));
        vsiSkupaj[1][t].push(steviloGlagolovSichAkk[t].reduce((a, b) => a + b, 0));
        vsiSkupaj[1][t + 2].push(pravilniSichDat[t].reduce((a, b) => a + b, 0));
        vsiSkupaj[1][t + 2].push(steviloGlagolovSichDat[t].reduce((a, b) => a + b, 0));
    }

    for (let r = 0; r <= vsiSkupaj.length - 1; r++)
    {
        for (let t = 0; t <= vsiSkupaj[r].length - 1; t++)
        {
            vsiSkupaj[r][t].push(Math.round(vsiSkupaj[r][t][0] / vsiSkupaj[r][t][1] * 100)); //pusha se procente
        }
    }

    var imenaSkupin = ["Nemški nepravilni glagoli: ", "Povratni glagoli: "];
    for (let r = 0; r <= 1; r++) //samo 2x ponovi za obe skupini glagolov
    {
        var td = document.createElement("TD");
        var divNotranji = document.createElement("DIV");
        var prvic = 1;
        for (let o = 0; o <= vsiSkupaj[r].length - 1; o++)
        {
            var br = document.createElement("BR");
            if (!prvic)
            {
                divNotranji.appendChild(br);
            }
            prvic = 0;
            divNotranji.innerHTML += imenaStolpcev[r][o] + ": " + "<span>" + vsiSkupaj[r][o][0] + "</span>" + " od " + "<span>" + vsiSkupaj[r][o][1] + "</span>" + " oziroma " + "<span>" + vsiSkupaj[r][o][2] + "%" + "</span>";
        }
        td.innerHTML += imenaSkupin[r] + "<span>" + vsiSkupaj[r].reduce(function(sum, el){return sum + el[0]}, 0) + "</span>" + " od " + "<span>" + vsiSkupaj[r].reduce(function(sum, el){return sum + el[1]}, 0) + "</span>" + " oziroma " + "<span>" + Math.round(vsiSkupaj[r].reduce(function(sum, el){return sum + el[0]}, 0) /  vsiSkupaj[r].reduce(function(sum, el){return sum + el[1]}, 0) * 100) + "%" + "</span>";
        td.appendChild(divNotranji);
        document.getElementById("lokalniNajvec").getElementsByTagName("TABLE")[0].getElementsByTagName("TR")[0].appendChild(td);
    }

    //top 10 lestvice
    var vsiTop = [[], [], []];
    for (let t = 0; t <= napacniGlagoli.length - 1; t++)
    {
        /*if (napacniGlagoli[t].length === 0)
        {
            continue;
        }*/

        for (let g = 0; g <= 2; g++)
        {
            if (napacniGlagoli[t][g].length !== 0)
            {
                vsiTop[g].push([].concat.apply([], napacniGlagoli[t][g])); //da so v enem arrayu samo navadni in odstranjo se notranji oklepaji v arrayu 
            }
        }
    }

    for (let u = 0; u <= vsiTop[2].length - 1; u++)
    {
        for (let o = 0; o <= vsiTop[2][u].length - 1; o++)
        {
            vsiTop[2][u][o] += vsiGlagoli[1][0].length; //vsakemu dativ glagolu prišteje št akk glagolov, da bo kasneje razvido kateri so akk kateri pa dativ
        }
        vsiTop[1].push(vsiTop[2][u]); //akk in dat se združita
    }
    vsiTop.pop(); //izbriše dat

    var stPonavljanj = [[], []];
    for (var z = 0; z <= 1; z++)
    {
        vsiTop[z] = vsiTop[z].filter(function (el) { //če ni dativov
            return el.length != 0;
        });

        vsiTop[z] = ([].concat.apply([], vsiTop[z])).sort((a, b) => a - b); //znebi se še enih oklepajov in številke sortira po naraščajočem da so iste številke skupaj
        for (let t = 0; t <= vsiTop[z].length - 1; t++)
        {
            if (vsiTop[z][t] == vsiTop[z][t - 1])
            {
                stPonavljanj[z][stPonavljanj[z].length - 1]++; //dobi zaden element in mu prišteje 1
            }
            else
            {
                stPonavljanj[z].push(1);
            }
        }
        vsiTop[z] = [...new Set(vsiTop[z])]; //znebimo se dvojnikov

        for (let t = 0; t <= stPonavljanj[z].length - 1; t++) //sortiranje
        {
            var sortirano = stPonavljanj[z].sort((a, b) => b - a);
            array_move(vsiTop[z], vsiTop[z].indexOf(vsiTop[z][t]), sortirano.indexOf(vsiTop[z][t]));
        }

        var st = 9;
        if (vsiTop[z].length <= 9) //če je manj kot 10 različnih glagolov v skupini
        {
            st = vsiTop[z].length - 1;
        }

        for (let t = 0; t <= st; t++) //izpisovanje
        {
            if ((vsiTop[z][t] >= vsiGlagoli[1][0].length) && (z === 1)) //če je dativ
            {
                document.getElementById("lokalniLestvica").getElementsByTagName("TD")[z].innerHTML += "<br>" + (t + 1) + ". " + vsiGlagoli[z + 1][0][vsiTop[z][t] - vsiGlagoli[1][0].length][0] + ": " + stPonavljanj[z][t];
            }
            else if (vsiTop[z].length !== 0) //če smo vadili to skupino glagolov
            {
                document.getElementById("lokalniLestvica").getElementsByTagName("TD")[z].innerHTML += "<br>" + (t + 1) + ". " + vsiGlagoli[z][0][vsiTop[z][t]][0] + ": " + stPonavljanj[z][t];
            }
        }
    }
}

function onLoad()
{
    for (var u = 0; u <= localStorage.length - 1; u++)
    {
        var split = (localStorage.key(u)).split("_"); //2. del keyja je datum
        var datum = split[0];
        if (!datumi.includes(datum)) //če datum še ne obstaja
        {
            datumi.push(datum); //doda datum v datumi

            /*oblike
            var pravilniNavadni = [0, 0, 0, 0, 0];
            var steviloGlagolovNavadni = [0, 0, 0, 0, 0];
            var napacniGlagoliNavadni = [[], [], [], [], []];
            var pravilniSich = [[0, 0], [0, 0]];
            var steviloGlagolovSich = [[0, 0], [0, 0]]; //prvi za akk drugi za dativ
            var napacniGlagoliSich = [[[], []], [[], []]];*/

            //za vsak datum določi vse parametre, če ne obstajajo je array prazen

            var napacniGlagoliNavadni = [];
            if (localStorage.getItem(datum + "_steviloGlagolovNavadni")) //če smo vadili te skupine galgolov
            {
                datumiNav.push(datum);
                for (let t = 0; t <= 4; t++)
                {   
                    pravilniNavadni[t].push(JSON.parse(localStorage.getItem(datum + "_pravilniNavadni"))[t]);
                    steviloGlagolovNavadni[t].push(JSON.parse(localStorage.getItem(datum + "_steviloGlagolovNavadni"))[t]);
                }
                napacniGlagoliNavadni = JSON.parse(localStorage.getItem(datum + "_napacniGlagoliNavadni"))
            }
            
            var napacniGlagoliSich = [[], []];
            if (localStorage.getItem(datum + "_steviloGlagolovSich")) //če smo vadili te skupine galgolov
            {
                datumiSich.push(datum);
                for (let t = 0; t <= 1; t++)
                {

                    pravilniSichAkk[t].push(JSON.parse(localStorage.getItem(datum + "_pravilniSich"))[0][t]);
                    steviloGlagolovSichAkk[t].push(JSON.parse(localStorage.getItem(datum + "_steviloGlagolovSich"))[0][t]);
        
                    pravilniSichDat[t].push(JSON.parse(localStorage.getItem(datum + "_pravilniSich"))[1][t]);
                    steviloGlagolovSichDat[t].push(JSON.parse(localStorage.getItem(datum + "_steviloGlagolovSich"))[1][t]);
                }
                napacniGlagoliSich = JSON.parse(localStorage.getItem(datum + "_napacniGlagoliSich"));
            }   

            /*var pravilniNavadni = JSON.parse(localStorage.getItem(datum + "_pravilniNavadni")) || [];
            var steviloGlagolovNavadni = JSON.parse(localStorage.getItem(datum + "_steviloGlagolovNavadni")) || [];
            var napacniGlagoliNavadni = JSON.parse(localStorage.getItem(datum + "_napacniGlagoliNavadni")) || [[], [], [], [], []];
            
            var pravilniSich = JSON.parse(localStorage.getItem(datum + "_pravilniSich")) || [[], []];
            var steviloGlagolovSich = JSON.parse(localStorage.getItem(datum + "_steviloGlagolovSich")) || [[], []];
            var napacniGlagoliSich = JSON.parse(localStorage.getItem(datum + "_napacniGlagoliSich")) || [[[], []], [[], []]];*/

            napacniGlagoli.push([napacniGlagoliNavadni, napacniGlagoliSich[0], napacniGlagoliSich[1]]);
            //stGlagolov.push([[pravilniNavadni, steviloGlagolovNavadni], [pravilniSich[0], steviloGlagolovSich[0]], [pravilniSich[1], steviloGlagolovSich[1]]]);
        }
    }

    /*pravilniNavadni.forEach(function(el){pravilniNavadni.reduce((a, b) => a + b, 0)
        vsi[pravilniNavadni.indexOf(el)] = el.reduce((a, b) => a + b, 0)
    });*/

    //sortiranje
    var localStorageSorting = [];
    for (let p = 0; p <= datumi.length - 1; p++) //za vsak datum
    {
        var cas = (new Date(Number(datumi[p].split(".")[2]), Number(datumi[p].split(".")[1]), Number(datumi[p].split(".")[0])).getTime()) / 100000; //cas predstavlja čas od datuma od 1970, deljeno z 100000, da se znabimo ničel
        localStorageSorting.push(cas);
        localStorageSorting.sort(function(a, b){return a - b}); //casi se razporedijo od najmanjsega do najvecjega
        var mesto = localStorageSorting.indexOf(cas);
    
        array_move(datumi, p, mesto);
        array_move(napacniGlagoli, p, mesto);
        //array_move(stGlagolov, p, mesto);
    }

    var localStorageSorting = [];
    for (let p = 0; p <= datumiNav.length - 1; p++) //za vsak datum
    {
        var cas = (new Date(Number(datumiNav[p].split(".")[2]), Number(datumiNav[p].split(".")[1]), Number(datumiNav[p].split(".")[0])).getTime()) / 100000; //cas predstavlja čas od datuma od 1970, deljeno z 100000, da se znabimo ničel
        localStorageSorting.push(cas);
        localStorageSorting.sort(function(a, b){return a - b}); //casi se razporedijo od najmanjsega do najvecjega
        var mesto = localStorageSorting.indexOf(cas);
    
        array_move(datumiNav, p, mesto);
        
        for (let t = 0; t <= 4; t++)
        {
            array_move(pravilniNavadni[t], p, mesto);
            array_move(steviloGlagolovNavadni[t], p, mesto);
        }
    }

    var localStorageSorting = [];
    for (let p = 0; p <= datumiSich.length - 1; p++) //za vsak datum
    {
        var cas = (new Date(Number(datumiSich[p].split(".")[2]), Number(datumiSich[p].split(".")[1]), Number(datumiSich[p].split(".")[0])).getTime()) / 100000; //cas predstavlja čas od datuma od 1970, deljeno z 100000, da se znabimo ničel
        localStorageSorting.push(cas);
        localStorageSorting.sort(function(a, b){return a - b}); //casi se razporedijo od najmanjsega do najvecjega
        var mesto = localStorageSorting.indexOf(cas);
    
        array_move(datumiSich, p, mesto);

        for (let t = 0; t <= 1; t++)
        {
            array_move(pravilniSichAkk[t], p, mesto);
            array_move(steviloGlagolovSichAkk[t], p, mesto);
            array_move(pravilniSichDat[t], p, mesto);
            array_move(steviloGlagolovSichDat[t], p, mesto);
        }
    }

    for (let o = 0; o <= datumi.length - 1; o++)
    {
        vsiPravilni[0].push(pravilniNavadni.reduce(function(sum, el){return sum + el[o]}, 0));
        vsiPravilni[1].push(pravilniSichAkk.reduce(function(sum, el){return sum + el[o]}, 0));
        vsiPravilni[2].push(pravilniSichDat.reduce(function(sum, el){return sum + el[o]}, 0));

        vsiStGlagolov[0].push(steviloGlagolovNavadni.reduce(function(sum, el){return sum + el[o]}, 0));
        vsiStGlagolov[1].push(steviloGlagolovSichAkk.reduce(function(sum, el){return sum + el[o]}, 0));
        vsiStGlagolov[2].push(steviloGlagolovSichDat.reduce(function(sum, el){return sum + el[o]}, 0));
    }

    Najvec();
    Charts();

    /*for (var o = 0; o <= 1; o++)
    {
        if (typeof(Storage) !== "undefined") //če lahko brskalnik ima local storage
        {

        }
    }*/
}

function odstraniSkupniSestevek(r)
{
    var ci = chartNavadni;  
    var meta = ci.getDatasetMeta(0);
    var meta2 = ci.getDatasetMeta(1);
    var alreadyHidden = ((ci.getDatasetMeta(0).hidden === null) ? false : ci.getDatasetMeta(0).hidden);

    
    if (!alreadyHidden) //da izgine
    {
        meta.hidden = true;
        meta2.hidden = true;
        hidden01 = 1;
        document.getElementById("odstraniSkupniSestevek").innerText = "Prikaži Skupni Seštevek";
    }
    else
    {
        meta.hidden = null;
        meta2.hidden = null;
        hidden01 = 0;
        document.getElementById("odstraniSkupniSestevek").innerText = "Skrij Skupni Seštevek";
    }
    ci.update();
}

function reset()
{
	localStorage.clear();
	location.reload();
}

window.onload= onLoad;