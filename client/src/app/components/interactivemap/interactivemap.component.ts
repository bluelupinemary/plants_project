import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
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

@Component({
  selector: 'app-interactivemap',
  templateUrl: './interactivemap.component.html',
  styleUrls: ['./interactivemap.component.css']
})


export class InteractivemapComponent implements OnInit {
  @Input() plants : any[];
  @Input() isFiltered:boolean;
  @Input() topN:any;
  map : Map;
  circleFeature : any;
  vectorSource : any;

  plantIconsFeatures : any[] = [];
  categoryColorMap : any = {
    "WIND":"rgba(20, 255, 236,0.75)",
    "GAS": "rgba(205,95,142,0.75)",
    "OIL": "rgba(89,129,87,0.75)",
    "HYDRO": "rgba(252,176,122,0.75)",
    "COAL": "rgba(110,70,128,0.75)",
    "OTHF": "rgba(236,95,105,0.75)",
    "BIOMASS": "rgba(236,231,107,0.75)",
    "OFSL": "rgba(143,46,35,0.75)",
    "SOLAR": "rgba(106,237,177,0.75)",
    "NUCLEAR": "rgba(8,67,93,0.75)",
    "GEOTHERMAL": "rgba(51,223,238,0.75)",
  }

  constructor(private plantstateService: PlantstateService) { }

  ngOnChanges(): void{
    console.log(this.topN, "in child");
    if(this.isFiltered){
      if(this.topN && this.topN > 0){
        console.log('redraw map now')
        this.redrawMap();
      }
      else{
        this.plantstateService.getAllPlants().subscribe((plants)=>{
          this.plants = plants;    
          this.reInitMap();  
        });
      }
    }else{
      this.generateMap();
    }
    
    // 
  }

  ngOnInit(): void {
    // console.log(this.plants, "from parent")
    

    // this.plantstateService.getAllPlantsByState().subscribe((plants)=>{
    //   this.plants = plants;      
    //   this.generateMap();
    // })
  }

  reInitMap(){
      console.log('reinitMap here')
      this.vectorSource.refresh();
      this.plantIconsFeatures = [];

      this.plants.forEach((plant) => {
        const plantIcon = new Feature({
          //  geometry: new Point(olProj.fromLonLat([plant['LON'],plant['LAT']]))
          geometry: new Circle(olProj.fromLonLat([plant['LON'],plant['LAT']]), 15000),
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
            geometry: new Circle(olProj.fromLonLat([plant['LON'],plant['LAT']]), 15000)
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
        content.innerHTML = '<p>This is a plant</p>';
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

}

