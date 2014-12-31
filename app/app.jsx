var React = require('react')
		Firebase = require('firebase')
		ReactFireMixin = require('reactfire')

/** @jsx React.DOM */
var PageList = React.createClass({
	render: function() {
		var createItem = function(item, index) {
			return <li key={ index }>{ item.title }</li>;
		};
		return <ul>{ this.props.items.map(createItem) }</ul>;
	}
});

/** @jsx React.DOM */
var PageAdder = React.createClass({
	getInitialState: function() {
		return {title: "", text: ""};
	},

	handleSubmit: function(e) {
		e.preventDefault();
		if (this.state.title && this.state.title.trim().length !== 0 && this.state.text && this.state.text.trim().length !== 0) {
			this.props.onAdd(this.state);
			this.setState(this.getInitialState());
		}
	},

	onTitleChange: function(e) {
		this.setState({title: e.target.value});
	},
	
	onTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	
	render: function() {
		return (
			<form onSubmit={ this.handleSubmit }>
				<input onChange={ this.onTitleChange } value={ this.state.title } />
				<input onChange={ this.onTextChange } value={ this.state.text } />
				<button>Add</button>
			</form>
		);
	}
});



var PillowForkApp = React.createClass({
	mixins: [ReactFireMixin],
	
	getInitialState: function() {
		return {pages: []};
	},
	
	componentWillMount: function() {
		var firebaseRef = new Firebase("https://pillowfork.firebaseio.com/pages/");
		this.bindAsArray(firebaseRef, "pages");
	},
	
	handleAdd: function(page) {
		return this.firebaseRefs["pages"].push(page);
	},
	render: function() {
		return (
			<div>
				<PageList items={ this.state.pages } />
				<PageAdder onAdd={this.handleAdd} />
			</div>
		);
	}
});

React.render(<PillowForkApp />, document.getElementById("todoApp"));
