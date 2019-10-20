import React from 'react';
import CarbonDetails from './components/CarbonDetails';
import Header from './components/Header';
import Form from './components/Form';
import Chart from './components/Chart';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {Card, CardBody, CardText, CardTitle, CardDeck, CardGroup,Col, Row} from "reactstrap";

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
    Max:undefined,
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

    
    fetch (`https://api.carbonintensity.org.uk/regional/intensity/${from}/${to}/regionid/${regionid}`)
      .then(res => {
        if (!res.ok) {
          throw new TypeError(res.statusText);
        }
        return res.json();
      }).then(data => {
        console.log(data);
        const dataPoints = data.data.data;
        console.log(dataPoints);

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
          average = sum / length;
          this.setState({
            average: average
          })
        }
        console.log(sum);
        console.log(average);

      /**Timestamp the min carbon intensity in the range */
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
      /**Timestamp the min carbon intensity in the range */
        let Max = intensityReading[0];
        for (var i = 0; i < length; i++){
          if (intensityReading[i] > Max) {
            Max = intensityReading[i];
            this.setState({
              Max:Max
            })
          }
        }
        console.log(Max)

    if (regionid && from) {
      this.setState({
        regionid: data.regionid,
        dnoregional:data.dnoregion,
        shortName: data.shortname,
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
              data: intensityReading
            }
          ]
        }
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
  });
    
    axios.post('http://localhost:8080/api/save', {
      regionid: this.state.regionid,
      dnoregional: this.state.dnoregional,
      shortName: this.state.shortname,
      intensityForecast: this.state.intensityForecast,
      intensityIndex: this.state.intensityIndex,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    
    })
      .then(res => console.log(res.data))
      .catch(error => console.log(error.res))
  }

 
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
            this.state.average && <p>Average Carbon Intisity within the date range:
              <h3> {this.state.average}</h3> 
              </p>
          } 
        </div>
        <div>
          {
            this.state.Min && <p>Minimum Carbon Intisity within the date range:
              <h3> {this.state.Min}</h3> 
              </p>
          } 
        </div>
        <div>
          {
            this.state.Max && <h3>Maximum Carbon Intisity within the date range:
               {this.state.Max}
              </h3>
          } 
        </div>
        
      </div>
    );
  }
  
}

export default App;
