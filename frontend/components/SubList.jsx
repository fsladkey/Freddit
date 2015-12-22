var React = require('react');
var ReactDOM = require('react-dom');
var SubStore = require('../stores/sub_store');
var SubApiUtil = require('../util/sub_api_util');

var SubList = React.createClass({

  getInitialState: function () {
    return {subs: SubStore.all()};
  },

  componentDidMount: function () {
    this.benchListener = SubStore.addListener(this._subChanged);
    SubApiUtil.fetchSubs();
  },

  componentWillUnmount: function () {
    this.benchListener.remove();
  },

  render: function () {
    return (
      <div className="sub-list">
      <ul>
        {
          this.state.subs.map(function (sub) {
            return <li key={sub.id}>{sub.title}</li>;
          })
        }
      </ul>
      </div>
    );
  },

  _subChanged: function () {
    this.setState({subs: SubStore.all()});
  }

});


module.exports = SubList;
