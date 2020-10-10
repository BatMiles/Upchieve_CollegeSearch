import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      metadata: {},
      schools: []  
    };
  }

  async callAPI(page) {
        const api_call = await fetch("http://localhost:9000/schools/"+page);
        const data = await api_call.json();
        const jsondata = JSON.parse(data);

        this.setState({ schools: jsondata.results });
        this.setState({ metadata: jsondata.metadata });
        console.log(this.state);
    }

  componentDidMount() {
    const initialPage = 0;
    this.callAPI(initialPage);
  }

  listItem(schoolObject) {
      return (
          <tr key={schoolObject.id}>
              <th>{schoolObject["school.name"]}</th>
              <th>{schoolObject["latest.student.size"]}</th>
              <th>{schoolObject["latest.admissions.admission_rate.overall"]}</th>
          </tr>
      )
  }

  render() {
    let schools = this.state.schools;
    let data = schools.map((item) => this.listItem(item));
    
    return (
    <div className="App">
      <div className="App">
                <header className="App-header">
                    <h1 className="App-title">College Search</h1>
                </header>

                <table className="App-table">
                    <thead className="App-table-header">
                        <tr>
                            <th>School Name</th>
                            <th>Student Size</th>
                            <th>Admissions Rate</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div>
    </div>
  );
  }
}

export default App;
