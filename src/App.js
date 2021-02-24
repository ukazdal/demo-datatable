import React from 'react';
import './App.css';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
//For API Requests
import axios from 'axios';
class App extends React.Component {
  // State array variable to save and show data
  constructor(props) {
    super(props)
      this.state = {
        data: [],
       
      }}
  componentDidMount() {
       //Get all users details in bootstrap table
        axios.get('https://raw.githubusercontent.com/uurtech/Country-Capital-Flag-json/master/output.json').then(res => 
        {
          //Storing users detail in state array object
          this.setState({data: res.data});
        
        }); 
    //initialize datatable
    $(document).ready(function () {
      var table = $('#example').DataTable( {
        orderCellsTop: true,
        fixedHeader: true
    } );
    $('#example thead tr').clone(true).appendTo( '#example thead' );
    $('#example thead tr:eq(1) th').each( function (i) {
      
        var title = $(this).text();
       
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
 
        $( 'input', this ).on( 'keyup change', function () {
            if ( table.column(i).search() !== this.value ) {
                table
                    .column(i)
                    .search( this.value )
                    .draw();
            }
        } );
    } );
 
    
    });
 }
  render(){
    //Datatable HTML
  return (
  <div>
    <div className="MainDiv">
        <h1 align="center">Ukazdal Json DataTable</h1>
    <h3 align="center">Country Capital Flag Database</h3>
    <br/>
 
      <div className="container">
          
      <table id="example" class="table table-bordered">  
                  <thead>  
                       <tr>  
                            <th>Country</th>  
                            <th>Capital</th>  
                            <th>Flag</th>  
                       </tr>  
                  </thead>  
            <tbody>
          {this.state.data.map((result) => {
            return (
             
                 <tr>
                  <td>{result.country}</td>
                  <td>{result.capital}</td>
                  <td><img src={result.flag} height="30px"/></td>
                </tr>
             
            )
          })}
          </tbody>
        </table>
          
        </div>
      </div>
      </div>
  );
}
}
export default App;
