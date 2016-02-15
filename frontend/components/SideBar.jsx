var React = require('react');
var ReactDOM = require('react-dom');


var SideBar = React.createClass({

  render: function () {
    var sub = this.props.sub;

    return (
      <div>
        <input placeholder="search" />
        <SideSignInForm />
      </div>
    );
  }

});

module.exports = SideBar;
