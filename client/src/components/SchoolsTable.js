import React, {Component} from 'react';
import SchoolItem from "./SchoolItem.js";

class SchoolsTable extends Component {
    render() {
        return (
            <table className="App-table">
                <thead className="App-table-header">
                    <tr>
                        <th width="50%">School Name</th>
                        <th width="25%">Student Size</th>
                        <th width="25%">Admissions Rate</th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.schools.map(school => {
                        return <SchoolItem key={school.id} school={school} />;
                    })}       
                </tbody>
            </table>
        );
    }
}

export default SchoolsTable;