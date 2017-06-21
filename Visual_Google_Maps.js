function showArrays(event) 
    {
        /* Since this polygon has only one path, we can call getPath() to return the
         *          MVCArray of LatLngs.*/
        var vertices = this.getPath();
        var contentString = "<b>UTM Square polygon</b><br>" + 
                "Clicked location: <br>" + event.latLng.lat() + "," + event.latLng.lng() +
                "<br>";
        // Iterate over the vertices.
        for (var i =0; i < vertices.getLength(); i++) 
        {
            var xy = vertices.getAt(i);
            contentString += "<br>" + "Coordinate " + i + ":<br>" + xy.lat() + "," + xy.lng();
        }
        // Replace the info window's content and position.
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
    }
function initMap(){
                var map;
                var infoWindow;
                var irad=Number(document.getElementById("rad").value);
                var ilong=Number(document.getElementById("long").value);
                var ilat=Number(document.getElementById("lat").value);
                map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 15,
                    center: {lat: ilat, lng: ilong},
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scaleControl: true
                });
                var iRows = 10000;
                var iCols = 4;
                var Firsti;
                var i;
                var j;
                var temp;
                var dataG;
                /* Generate 10000 coordinates and generate random data of population density 
                 * and confidence level for each grid coordinates*/
                dataG =new Array();
                for (i = 0; i  < iRows; i ++) {
                  //test-arr.insert(index, item)
                  
                    var tempArray = new Array(iCols);
                    dataG.insert(i,tempArray);
                    //*dataG[i] = tempArray;
                  //
                   temp = i;
                    if(temp%100 > 0){
                        for (j = 0; j < iCols; j++) {    
                            switch(j){
                                case 0:
                                    dataG[temp].insert(0,dataG[temp-1][0] + 0.00002);
                                    break;
                                case 1:
                                    dataG[temp].insert(1,dataG[temp-1][1] + 0.001152);
                                    break;
                                case 2:
                                     dataG[temp].insert(2,Math.floor(Math.random()*1000));
                                    break;
                                case 3:
                                    dataG[temp].insert(3,Math.floor(Math.random()*100));
                                    break;
                                    }
                            
                            
                           /* if(j===0)
                            {
                            
                                dataG[temp].insert(0,dataG[temp-1][0] + 0.00002);
                               // dataG[temp][0] = dataG[temp-1][0] + 0.00002;
                            }else if(j===1)
                            {
                                dataG[temp].insert(1,dataG[temp-1][1] + 0.001152);
                               // dataG[temp][1] = dataG[temp-1][1] + 0.001152;                 
                            } else if(j===2){
                                dataG[temp].insert(2,Math.floor(Math.random()*1000));
                               // dataG[temp][2] = Math.floor(Math.random()*1000); 
                            } else {
                                dataG[temp].insert(3,Math.floor(Math.random()*100));
                               // dataG[temp][3] = Math.floor(Math.random()*100); 
                            }
                            */
                            
                            
                        }
                    }
                     else {
                        for (j = 0; j < iCols; j++) {
                            if(temp===0 && j===0){
                                dataG[temp].insert(j,ilat-((0.00002*50)+(0.00090*50)));
                                //dataG[temp][j] = ilat-((0.00002*50)+(0.00090*50));
                            }
                            else if(temp===0 && j===1)
                            {
                                dataG[temp].insert(j,ilong-((0.001152*50)+(0.000026*50)));
                                //dataG[temp][j] = ilong-((0.001152*50)+(0.000026*50));  
                                dataG[temp].insert(2,Math.floor(Math.random()*1000));
                                //dataG[temp][2] = Math.floor(Math.random()*1000);
                                dataG[temp].insert(3,Math.floor(Math.random()*100));
                                //dataG[temp][3] = Math.floor(Math.random()*100);
                            }
                            else{
                                if(j===0)
                                {
                                    dataG[temp].insert(0,dataG[temp-100][0] + 0.0009);
                                   //dataG[temp][0] = dataG[temp-100][0] + 0.0009;
                                }else if(j===1)
                                {
                                    dataG[temp].insert(1,dataG[temp-100][1] + 0.000026);
                                    //dataG[temp][1] = dataG[temp-100][1] + 0.000026;
                                } else if(j===2){ 
                                    dataG[temp].insert(2,Math.floor(Math.random()*1000));
                                   // dataG[temp][2] = Math.floor(Math.random()*1000); 
                                } else{
                                    dataG[temp].insert(3,Math.floor(Math.random()*100));
                                    //dataG[temp][3] = Math.floor(Math.random()*100); 
                                }
                            }
                        }
                    }
                }
                // Define the circular range.        
                var Circle = new google.maps.Circle({
                    strokeColor: "#0000FF",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#0000FF",
                    fillOpacity: 0.0,
                    map,
                    center: {lat: ilat, lng: ilong},
                    radius: irad
                });
                Circle.setMap(map); 
                // Construct the UTM Squares.
                for(i = 0;i < 10000;i++)
                { 
                    var coord1 = new google.maps.LatLng(dataG[i][0]+(0.00090/2), dataG[i][1]+(0.001152/2));
                    if(Circle.getBounds().contains(coord1))
                    {
                        if(i%100 !== 99){
                        
                            var squareCoords = [
                                {lat: dataG[i][0], lng: dataG[i][1]},
                                {lat: dataG[i+100][0], lng: dataG[i+100][1]},
                                {lat: dataG[i+101][0], lng: dataG[i+101][1]},
                                {lat: dataG[i+1][0], lng: dataG[i+1][1]}
                            ];
                            var color;
                            var opacity;
                            if(dataG[i][2]>1 && dataG[i][2]<10){
                                color = "#00FF00";
                            } 
                            else if(dataG[i][2]>10 && dataG[i][2]<100)
                            {
                                color = "#FFFF00";
                            } else if(dataG[i][2]>100 && dataG[i][2]<1000){
                                color = "#FF7F00";
                            } else {
                                color = "#FF0000";
                            }
                            if(dataG[i][3]>0 && dataG[i][3]<25)
                            {
                                opacity = 0.2;
                            }
                            else if(dataG[i][3]>25 && dataG[i][3]<50)
                            {
                                opacity = 0.3;
                            } 
                            else if(dataG[i][3]>50 && dataG[i][3]<75)
                            {
                                opacity: 0.4;
                            }
                            else
                            {
                                opacity: 0.5;
                            }
                            var UTMsquare = new google.maps.Polygon({
                                paths: squareCoords,
                                strokeColor: "#FFFFFF",
                                strokeOpacity: 0.2,
                                strokeWeight: 1,
                                fillColor: color,
                                fillOpacity: opacity
                            });
                            UTMsquare.setMap(map);
                            // Add a listener for the click event.
                            UTMsquare.addListener("click", showArrays);
                            infoWindow = new google.maps.InfoWindow;
                            
                }
            }
        }
    }
    
