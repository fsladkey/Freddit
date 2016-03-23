var React = require('react'),
    ReactDOM = require('react-dom'),
    FrontPage = require('./FrontPage');

module.exports = React.createClass({

  render: function () {
    return <FrontPage sort="controversial" history={this.props.history}/>;
  }

});
