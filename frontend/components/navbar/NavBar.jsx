var React = require('react');
var ReactDOM = require('react-dom');
var SubList = require('../subs/SubList');
var UserInfo = require('./UserInfo');

var NavBar = React.createClass({
  render: function () {
    var subName = this.props.subName || "All";

    return (
      <div className="nav-bar">
        <SubList subName={this.props.subName}/>
        <div className="logo-container">
          <a className="logo-image"href="/#/"></a>
          <h1 className="logo"><a href="/#/">freddit</a></h1>
        </div>
        <h3 className="sub-name"><a href={"/#/r/" + subName}>{subName}</a></h3>
        {this.props.tabs}
        <UserInfo/>
      </div>
    );
  }

});


module.exports = NavBar;
