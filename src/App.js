import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: []
    };
  }
  async componentDidMount() {
    const albums = await ( await fetch('/albums') ).json();
    this.setState({
      albums
    });
  }

  async acceptSuggestedChange(id) {
    const response = await fetch(`/accept-suggested-album-change/${id}`, {method: 'POST'});
    if (response.status === 200) {

    }
  }

  render() {
    return (
      <div className="App">
        {this.state.albums.map(album => {
          return (
            <div>
              <h2>{album.name}</h2>
              <h3>Suggested Edits</h3>
              <div style={{backgroundColor: 'tan', padding: '10px'}}>
                {album.suggestedEdits.map(suggestedEdit => {
                  return (
                    <div>
                      <p>name: {suggestedEdit.name}</p>
                      <button onClick={() => {
                        this.acceptSuggestedChange(suggestedEdit.id)
                      }}>Accept Edit</button>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
