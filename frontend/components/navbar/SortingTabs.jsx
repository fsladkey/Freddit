var React = require("react");

var SortingTabs = React.createClass({
  render: function () {
    var tabs = ["hot", "new", "top"].map(function (sort, idx) {
      var className = (sort == this.props.sort ? "selected" : "");
      return(
         <li className={className} key={idx}>
           <a href={this.props.url + "/" + sort}>{sort}</a>
         </li>
      );
    }, this);

    return (
      <ul className="tabs">
        {tabs}
      </ul>
    );
  }
});

module.exports = SortingTabs;
