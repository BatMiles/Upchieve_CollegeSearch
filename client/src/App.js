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

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <p>
          {this.state.metadata.page}
        </p>
      </header>
    </div>
  );
  }
}

export default App;
