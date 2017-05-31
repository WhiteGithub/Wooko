import React, {Component} from 'react';

const server = require("../server");

export default class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // prevent error when evaluating this.state.xxx
  }

  componentWillMount() {
    server.getStatistics(this._getStatisticsSuccessCallback.bind(this));
  }

  render() {
    return (
      <div style={this.props.style}>
        <h1>Statistics</h1>
        {this.state.statistics
        ? <div>
            <p>Number of Users: {this.state.statistics.number_of_users}</p>
            <p>Number of Verified Users: {this.state.statistics.number_of_healthy_users}</p>
            <p>Number of Verified Users at UOttawa: {this.state.statistics.number_of_healthy_users_uottawa}</p>
            <p>Number of Verified Users at Carleton: {this.state.statistics.number_of_healthy_users_carletonu}</p>
            <p />
            <p>Number of All Posts: {this.state.statistics.number_of_all_posts}</p>
            <p>Number of All Hires: {this.state.statistics.number_of_all_hires}</p>
            <p>Number of All Contracts: {this.state.statistics.number_of_all_contracts}</p>
            <p>Number of Paid Contracts: {this.state.statistics.number_of_paid_contracts}</p>
            <p>Total Amount Paid: {this.state.statistics.total_amount_paid}</p>
          </div>
        : null
        }
      </div>
    );
  }

  _getStatisticsSuccessCallback(status, response) {
    this.setState({statistics:response.statistics});
  }
}
