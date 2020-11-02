document.addEventListener('DOMContentLoaded', init, false);

function init() {
    plotSummer();
    plotYear();
    piechart();
    plotYearChart()
    visi();
    salesPromise = loadJSON('./data/top20CA.json');
    salesPromise.then(function (sales) {
        console.log(sales)
        plotMap(sales);
	});
}

function piechart(){
	Highcharts.chart('baby', {
		chart: {
			type: 'pie'
		},
		title: {
            text: 'Causes of fires Breakdown',
            style: {
                fontSize: '25px',
            },
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
			point: {
			valueSuffix: '%'
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
            verticalAlign: 'top',
            itemMarginTop: 12,
			},
		plotOptions: {
			pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: true,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				color :"grey"
			}}
		},
		credits: {
			enabled: false
		},
		series: [{
			name: 'Proportion',
			colorByPoint: true,
			data: [{
			name: "Under Investigation",
			y: 5,
			color:"#003f5c"
			}, {
			name: 'Powerline',
			y:20,
			color:"#444e86"
            },
            {
                name: "Human",
                y: 35,
                color:"#bc5090"
                },
                {
                    name: "Lightning",
                    y: 35,
                    color:"#ff6361"
                    },
                    {
                        name: "Undetermine",
                        y: 5,
                        color:"#ffa600"
                        },],
			showInLegend:true,
			plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
				enabled: false
				},
				showInLegend: true
			}
			}
		}]
			  })
		
}

function plotYearChart(){
    // Create the chart
    yearChart = Highcharts.chart('yearChart', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Timeline of the largest 20 fires: How many acres are burned?',
            style: {
                fontSize: '25px',
            },
        },
        subtitle: {
            text: 'Note: This plot only includes 20 fires. There are more smaller fires not recorded here.',
            style: {
                fontSize: '15px',
            },
        },
        yAxis: {
            title: {
                text: 'Area Destroyed in Acres'
            },
            style:{
                fontSize: 'large'
            }
        },
        series: [{
            name: 'Acres destroyed',
            data: [[1932, 220000], [1970, 175425], [1977, 177866], [1987, 145980], [1999, 140948], [2002, 150696], [2003, 273246], [2006, 162702], [2007, 240207], [2007, 197990], [2008, 192038], [2008, 162818], [2009, 160557], [2012, 271911], [2013, 257314], [2015, 151623], [2017, 281893], [2018, 459123], [2018, 229651], [2018, 153336]],
            lineWidth: 0,
            marker: {
                enabled: true,
                radius: 5,
                fillColor: 'red',
                symbol: 'triangle'
            },
            tooltip: {
                valueDecimals: 2
            },
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            },
            dataLabels: {
                enabled: true
            },

        }],
    });

}

function Month_name(month){
    var months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September',
        'October', 'November', 'December'
        ];
        var answer = months.indexOf(month)+1
        if (answer <10){
            return '0'+(months.indexOf(month)+1)
        }else{
            return months.indexOf(month)+1
        }
    

}


function visi(){
    document.getElementById("botton1").style.visibility="hidden";
    document.getElementById("botton2").style.visibility="hidden";
    document.getElementById("botton3").style.visibility="hidden";
    
}

function clear(){
    document.getElementById("compare1").style.visibility="";
    document.getElementById("compare2").style.visibility="";
    document.getElementById("compare3").style.visibility="";
    
}


