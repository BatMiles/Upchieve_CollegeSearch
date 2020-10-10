import React, {Component} from 'react';
import '../App.css';

import ReactPaginate from "react-paginate";

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            metadata: {},
            schools: []  
        };

        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    async callAPI(page) {
        const api_call = await fetch("http://localhost:9000/schools/"+page);
        const data = await api_call.json();
        const jsondata = JSON.parse(data);

        this.setState({ schools: jsondata.results });
        this.setState({ metadata: jsondata.metadata });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        this.callAPI(selectedPage);
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

        const numberOfPages = Math.floor(this.state.metadata.total / this.state.metadata.per_page);
        const shouldShowPagination = this.state.metadata.total > this.state.metadata.per_page;

        return (
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

                {shouldShowPagination ? 
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={numberOfPages}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                     : '' }
            </div>
        );
    }
}

export default App;
