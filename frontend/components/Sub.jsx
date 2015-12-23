var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./NavBar');
var Posts = require('./Posts');

var Sub = React.createClass({

  render: function () {
    return (
      <div>
        <NavBar subName={this.props.params.subName}/>
        <div className="main-content">
          <Posts subName={this.props.params.subName}/>
        </div>
      </div>
    );
  }

});

module.exports = Sub;
