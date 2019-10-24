import React from 'react';
import CarbonDetails from './components/CarbonDetails';
import Header from './components/Header';
import Form from './components/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';


class App extends React.Component {

  state = {
    regionid: undefined,
    dnoregional: undefined,
    shortName: undefined,
    intensityForecast: undefined,
    intensityIndex: undefined,
    startDate: undefined,
    endDate: undefined,
    error: undefined,
    average: undefined,
    Min: undefined,
    Max: undefined,
    minTimeStamp: undefined,
    maxTimeStamp:undefined,
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Carbon Intisity(O2)',   // that has to be changed later
          data: [],
          backgroundColor: [
            "rgba(123, 239, 178, 1)"
          ]
        }
      ]
    }
  }
  
  getData = async (e) => {
    e.preventDefault();
    
    const regionid = e.target.elements.regionid.value;
    const from = e.target.elements.startDate.value;
    const to = e.target.elements.endDate.value;

    const api_call = await fetch(`https://api.carbonintensity.org.uk/regional/intensity/${from}/${to}/regionid/${regionid}`);
    const data = await api_call.json();
    console.log(data);
   
    const dataPoints = data.data.data;
    console.log(dataPoints);

    var minIntensity = dataPoints[0].intensity.forecast;
    var minDate = 0;
    for (var i = 0; i < dataPoints.length; i++){
      if (dataPoints[i].intensity.forecast < minIntensity) {
        minIntensity = dataPoints[i].intensity.forecast;
        if (minIntensity) {
          minDate = dataPoints[i].from;
          this.setState({
            minTimeStamp:minDate
          })
        }
      }
    }
    
    console.log("new min intensity" + minIntensity);
    console.log(minDate);
           
    
    var maxIntensity = dataPoints[0].intensity.forecast;
    var maxDate = 0;
    for (var i = 0; i < dataPoints.length; i++){
      if (dataPoints[i].intensity.forecast > maxIntensity) {
        maxIntensity = dataPoints[i].intensity.forecast;
        if (maxIntensity) {
          maxDate = dataPoints[i].from;
          this.setState({
            maxTimeStamp:maxDate
          })
        }
      }
    }
    console.log("new max intensity" + maxIntensity);
    console.log(maxDate);






    let timeSeries = [];
    dataPoints.forEach(function (element) {
    timeSeries.push(element.from)
        
    });
    console.log(timeSeries);
          
    let intensityReading = [];
    dataPoints.forEach(function (element) {
    intensityReading.push(element.intensity.forecast)
    });
    console.log(intensityReading);
    
   /**Calculate the verage of the carbon intensity withing the range */
        let sum = 0;
        let average = 0;
        let length = intensityReading.length;
        for (let i = 0; i <length; i++){
          sum += intensityReading[i]; 
          average = Math.floor(sum / length);
          this.setState({
            average: average
          })
        }
        console.log(sum);
        console.log(average);

  /**The Max carbon intensity in the range */
    
        let Min = intensityReading[0];
        for (var i = 0; i < length; i++){
          if (intensityReading[i] < Min) {
            Min = intensityReading[i];
            this.setState({
              Min:Min
            })
          }
        }
          console.log(Min)
    
    /**The Max carbon intensity in the range */
        let Max = intensityReading[0];
        for (var i = 0; i < length; i++){
          if (intensityReading[i] > Max) {
            Max = intensityReading[i];
            
          }
          this.setState({
            Max:Max
          })
        }
        console.log(Max)

    if (regionid && from) {
      this.setState({
        regionid: data.data.regionid,
        dnoregional:data.dnoregion,
        shortName: data.data.shortname,
        intensityForecast: data.data.data[0].intensity.forecast,
        intensityIndex: data.data.data[0].intensity.index,
        startDate: data.data.data[0].from,
        endDate: data.data.data[0].to,
        error: "",
        chartData: {
          labels: timeSeries,
          datasets: [
            {
              label: 'Carbon Reading',
              data: intensityReading,
              fill: true,
               backgroundColor: "rgba(0,0,255,0.6)",
               strokeColor: "rgba(220,220,220,0.8)",
               highlightFill: "rgba(123, 239, 178, 1)",
               highlightStroke: "rgba(123, 239, 178, 1)",
               hoverBackgroundColor:"rgba(123, 239, 178, 1)",
               animation: {
                    easing: "easeInOutBack"
               },
            }
          
          ]}
      });
     
    } else {
      this.setState({
        regionid: undefined,
        dnoregional: undefined,
        shortName: undefined,
        intensityForecast: undefined,
        intensityIndex: undefined,
        startDate: undefined,
        endDate: undefined,
        error: "Please enter region name to gather data!",
       
      });
    }
  //});
    
    axios.post('http://localhost:8080/api/save', {
      regionid: this.state.regionid,
      dnoregional: this.state.dnoregional,
      shortName: this.state.shortName,
      intensityForecast: this.state.intensityForecast,
      intensityIndex: this.state.intensityIndex,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    
    })
      .then(res => console.log(res.data))
      .catch(error => console.log(error.res))
  }

 // Display the statistics and current value for carbon intensity for the selected region 
  render() { 
  
    return (
      <div className="App">
        <Header />
        <Form getData={this.getData} />
      <div>
        {	
        this.state.startDate && this.state.endDate && <p> 
              <Bar data={this.state.chartData}
                width={100}
                height={400}
                options={{ maintainAspectRatio: false }} />
            </p> 
        }
     </div>
        <div>
        {
            this.state.shortName && <p style={{color:'blue'}}>Region:
              <span  style={{color:'black'}}> {this.state.shortName}</span> 
              </p>
          }
          {
            this.state.intensityIndex && <p style={{color:'blue'}}>Intensity Index:
              <span  style={{color:'black'}}> {this.state. intensityIndex}</span> 
              </p>
          } 
        {
            this.state.minTimeStamp && <p style={{color:'blue'}}>Timestamp of the minimum carbon Intensity:
              <span style={{color:'black'}}>{this.state.minTimeStamp}</span> 
              </p>
          } 
        
        {
            this.state.maxTimeStamp && <p style={{color:'blue'}}>Timestamp of the maximum carbon Intensity:
              <span style={{color:'black'}}>{this.state.maxTimeStamp}</span> 
              </p>
          } 
           {
            this.state.average && <p style={{color:'blue'}}>Average Carbon Intisity within the date range:
              <span style={{color:'black'}}> {this.state.average}</span> 
              </p>
          } 
          
      
          {
            this.state.Min && <p style={{color:'blue'}}>Minmum Carbon Intisity within the date range:
              <span style={{color:'black'}}>{this.state.Min}</span> 
              </p>
          } 
        
          {
            this.state.Max && <p style={{color:'blue'}}>Maximum Carbon Intisity within the date range:
              <span style={{color:'black'}}> {this.state.Max}</span>
              </p>
          } 
        </div>
        
      </div>
    );
  }
  
}

export default App;
