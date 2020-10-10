import React, {Component} from 'react';

class SchoolItem extends Component {
    render() {
        const schoolObject = this.props.school;

        return (
            <tr>
                <th>{schoolObject["school.name"]}</th>
                <th>{schoolObject["latest.student.size"]}</th>
                <th>{schoolObject["latest.admissions.admission_rate.overall"]}</th>
            </tr>
        );
    }
}

export default SchoolItem;