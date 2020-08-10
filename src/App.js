import React, { Component } from 'react';
import Form from './Components/Form';
import Titles from './Components/Titles';
import Weather from './Components/Weather';

const API_KEY = 'a3f5b1489f6e8c897dd3689a70b709e8'

class App extends Component {
    state ={
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }
    getWeather = async (e) => {
        e.preventDefault()
        const city = e.target.elements.city.value
        const country = e.target.elements.country.value
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
        const data = await api_call.json()
    
        if (city && country ) {
            if(data.cod === 404) {
                this.setState({
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    humidity: undefined,
                    description: undefined,
                    error: "Input doesn't match any known location!"
                })}
                else if(data.main != null){
                this.setState({
                    temperature: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    error: ""
                })
            } else {
                this.setState(
                    {
                     temperature: undefined,
                     city: undefined,
                     country: undefined,
                     humidity: undefined,
                     description: undefined,
                     error: 'Please enter the correct values'
     } )
            }
            } 
                 else {
                        this.setState(
                               {
                                temperature: undefined,
                                city: undefined,
                                country: undefined,
                                humidity: undefined,
                                description: undefined,
                                error: 'Please enter the values'
                } )
             }
        }
    render() { 
       
        return (
           <div>
               <div className='wrapper'>
                   <div className='main'>
                       <div className='container'>
                           <div className='row'>
                               <div className='col-xs-5 title-container'>
                                   <Titles/>
                                   </div>   
                                   <div className='col-xs-7 form-container'>
                                   
                                   <Form getWeather={this.getWeather}/>
                                   <Weather
                                   temperature = {this.state.temperature}
                                   city = {this.state.city}
                                   country = {this.state.country}
                                   humidity = {this.state.humidity}
                                   description = {this.state.description}
                                   error = {this.state.error}/>
                                   </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
            
         );
    }
}

export default App;