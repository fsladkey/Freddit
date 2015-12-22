var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var IndexRoute = ReactRouter.IndexRoute;
// var Search = require('./components/Search');
// var BenchForm = require('./components/BenchForm');
// var BenchShow = require('./components/BenchShow');
var NavBar = require('./components/NavBar');
var App = React.createClass({
  render: function(){
    return (
      <div>
        <NavBar/>
      </div>
    );
  }
});

// var routes = (
//   <Route path="/" component={App}>
//     <IndexRoute component={Search}/>
//     <Route path="benches/new" component={BenchForm}/>
//     <Route path="benches/:benchId" component={BenchShow}>
//       <Route path="review" components={ReviewForm}/>
//     </Route>
//   </Route>
// );
// ReactDOM.render(<Router>{routes}</Router>, root);

$(function () {
  var root = document.getElementById('content');
  ReactDOM.render(<App/>, root);
});
