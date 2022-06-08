import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {Vector as VectorLayer} from 'ol/layer';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { PlantstateService } from 'src/app/services/plantstate.service';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import {Fill, IconImage, Stroke} from 'ol/style';
import {Circle, Point} from 'ol/geom';
import { useGeographic } from 'ol/proj';
import { Color } from 'ol/color';
import { map } from 'rxjs';
import { getLocaleDayPeriods } from '@angular/common';
import Overlay from 'ol/Overlay';
import CircleStyle from 'ol/style/Circle';

@Component({
  selector: 'app-interactivemap',
  templateUrl: './interactivemap.component.html',
  styleUrls: ['./interactivemap.component.css']
})


export class InteractivemapComponent implements OnInit {
  @Input() plants : any[];
  @Input() isFiltered:boolean;
  @Input() hasState:boolean;
  @Input() hasCategory:boolean;
  @Input() topN:any;
  @Output() onPlantMarkerClick = new EventEmitter();
  isFetchDone : boolean = false;
  map : Map;
  circleFeature : any;
  vectorSource : any;

  plantIconsFeatures : any[] = [];
  categoryColorMap : any = {
    "WIND":"rgba(245, 39, 145, 0.75)",
    "GAS": "rgba(255, 0, 0, 0.75)",
    "OIL": "rgba(220, 0, 255, 0.75)",
    "HYDRO": "rgba(29, 0, 255, 0.75)",
    "COAL": "rgba(0, 0, 0, 0.75)",
    "OTHF": "rgba(0, 205, 255, 0.75)",
    "BIOMASS": "rgba(0, 255, 8, 0.75)",
    "OFSL": "rrgba(0, 255, 8, 0.75)",
    "SOLAR": "rgba(231, 255, 0, 0.75)",
    "NUCLEAR": "rgba(255, 109, 0, 0.75)",
    "GEOTHERMAL": "rgba(149, 85, 38, 0.75)",
  }

  constructor(private plantstateService: PlantstateService) { }

  ngOnChanges(): void{
    console.log(this.topN, "in child");
    if(this.isFiltered){
      if(this.topN && this.topN > 0){
        console.log('redraw map now')
        
        if(this.hasState) this.reInitMap();
        else this.redrawMap();
      }
      else{
        this.reInitMap();
      }
    }else{
      this.generateMap();
    }
    
    // 
  }

  ngOnInit(): void {
  }

  reInitMap(){
      console.log('reinitMap here', this.plants)
      this.vectorSource.refresh();
      this.plantIconsFeatures = [];

      this.plants.forEach((plant) => {
        const plantIcon = new Feature({
          //  geometry: new Point(olProj.fromLonLat([plant['LON'],plant['LAT']]))
          geometry: new Circle(olProj.fromLonLat([plant['LON'],plant['LAT']]), 15000),
          name:plant.PNAME,
          state: plant.PSTATABB,
          category:plant.PLFUELCT,
          id:plant.SEQPLT20
        });
      
  
        let setColor = plant['PLFUELCT'] !== "" ? this.categoryColorMap[plant['PLFUELCT']] : "rgba(194, 68, 68, 0.75)";
        
        plantIcon.setStyle(
          new Style({
          //  image: new Icon(({
          //    color: '#ffffff',
          //    crossOrigin: 'anonymous',
          //    src: '../../../assets/power-plant-icon.svg',
          //    imgSize: [25,25]
          //  }))
          fill: new Fill({
            color: setColor,
          }),
          stroke: new Stroke({
            color: '#DAA520',
            width: 0.5
          }),
          })
        );

        this.plantIconsFeatures.push(plantIcon);
      })
      

      this.vectorSource.addFeatures(this.plantIconsFeatures)

  }

