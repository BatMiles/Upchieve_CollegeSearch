import React, {Component} from 'react';
import '../App.css';

import SchoolsTable from "./SchoolsTable.js";
import Controls from "./Controls.js";

import ReactPaginate from "react-paginate";

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            metadata: {},
            schools: [],
            sort: {
                state: "NY",
                field: "school.name",
                direction: "asc"
            }  
        };

        this.handlePageClick = this
            .handlePageClick
            .bind(this);

        this.handleStateChange = this
            .handleStateChange
            .bind(this);
    }

    componentDidMount() {
        const initialPage = 0;
        this.callAPI(initialPage);
    }

    async callAPI(page) {
        const api_call = await fetch("http://localhost:9000/schools/"+page+"/state/"+this.state.sort.state+"/sort/"+this.state.sort.field+"/order/"+this.state.sort.direction, {
            method: 'POST',
            body: JSON.stringify(this.state.sort),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await api_call.json();
        const jsondata = JSON.parse(data);

        this.setState({ schools: jsondata.results });
        this.setState({ metadata: jsondata.metadata });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        this.callAPI(selectedPage);
    }

    handleStateChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        this.setState({
            sort: {
                ...this.state.sort,
                [key]: value
            }
        }, () => {
            this.callAPI(this.state.metadata.page)
        });
    }

    render() {
        const schools = this.state.schools;
        const sortProps = this.state.sort;
        const numberOfPages = Math.floor(this.state.metadata.total / this.state.metadata.per_page);

        const shouldShowPagination = this.state.metadata.total > this.state.metadata.per_page;
        const shouldShowTable = this.state.schools.length > 0;

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">College Search</h1>
                </header>

                <Controls sortValues={sortProps} onChange={this.handleStateChange} />

                {shouldShowTable ? 
                    <SchoolsTable 
                        schools={schools}
                    />
                    : <p>No results exist for that query</p>
                }

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
