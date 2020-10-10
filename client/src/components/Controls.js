import React, {Component} from 'react';
import * as statics from "../statics";

class Controls extends Component {
    render() {
        return (
            <div className="sort-button-container">
                <span>View colleges in </span>
                <select onChange={this.props.onChange} value={this.props.sortValues.state} name="state" id="state-select">
                    {statics.stateAbbreviations.map(abbr => {
                        return <option key={abbr} value={abbr}>{abbr}</option>
                    })}
                </select>

                <span> sorted by </span>
                <select onChange={this.props.onChange} value={this.props.sortValues.field} name="field">
                    <option value="school.name">name</option>
                    <option value="latest.student.size">student size</option>
                </select>

                <span> in </span>
                <select onChange={this.props.onChange} value={this.props.sortValues.direction} name="direction">
                    <option value="asc">ascending</option>
                    <option value="desc">descending</option>
                </select>

                <span> order.</span>
            </div>
        );
    }
}

export default Controls;