var React = require('react'),
    ReactDOM = require('react-dom'),
    FrontPage = require('./FrontPage');

module.exports = React.createClass({

  render: function () {
    return <FrontPage sort="new" history={this.props.history}/>;
  }

});
