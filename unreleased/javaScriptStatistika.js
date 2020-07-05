var vsiGlagoli = VsiGlagoli;
var isMobile = 0;

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
    /*if (isMobile)
    {
        Chart.defaults.global.aspectRatio = 1;
    }*/
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
        maintainAspectRatio: true,
        aspectRatio: 2,
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
                maintainAspectRatio: true,
                aspectRatio: 2,
                title: {
                    display: true,
                    text: "Statistika tvojih rezultatov: " + AD[r],
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
    if (isMobile)
    {
        chartNavadni.options.maintainAspectRatio = false;
        chartSich[0].options.maintainAspectRatio = false;
        chartSich[1].options.maintainAspectRatio = false;

        chartNavadni.update();
        chartSich[0].update();
        chartSich[1].update();
    }
    document.addEventListener("orientationchange", function() {
        chartNavadni.update();
        chartSich[0].update();
        chartSich[1].update();
    });
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
            var span = document.createElement("SPAN");
            if ((vsiTop[z][t] >= vsiGlagoli[1][0].length) && (z === 1)) //če je dativ
            {
                span.innerHTML = "<br>" + (t + 1) + ". " + vsiGlagoli[z + 1][0][vsiTop[z][t] - vsiGlagoli[1][0].length][0] + ": " + stPonavljanj[z][t];
                document.getElementById("lokalniLestvica").getElementsByTagName("TD")[z].appendChild(span);
            }
            else if (vsiTop[z].length !== 0) //če smo vadili to skupino glagolov
            {
                span.innerHTML = "<br>" + (t + 1) + ". " + vsiGlagoli[z][0][vsiTop[z][t]][0] + ": " + stPonavljanj[z][t];
                document.getElementById("lokalniLestvica").getElementsByTagName("TD")[z].appendChild(span);
            }
            
            span.onclick = function(){ //če se klikne na glagol
                var glagolvse = this.innerHTML;
                glagolvse = glagolvse.split(" ");
                glagolvse.shift(); //izbriše prvi element
                glagolvse.pop(); //izbriše zadnji element
                glagolvse[glagolvse.length - 1] = glagolvse[glagolvse.length - 1].replace(":", "") //izbriše se :
                var glagol = "";
                for (let p = 0; p <= glagolvse.length - 1; p++)
                {
                    glagol += glagolvse[p];
                    if (p !== glagolvse.length - 1)
                    {
                        glagol += " "; //doda se presledek če ni zaden element
                    }
                }
                localStorage.setItem("iskanje", JSON.stringify(glagol));
                window.location.replace("iskanje.html");
            };
        }
    }
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

function onLoad()
{
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	isMobile = true;
    }
    
    if(isMobile)
	{
		popUpImage();
	}

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
                    pravilniNavadni[t].push(JSON.parse(localStorage.getItem(datum + "_steviloGlagolovNavadni"))[t] - JSON.parse(localStorage.getItem(datum + "_napacniGlagoliNavadni"))[t].length);
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
                    pravilniSichAkk[t].push(JSON.parse(localStorage.getItem(datum + "_steviloGlagolovSich"))[0][t] - JSON.parse(localStorage.getItem(datum + "_napacniGlagoliSich"))[0][t].length);
                    steviloGlagolovSichAkk[t].push(JSON.parse(localStorage.getItem(datum + "_steviloGlagolovSich"))[0][t]);
        
                    pravilniSichDat[t].push(JSON.parse(localStorage.getItem(datum + "_steviloGlagolovSich"))[1][t] - JSON.parse(localStorage.getItem(datum + "_napacniGlagoliSich"))[1][t].length);
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