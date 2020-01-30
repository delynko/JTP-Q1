const ctx = $('#myChart');

const qry_url = 'https://services2.arcgis.com/23RzpZFMLfrk9IGV/arcgis/rest/services/survey123_b52673fc83954384a0e558483a2a2d20/FeatureServer/0/query?where=OBJECTID+IS+NOT+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=how_often&returnHiddenFields=false&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=4FMjXlVg2ZOqRYElU6evWMx9EDJIZVbCRSDNeVmob2TRflzt2NKjqhxH1NLrdQ7gWksbA6JUlVI8Ejk7t9pV1K8xedETuRKwTB3bywi17zbGLoGiTOUMFmwNFgsorQVfFr3q9C3GOYaDzZS_maQpGMF8Vf-lHRwrld64l9cOLbm34dUbmQmntyXgyk3qS8psAWa7tsSZy4ZZxhQL9GPPntPgr-aAuo6HzJVBd7G_OntrccuoFV2PhrpcUpaVwsr7'
$.get(qry_url, (data) => {
    let d = JSON.parse(data);
    let often = [];
    for (let i = 0; i < d.features.length; i++){
        often.push(d.features[i].attributes.how_often)
    };
    
    let a = [], b = [], prev;

    often.sort();
    for ( var i = 0; i < often.length; i++ ) {
        if ( often[i] !== prev ) {
            a.push(often[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = often[i];
    }

    console.log([a, b]);
    setTimeout(() => {
        const myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Daily","2 or 3 times a week","Weekly","Monthly","A few times a year","Never"],
                datasets: [{
                    label: 'How often do you use the trail network in Jefferson County?',
                    data: [b[2],b[0],b[5],b[3],b[1],b[4]],
                    backgroundColor: [
                        'rgba(106, 64, 97, 1)',
                        'rgba(98, 125, 119, 1)',
                        'rgba(115, 150, 0, 1)',
                        'rgba(38, 63, 106, 1)',
                        'rgba(190, 214, 0, 1)',
                        'rgba(166, 71, 56, 1)'
                    ],
                    // borderColor: [
                    //     'rgba(255, 99, 132, 1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)',
                    //     'rgba(255, 159, 64, 1)'
                    // ],
                    // borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }, 500)
    
});