function checkfire_city(city,sales){
    var city_name = []
    var acres = []
    var date = []
    var structures = []
    var fire_name = []
    for(var i = 0; i< sales.length;i++){
        if (sales[i].county.includes(city)){
            fire_name.push(sales[i].fire_name)
            acres.push(sales[i].acres)
            structures.push(sales[i].structures)
            date.push(Month_name(sales[i].month)+'/'+sales[i].year)
        }
    }
    var acres1 = ''
    var date1 = ''
    var structures1 = ''
    var fire_name1 = ''
    var compare1 = 0
    var compare2 = 0
    var compare3 = 0
    visi()
    if (acres.length ==2){
        fire_name1 = fire_name.join("<br>");
        for (var i = 0 ; i<acres.length;i++){
             structures1 += structures[i]+'<br>'
             date1 += date[i]+'<br>'
             acres1 += acres[i]+'<br>'
        }
        document.getElementById("botton3").style.visibility="visible";
        document.getElementById("botton1").style.visibility="visible";
        document.getElementById('picfirename').innerHTML = " " + fire_name[0]
        compare1 = (acres[0]/1.76).toFixed(0)
        compare2 = (acres[0]/1976.00).toFixed(0)
        compare3 = (acres[0]/30000.00).toFixed(2)
        document.getElementById('compare1').innerHTML = compare1 + "\xa0\xa0"
        document.getElementById('compare2').innerHTML = compare2 + "\xa0\xa0"
        document.getElementById('compare3').innerHTML = compare3 + "\xa0\xa0"
        document.getElementById('botton3').innerHTML = fire_name[0]
        document.getElementById('botton1').innerHTML = fire_name[1]
        document.getElementById('botton3').onclick = function(){
            clear()
            var var11,var12,var13
            var11 = (acres[0]/1.32).toFixed(0)
            var12 = (acres[0]/1976.00).toFixed(0)
            var13 = (acres[0]/30000.00).toFixed(2)
            document.getElementById('picfirename').innerHTML = " " + fire_name[0]
            document.getElementById('compare1').innerHTML = var11 + "\xa0\xa0"
            document.getElementById('compare2').innerHTML = var12 + "\xa0\xa0"
            document.getElementById('compare3').innerHTML = var13 + "\xa0\xa0"
        }
        document.getElementById('botton1').onclick = function(){
            clear()
            var var21,var22,var23
            var21 = (acres[1]/1.32).toFixed(0)
            var22 = (acres[1]/1976.00).toFixed(0)
            var23 = (acres[1]/30000.00).toFixed(2)
            document.getElementById('picfirename').innerHTML = " " + fire_name[1]
            document.getElementById('compare1').innerHTML = var21 + "\xa0\xa0&"
            document.getElementById('compare2').innerHTML = var22 + "\xa0\xa0&"
            document.getElementById('compare3').innerHTML = var23 + "\xa0\xa0&"
        } 
        document.getElementById('fire_name').innerHTML = fire_name1
        document.getElementById('time').innerHTML = date1
        document.getElementById('acres').innerHTML = acres1
        document.getElementById('structure').innerHTML = structures1
    }else if(acres.length==3){
        fire_name1 = fire_name.join("<br>");
        for (var i = 0 ; i<acres.length;i++){
             structures1 += structures[i]+'<br>'
             date1 += date[i]+'<br>'
             acres1 += acres[i]+'<br>'
        }
        document.getElementById("botton3").style.visibility="visible";
        document.getElementById("botton1").style.visibility="visible";
        document.getElementById("botton2").style.visibility="visible";
        document.getElementById('picfirename').innerHTML = " " + fire_name[0]
        compare1 = (acres[0]/1.32).toFixed(0)
        compare2 = (acres[0]/1976.00).toFixed(0)
        compare3 = (acres[0]/30000.00).toFixed(2)
        document.getElementById('compare1').innerHTML = compare1 + " \xa0\xa0"
        document.getElementById('compare2').innerHTML = compare2 + " \xa0\xa0"
        document.getElementById('compare3').innerHTML = compare3 + " \xa0\xa0"
        document.getElementById('botton3').innerHTML = fire_name[0]
        document.getElementById('botton1').innerHTML = fire_name[1]
        document.getElementById('botton2').innerHTML = fire_name[2]
        document.getElementById('botton3').onclick = function(){
            clear()
            var var11,var12,var13
            var11 = (acres[0]/1.32).toFixed(0)
            var12 = (acres[0]/1976.00).toFixed(0)
            var13 = (acres[0]/30000.00).toFixed(2)
            document.getElementById('picfirename').innerHTML = " " + fire_name[0]
            document.getElementById('compare1').innerHTML = var11 + " \xa0\xa0&"
            document.getElementById('compare2').innerHTML = var12 + " \xa0\xa0&"
            document.getElementById('compare3').innerHTML = var13 + " \xa0\xa0&"
        }
        document.getElementById('botton1').onclick = function(){
            clear()
            var var21,var22,var23
            var21 = (acres[1]/1.32).toFixed(0)
            var22 = (acres[1]/1976.00).toFixed(0)
            var23 = (acres[1]/30000.00).toFixed(2)
            document.getElementById('picfirename').innerHTML = " " + fire_name[1]
            document.getElementById('compare1').innerHTML = var21 + " \xa0\xa0&"
            document.getElementById('compare2').innerHTML = var22 + " \xa0\xa0&"
            document.getElementById('compare3').innerHTML = var23 + " \xa0\xa0&"
        } 
        document.getElementById('botton2').onclick = function(){
            clear()
            var var21,var22,var23
            var21 = (acres[2]/1.32).toFixed(0)
            var22 = (acres[2]/1976.00).toFixed(0)
            var23 = (acres[2]/30000.00).toFixed(2)
            document.getElementById('picfirename').innerHTML = " " + fire_name[2]
            document.getElementById('compare1').innerHTML = var21 + " \xa0\xa0"
            document.getElementById('compare2').innerHTML = var22 + "\xa0\xa0"
            document.getElementById('compare3').innerHTML = var23 + " \xa0\xa0 "
        } 
        document.getElementById('fire_name').innerHTML = fire_name1
        document.getElementById('time').innerHTML = date1
        document.getElementById('acres').innerHTML = acres1
        document.getElementById('structure').innerHTML = structures1
    }
    else{
    document.getElementById('picfirename').innerHTML = " " + fire_name[0]
    compare1 = (acres[0]/1.32).toFixed(0)
    compare2 = (acres[0]/1976.00).toFixed(0)
    compare3 = (acres[0]/30000.00).toFixed(2)
    document.getElementById('fire_name').innerHTML = fire_name[0]
    document.getElementById('time').innerHTML = date[0]
    document.getElementById('acres').innerHTML = acres[0]
    document.getElementById('structure').innerHTML = structures[0]
    document.getElementById('compare1').innerHTML = compare1 + "\xa0\xa0"
    document.getElementById('compare2').innerHTML = compare2 + " \xa0\xa0"
    document.getElementById('compare3').innerHTML = compare3 + " \xa0\xa0"
    }
    document.getElementById('ice').innerHTML = ' ' + city
}

