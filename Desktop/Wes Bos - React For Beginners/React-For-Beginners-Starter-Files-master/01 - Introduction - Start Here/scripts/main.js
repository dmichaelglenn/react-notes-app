var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
//history 'mixin'
var History = ReactRouter.History;


var h = require('./helpers');

 

//App
var App = React.createClass({
//initial state
    getInitialState: function() {
        return {
            fishes: {},
            order: {}
        }
    },
    addToOrder: function(key) {
        //increment the quanity if there's already a value for this key in the order - otherwise, just add it
        console.log("add to order");
        this.state.order[key] = this.state.order[key] + 1 || 1;
        this.setState({order: this.state.order});
    },
    //method to add fish
    addFish: function(fish) {
        var timestamp = (new Date()).getTime();
        //update the state obj
        this.state.fishes['fish-' + timestamp] = fish;
        //set the state obj. notice we're not changing the whole state object, but a specific obj. This is done for the sake of performance - the DOM only has to check/update one component instead of checking them all.
        this.setState({fishes: this.state.fishes})
    },
    loadSamples: function() {
        this.setState({
            fishes: require('./sample-fishes')
        });
    },
    renderFish: function(key) {
        //each will recieve it's key so we can track/address the correct instance, and it's grabbing the details for each rendered fish from the state object (accessing it by key as well).
        return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
    },
    render: function() {
        //note how i'm passing addFish into inventory...

        //also to note. inside the UL, we'd normally map over an array to populate...but our state rn is an obj, not an array. The object.keys method gets us an array over which we can map, and then i pass our render method in as an argument to the map.
        return (
             <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(this.renderFish)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
             </div>
        )
    }

});

var Fish = React.createClass({
    onButtonClick: function () {
        console.log("adding fish ", this.props.index);
        this.props.addToOrder(this.props.index);
    },
    render: function() {
        //don't get mixed up - all that's happening here is i'm pointing a var at the props.details object, so that my code below is cleaner.
        var details = this.props.details;
        //creates a boolean based on the status. 
        var isAvailable = (details.status === "available" ? true : false);
        //if the above var equates to true, the button text offers the ability to add the item to the order. otherwise, display sold out
        var buttonText = (isAvailable ? "Add to Order" : "Sold Out!");
        return (
            <li className="menu-fish">
                <img src={details.image}  alt={details.name} />
                <h3 className="fish-name">{details.name}
                <span className="price">{h.formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
            </li>
        )
    }

});

//add fish
var AddFishForm = React.createClass({
    createFish: function(event) {
        //stop form from submitting
        event.preventDefault();
        //take data from the form to create an obj
        var fish = {
            name: this.refs.name.value,
            price: this.refs.price.value,
            status: this.refs.status.value,
            desc: this.refs.desc.value,
            image: this.refs.image.value
        }
        console.log(fish);
        //add fish to the App state
        this.props.addFish(fish);
        //reset the form
        this.refs.fishForm.reset();
    },
    render: function() {
        return (
            <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
                <input type="text" ref="name" placeholder="Fish Name" />
                <input type="text" ref="price" placeholder="Fish Price" />
                <select ref="status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" ref="desc" placeholder="Description"></textarea>
                <input type="text" ref="image" placeholder="URL to Image" />
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
});

//Header

var Header = React.createClass({
    render: function() {
        return (
            <header className="top">
                <h1>Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span> 
                Day</h1>
                <h3 className="tagline"><span>{this.props.tagline}</span></h3>
            </header>
        )
    }
})

//Order

var Order = React.createClass({
    renderOrder: function(key) {
        var fish = this.props.fishes[key];
        var count = this.props.order[key];

        if (!fish) {
            return <li key={key}>Sorry, fish not available!</li>
        }
        return (
            <li>
                {count}lbs
                {fish.name}
                <span className="price">{h.formatPrice(count * fish.price)}</span>
            </li>
        )

    },
    render: function() {
        var orderIds = Object.keys(this.props.order);
        //some es6 here - will address later
        var total = orderIds.reduce((prevTotal, key)=> {
            var fish = this.props.fishes[key];
            var count = this.props.order[key];
            var isAvailable = fish && fish.status === 'available';

        if (fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0);
        }

        return prevTotal;

        }, 0);
        return (
            <div className="order-wrap">
                <h2 className="order-title">Your Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {h.formatPrice(total)}
                    </li>
                
                </ul>
            </div>
        )
    }
})

//Inventory

var Inventory = React.createClass({
    //and passing addFish down again into AddFishForm. if I needed to pass a lot of methods or whatever, the syntax would be {...this.props}
    //I actually ended up using that, but we wanna be careful not to do this by default - typically pass only what you need.
    render: function() {
        return (
            <div>
                <h2>Inventory</h2>
                <AddFishForm {...this.props} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
})


//StorePicker

var StorePicker = React.createClass({
    //mixins seem to give us access within our classes to whatever methods we're 'mixing in'. So in this case, it's the react router history methods
    mixins: [History],
    goToStore: function() {
        //prevent default submit functionality
        event.preventDefault();
        //get data from input. Note that I assigned a 'ref' on the input tag, and it was added to the 'this.refs' object
        var storeID = this.refs.storeId.value;
        //transition from StorePicker to App. Note the use of the history mixin, and that i'm passing null as the first arguement as there's no state obj at this point. 
    this.history.pushState(null, '/store/' + storeID);
    },
    render: function() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>
                <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
                <input type="Submit" />
            </form>
        )
    }
});

//not found

var NotFound = React.createClass({
    render: function() {
        return <h1>Oops! Page not found!</h1>
    }
});


//routes
var routes = (
    <Router>
        <Route path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route path="*" component={NotFound} />      
    </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));