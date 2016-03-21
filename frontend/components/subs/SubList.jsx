var React = require('react');
var ReactDOM = require('react-dom');
var SubStore = require('../../stores/sub_store');
var SubApiUtil = require('../../util/sub_api_util');

var SubList = React.createClass({

  getInitialState: function () {
    return {subs: SubStore.all()};
  },

  componentDidMount: function () {
    this.subListener = SubStore.addListener(this._subChanged);
    SubApiUtil.fetchSubs();
  },

  componentWillUnmount: function () {
    this.subListener.remove();
  },

  render: function () {
    var subs =  (
      this.state.subs.map(function (sub) {
        return <li key={sub.id}><a href={"#/r/" + sub.title}>{sub.title}</a></li>;
      })
    );

    return (
      <div className="sub-list">
      <ul>
        <li>
          <a href={"#/"}>all</a>
        </li>
        {subs}
      </ul>
      </div>
    );
  },

  _subChanged: function () {
    this.setState({subs: SubStore.all()});
  }

});


module.exports = SubList;