async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json();
	return dataset;
}


function plotMap(sales) {
    var data = [
        ['us-ca-011', 1],
        ['us-ca-033', 1],
        ['us-ca-045', 1],
        ['us-ca-021', 1],
        ['us-ca-083', 2],
        ['us-ca-111', 2],
        ['us-ca-073', 3],
        ['us-ca-035', 4],
        ['us-ca-109', 5],
        ['us-ca-089', 6],
        ['us-ca-105', 6],

        ['us-ca-093', 10],
        ['us-ca-053', 11],

        ['us-ca-037', 15],
        ['us-ca-007', 16],
        ['us-ca-019', 17],
        ['us-ca-107', 18],
    ];
    
    // Create the chart
    Highcharts.mapChart('myMap', {
        chart: {
            map: 'countries/us/us-ca-all',
            height: 500
        },
        title: {
            text: 'Fire Intensity of Each County for the Largest 20 Fires'
        },
        subtitle: {
            text: 'Click on the county to check the fire stats'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        colorAxis: {
            min: 1,
            max: 12,
            type: 'logarithmic',
            minColor: '#ff1d0d',
            maxColor: '#ffd78c',

        },
        series: [{
            data: data,
            name: 'Fire Intensity Ranked by Acres Destroyed',
            color: '#ceffc9',
            states: {
                hover: {
                    color: '#853e3e'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }],
        plotOptions: {
			series: {
				 point: {
					 events: {
						click: function(e) {
                            country = this.name
                            checkfire_city(country,sales);
                            this.description = 'aaa'
					 }
					}}}},
    });
    
}

function chadHTML(){
    document.getElementById();
}

function plotPie(continent){
    let d_total = 0
	let w_total = 0
    let sales = sale_data[continent];
	for (const datum of sales) {
		d_total += parseInt(datum['Dingus']);
        w_total += parseInt(datum['Widget']);
    }
    let pie = Highcharts.chart('totalSalesChart', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Total Sales: Dingus vs Widget'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true,
            }
        },
        series: [{
            name: 'Proportion',
            colorByPoint: true,
            data: [{
                name: 'Dingus',
                y: d_total,
            }, {
                name: 'Widget',
                y: w_total,
            },
        ],
        dataLabels: {
            color: 'white',
            distance: -60,
            size: "1px",
        }
        }],
        colors: ['#6189ed', '#ed6161'],
    })
}




