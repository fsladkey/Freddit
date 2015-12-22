var React = require('react');
var ReactDOM = require('react-dom');
var SubList = require('./SubList');

var NavBar = React.createClass({

  componentDidMount: function () {

  },

  render: function () {
    return (
      <div className="nav-bar">
        <SubList/>
      </div>
    );
  }

});


module.exports = NavBar;
