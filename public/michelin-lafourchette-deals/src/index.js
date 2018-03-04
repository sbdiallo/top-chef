// Code React
import React from 'react';
import { render } from 'react-dom';

import michelin from './AllStarredMichelinRestaurants.json';
import dealsLafourchette from './dealsLafourchette.json';

import './index.css';

class App extends React.Component {

	state = {
		
		dealsLafourchette
	};

	display = event => {

		// we transfrom dealsLafourchette in array
		const keyArray = Object.keys(dealsLafourchette);

		// un restaurant au hasard
		const randomKey = keyArray[Math.floor(Math.random() * keyArray.length)]
		if (this.state.name === dealsLafourchette[randomKey].name){
			this.display();
			return;
		}

			this.setState(dealsLafourchette[randomKey]);
	}

	render(){
		console.log('All Starred Michelin Restaurants');
		console.log(michelin);
		console.log('');
		console.log(' All Starred Michelin Restaurants with deals');
		console.log(dealsLafourchette);


		return (

	  		<div>
	  			<center>
				All Starred Michelin Restaurants with deals in France
				</center>  
				<br/>

     			<p>    
     				Name: {this.state.name} 
     				<br/>
     				Promo:  {this.state.promo} <br/>
     				Address:  {this.state.addr} <br/>
     				{this.state.href} <br/>
     				 

     			</p>
			

			<button onClick={e => this.display(e)}>	display a random restaurant </button>						
			</div>
		)
		
	}

}
render(
  <App />,
  document.getElementById('root')
);

