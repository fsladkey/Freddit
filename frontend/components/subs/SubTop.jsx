var React = require('react'),
    ReactDOM = require('react-dom'),
    Sub = require('./Sub');

module.exports = React.createClass({

  render: function () {
    return <Sub sort="top" params={this.props.params} history={this.props.history}/>;
  }

});
