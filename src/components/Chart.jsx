import React from 'react';

class Chart extends React.Component{
  constructor(props) {
    super(props)

    this.state = ({
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Carbon Intensity',
            data: [],
            backgroundColor: [
              "rgba(123, 239, 178, 1)"
            ]

          }
        ]
      }
    });
  }

  componentWillMount() {
    this.getChartData();
   }
  
  
  getChartData = () => {
    //fetch("https://rodio-data-api-dot-heimdall-212813.appspot.com/rodio/scan/" + this.state.sensor_id + "/" + this.state.value.toISOString())
    fetch("https://api.carbonintensity.org.uk/regional/intensity/" + this.props.startDate + "/" +this.props.endDate + "/regionid/" + "/" + this.props.regionid)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        let chartPoints = result.data;
        console.log(chartPoints);

      });
  }
  render() {
    return (
      <div>
        {	
        this.props.startDate && this.props.endDate && <p> Chart here: 
          <span> { this.props.startDate }, { this.props.endDate }</span>
        </p> 
        }
        </div>
  
    )
  }
}


export default Chart;