function plotSummer(){
    Highcharts.chart('summerTemp', {
        chart: {
            zoomType: 'x',
        },
        title: {
            text: 'Average Summer Temperatures of California (1900 - 2012)'
        },
        subtitle: {
            text: 'click and drag in the plot area to zoom in'
        },
        yAxis: {
            title: {
                text:  'Temperature (°C)'
            },
            min: 20.7,
            tickInterval: 0.3,
            max: 24.3
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            },
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#f7480f'],
                        [1, Highcharts.color('#f7480f').setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            color: '#f58f2f',
            name: 'Average summer temperature',
            data: [[1900, 22.06], [1901, 22.31], [1902, 21.89], [1903, 22.01], [1904, 22.46], [1905, 22.02], [1906, 22.51], [1907, 21.07], [1908, 22.13], [1909, 21.75], [1910, 22.12], [1911, 21.72], [1912, 21.09], [1913, 21.72], [1914, 21.74], [1915, 22.15], [1916, 21.24], [1917, 22.99], [1918, 22.74], [1919, 22.41], [1920, 21.92], [1921, 22.43], [1922, 22.63], [1923, 20.91], [1924, 22.19], [1925, 22.16], [1926, 23.06], [1927, 22.17], [1928, 22.17], [1929, 22.55], [1930, 22.31], [1931, 23.48], [1932, 22.11], [1933, 22.77], [1934, 22.34], [1935, 22.65], [1936, 23.18], [1937, 22.9], [1938, 22.62], [1939, 22.81], [1940, 23.15], [1941, 21.63], [1942, 22.65], [1943, 21.39], [1944, 21.06], [1945, 22.52], [1946, 22.38], [1947, 21.57], [1948, 21.55], [1949, 22.16], [1950, 22.42], [1951, 22.27], [1952, 21.9], [1953, 21.64], [1954, 21.68], [1955, 21.83], [1956, 21.93], [1957, 22.69], [1958, 22.93], [1959, 23.51], [1960, 23.71], [1961, 23.82], [1962, 22.19], [1963, 21.37], [1964, 22.07], [1965, 21.45], [1966, 22.5], [1967, 23.09], [1968, 22.3], [1969, 22.59], [1970, 23.09], [1971, 22.73], [1972, 23.05], [1973, 22.83], [1974, 22.78], [1975, 21.92], [1976, 21.75], [1977, 23.25], [1978, 22.59], [1979, 22.33], [1980, 21.98], [1981, 23.82], [1982, 21.81], [1983, 21.84], [1984, 23.03], [1985, 23.44], [1986, 23.03], [1987, 22.33], [1988, 23.09], [1989, 22.46], [1990, 22.94], [1991, 22.01], [1992, 22.88], [1993, 21.86], [1994, 23.58], [1995, 22.21], [1996, 24.0], [1997, 22.59], [1998, 22.77], [1999, 21.89], [2000, 23.18], [2001, 23.31], [2002, 23.53], [2003, 23.9], [2004, 23.24], [2005, 23.07], [2006, 24.18], [2007, 23.62], [2008, 23.74], [2009, 22.97], [2010, 22.72], [2011, 22.33]]
        },
        {
            name: 'Average summer temperature of decade',
            color: '#b50404',
            lineWidth: 1,
            dashStyle: 'longdash',
            data: [[1905, 22.02], [1915, 21.99], [1925, 21.22], [1935, 22.72],[1945, 22.01],[1955, 22.28],[1965, 22.51], [1975, 22.63], [1985, 22.68], [1995, 22.67], [2005,23.47]]
        }],
    });
}
function plotYear(){
    Highcharts.chart('yearTemp', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Average Year Temperatures of California (1900 - 2012)'
        },
        subtitle: {
            text: 'click and drag in the plot area to zoom in'
        },
        yAxis: {
            title: {
                text:  'Temperature (°C)'
            },
            min: 13.3,
            tickInterval: 0.3,
            max: 15.7
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            },
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#ff6a00'],
                        [1, Highcharts.color('#7cb5ec').setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            name: 'Average year temperature',
            data: [[1900, 14.52], [1901, 14.31], [1902, 13.77], [1903, 13.91], [1904, 14.52], [1905, 14.13], [1906, 14.38], [1907, 14.04], [1908, 13.86], [1909, 13.76], [1910, 14.6], [1911, 13.35], [1912, 13.35], [1913, 13.74], [1914, 14.29], [1915, 14.01], [1916, 13.36], [1917, 13.94], [1918, 14.04], [1919, 13.72], [1920, 13.56], [1921, 14.28], [1922, 13.58], [1923, 13.76], [1924, 14.13], [1925, 14.19], [1926, 15.06], [1927, 14.05], [1928, 14.42], [1929, 14.2], [1930, 14.04], [1931, 14.79], [1932, 14.0], [1933, 13.93], [1934, 15.61], [1935, 14.02], [1936, 14.96], [1937, 14.2], [1938, 14.25], [1939, 14.81], [1940, 15.14], [1941, 14.23], [1942, 14.21], [1943, 14.67], [1944, 13.76], [1945, 14.17], [1946, 13.99], [1947, 14.47], [1948, 13.39], [1949, 13.77], [1950, 14.72], [1951, 14.22], [1952, 14.0], [1953, 14.24], [1954, 14.46], [1955, 13.69], [1956, 14.1], [1957, 14.2], [1958, 15.19], [1959, 15.16], [1960, 14.67], [1961, 14.55], [1962, 14.28], [1963, 14.17], [1964, 13.81], [1965, 13.92], [1966, 14.61], [1967, 14.38], [1968, 14.42], [1969, 14.34], [1970, 14.49], [1971, 13.64], [1972, 14.21], [1973, 14.25], [1974, 14.43], [1975, 13.68], [1976, 14.37], [1977, 14.65], [1978, 14.46], [1979, 14.47], [1980, 14.66], [1981, 15.32], [1982, 13.7], [1983, 14.42], [1984, 14.7], [1985, 14.18], [1986, 15.05], [1987, 14.74], [1988, 14.97], [1989, 14.6], [1990, 14.53], [1991, 14.56], [1992, 15.28], [1993, 14.41], [1994, 14.57], [1995, 15.09], [1996, 15.45], [1997, 15.2], [1998, 13.91], [1999, 14.54], [2000, 15.02], [2001, 15.17], [2002, 15.04], [2003, 15.39], [2004, 15.07], [2005, 14.92], [2006, 14.95], [2007, 15.06], [2008, 15.07], [2009, 15.0], [2010, 14.41], [2011, 14.27]]
         },
         {
            name: 'Average year temperature of decade',
            color: '#0027d4',
            lineWidth: 1,
            dashStyle: 'longdash',
            data: [[1905, 14.12], [1915, 13.84], [1925, 14.123], [1935, 14.461],[1945, 14.18],[1955, 14.398],[1965, 14.315], [1975, 14.265], [1985, 14.634], [1995, 14.754], [2005,15.069]]
        }
        ]
    });
}


