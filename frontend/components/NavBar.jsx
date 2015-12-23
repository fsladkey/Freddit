var React = require('react');
var ReactDOM = require('react-dom');
var SubList = require('./SubList');
var UserInfo = require('./UserInfo');

var NavBar = React.createClass({
  render: function () {
    var subName = this.props.subName || "All";

    return (
      <div className="nav-bar">
        <SubList/>
        <h1 className="logo">freddit</h1>
        <h3 className="sub-name">{subName}</h3>
        <UserInfo/>
      </div>
    );
  }

});


module.exports = NavBar;
