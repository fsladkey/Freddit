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

  subClassName: function (item, match) {
    return item === match ? "current-sub" : "";
  },

  render: function () {
    var subs =  (
      this.state.subs.map(function (sub) {
        var className = this.subClassName(this.props.subName, sub.title);
        return (
          <li className={className} key={sub.id}>
            <a href={"#/r/" + sub.title}>{sub.title}</a>
          </li>
        );
      }, this)
    );
    var className = this.subClassName(this.props.subName, "all");
    return (
      <div className="sub-list">
      <ul>
        <li>
          <a className={className} href={"#/"}>all</a>
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
