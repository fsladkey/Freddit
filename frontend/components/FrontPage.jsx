var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./NavBar');
var Posts = require('./Posts');

var FrontPage = React.createClass({


  render: function () {
    var body;
    if (this.props.children) {
      body = this.props.children;
    } else {
      body = <Posts subName={this.props.params.subName}/>;
    }
    return (
      <div>
        <NavBar subName={this.props.params.subName}/>
        <div className="main-content">
          {body}
        </div>
      </div>
    );
  }

});

module.exports = FrontPage;
