
import React from 'react';
   
const CarbonDetails = props => (
    <div >
        { 	
	 	 props.regionid &&<p > Region Id: 
	 		<span > { props.regionid}	</span>
	 	</p> 
	 }
	 {	
	 	props.dnoregional &&<p > Region: 
	 		<span > { props.dnoregional }</span>
	 	</p> 
	}

	{	
	 	props.shortName && <p > Short Name: 
	 		<span > { props.shortName }</span>
	 	</p> 
    }
        { 	
	 	props.forecast && <p > Intensity Forecast: 
	 		<span > { props.forecast }	</span>
	 	</p> 
		}
		{ 	
	 	props.index && <p > Index: 
	 		<span > { props.index }	</span>
	 	</p> 
		}
		{ 	
	 	props.startDate && <p > Start Date: 
	 		<span > { props.startDate }	</span>
	 	</p> 
		}
		{ 	
	 	props.endDate && <p > End Date: 
	 		<span > { props.endDate }	</span>
	 	</p> 
		}
		
    </div>

)
export default CarbonDetails; 