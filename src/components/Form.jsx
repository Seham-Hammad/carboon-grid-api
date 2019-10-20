import React from 'react';
import Grid from '@material-ui/core/Grid';

const Form = props => {
 
  
  return (
      <form onSubmit={props.getData}>
        
    <Grid container>   
        <Grid item sm>
                 <div className="form-group"> 
                   Start Date:<input type="datetime-local" name="startDate"  />
                 </div>             
        </Grid>
        <Grid item sm>
                 <div className="form-group"> 
                   End Date:<input type="datetime-local" name="endDate"  />
                   
                 </div>             
        </Grid>
        <Grid item sm>
                 <div className="form-group"> 
                   Region Id:<input name="regionid" placeholder="Enter Region Id" />
                   <button>Gather Data</button>
                 </div>             
        </Grid>
        
       </Grid>
     </form>
    
   
  
  
    )
    
}
export default Form;