  redrawMap(){
    if(this.isFiltered){
      console.log('redrawing here')
      this.vectorSource.refresh();
      this.plantIconsFeatures = [];
      
      Object.keys(this.plants).forEach((category:any)=>{
        
        this.plants[category].forEach((plant:any)=>{
          const plantIcon2 = new Feature({
            //  geometry: new Point(olProj.fromLonLat([plant['LON'],plant['LAT']]))
            geometry: new Circle(olProj.fromLonLat([plant['LON'],plant['LAT']]), 15000),
            name:plant.PNAME,
            state: plant.PSTATABB,
            category:plant.PLFUELCT,
            id:plant.SEQPLT20
          });
    
          let setColor = (category !== "" && this.categoryColorMap[category.toUpperCase()]) ? this.categoryColorMap[category.toUpperCase()] : "#DAA52080";
          plantIcon2.setStyle(
            new Style({
            //  image: new Icon(({
            //    color: '#ffffff',
            //    crossOrigin: 'anonymous',
            //    src: '../../../assets/power-plant-icon.svg',
            //    imgSize: [25,25]
            //  }))
            fill: new Fill({
              color: setColor,
            }),
            stroke: new Stroke({
              color: '#DAA520',
              width: 0.5
            }),
            })
          );
          this.plantIconsFeatures.push(plantIcon2);
        })

      })
      this.vectorSource.addFeatures(this.plantIconsFeatures)

    }
  }

  generateMap(){
    const container = (<HTMLInputElement>document.getElementById("popup"));
    const content = (<HTMLInputElement>document.getElementById('popup-content'));
    const closer = (<HTMLInputElement>document.getElementById('popup-closer'));

    // popup overlay 
    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 50
      }
    });


      this.plants.forEach((plant) => {
        const plantIcon = new Feature({
          //  geometry: new Point(olProj.fromLonLat([plant['LON'],plant['LAT']]))
          geometry: new Circle(olProj.fromLonLat([plant['LON'],plant['LAT']]), 15000),
          name:plant.PNAME,
          state: plant.PSTATABB,
          category:plant.PLFUELCT,
          id:plant.SEQPLT20
        });
      
  
        let setColor = plant['PLFUELCT'] !== "" ? this.categoryColorMap[plant['PLFUELCT']] : "rgba(255,0,0,0.5)";
        
        plantIcon.setStyle(
          new Style({
        
          //  image: new Icon(({
          //    color: '#ffffff',
          //    crossOrigin: 'anonymous',
          //    src: '../../../assets/power-plant-icon.svg',
          //    imgSize: [25,25]
          //  }))
          fill: new Fill({
            color: setColor,
          }),
          stroke: new Stroke({
            color: '#DAA520',
            width: 0.5
          }),
          })
        );

        this.plantIconsFeatures.push(plantIcon);
      })

    

    this.vectorSource = new VectorSource({
      features: this.plantIconsFeatures
    })

    let vectorLayer = new VectorLayer({
      source: this.vectorSource
    })

    
    this.map = new Map({
      target: 'us-map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      overlays: [overlay],
      view: new View({
        center: olProj.fromLonLat([-95,35]),
        zoom: 4.5
      })
    });

    this.map.addLayer(vectorLayer);




    // pointermove
    this.map.on('singleclick', (evt) => {
      const coordinate = evt.coordinate;

    
      const pixel = this.map.getEventPixel(evt.originalEvent);
      const hit = this.map.hasFeatureAtPixel(pixel);
      
      console.log(evt, pixel, hit)
      if(hit){
        this.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
          // do something
          console.log(feature.get('name'),feature.get('state'),feature.get('category')); // <---- SEEMS LIKE 'PRIVATE' prop
          content.innerHTML = '<div class="popup-wrapper">'+
          'Plant Name: <span class="plant-name">'+feature.get('name')+'</span><br/>'+
          'Location: <span class="plant-state">'+feature.get('state')+'</span><br/>'+
          'Category: <span class="plant-category">'+feature.get('category')+'</span>'+
          '</div>';
          this.mapMarkerClick(feature.get('id'))

        });
        
        overlay.setPosition(coordinate);

        console.log('hit')
      }else{
        console.log('not hit')
      }

     
    });


    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

  }

  mapMarkerClick(plantId:any){
    console.log("marker is clicked");
    // this.formSubmitValues = this.form.value;
    this.onPlantMarkerClick.emit(plantId)
  }

}

