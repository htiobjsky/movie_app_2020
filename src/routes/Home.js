import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import "./Home.css";

class Home extends React.Component {
  state ={
    isLoading: true,
    movies: []
  };
  
  getMovies = async () => { // getMovie가 시간이 좀 걸리니까 (axios) 기다리라는 의미로 async/await. 그렇지 않으면 기다리지 않아
    const {data:{data:{movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading:false });
  }
  
  componentDidMount(){
    // setTimeout(
    //   ()=> {
    //     this.setState({isLoading:false});
    //   }, 3000
    // );
      this.getMovies();
  }
  render() {
    const {isLoading, movies} = this.state;
    return (
      <section className="container">
        {isLoading ? 
        (<div className="loader">
          <span className="loader__text">Loading</span>
          </div>) : (<div className="movies">
          {movies.map(movie => (
          <Movie 
            key={movie.id}
            id={movie.id} 
            year={movie.year} 
            title={movie.title} 
            summary={movie.summary} 
            poster={movie.medium_cover_image}
            genres ={movie.genres} />
        ))} </div>) } </section>
    )}
}
export default Home;


// 처음 실행될때, Constructor -> render -> didMount
// Update 될때, render -> didupdated
// unmount : 컴포넌트가 사라질대

// state를 직접 변경하면 render Function이 재실행되지 않음
// 따라서 React가 state의 변경을 알아차리고 render를 하게 해주기 위해 setState()를 사용해 state를 변경함
// 우리가 setState를 호출할때마다 react는 새로운 state와 함께 render()를 다시 실행함!!


// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log("hello")
//   }
//   state = {
//     count : 0
//   };
//   add = () => {
//     this.setState(current => ({count:current.count+1}));
//   };
//   minus = () => {
//     this.setState(current => ({count:current.count-1}));
//   };
//   componentDidMount() {
//     console.log("didMount")
//   }
//   componentDidUpdate() {
//     console.log("didUpdated")
//   }
//   render () {
//        console.log("render")
//     return <div>
//       <h1> Im a class {this.state.count}</h1>
//       <button onClick ={this.add}>Add</button>
//       <button onClick ={this.minus}>Minus</button>
//       </div>
//     }
//   }

// export default App;

// const favorite_Food = [
//   {
//     id : 1,
//     name : "김치",
//     image : "http://www.morecorp.co.kr/data/file/nproduct/thumb-2039967777_vVB1aZ92_92e6e68ae031dbb41f874c44db1264346ad30d34_600x400.jpg",
//     rating : 5
//   },
//   {
//     id : 2,
//     name : "감치",
//     image : "https://www.hankyung.com/economy/article/201910043712g",
//     rating : 3.5
//   }
// ]

// function Food({name, picture, rating}) {
//   return(
//     <div>
//       <h1> I Like {name}</h1>
//       <h4>{rating}/5.0</h4>
//       <img src= {picture} art= {name} />
//     </div>
//   );
// }

// Food.propTypes = {
//   name:PropTypes.string.isRequired,
//   picture:PropTypes.string.isRequired,
//   rating:PropTypes.number.isRequired
// }

// function App() {  //컴포넌트는 HTML을 리턴하는 함수
//   return (
//     <div className="App"> 
//       {favorite_Food.map(dish =>
//       <Food name={dish.name} picture={dish.image} key={dish.id} rating={dish.rating}/>)} </div>
//   );
// } 




// function Food () {  // props.fav = {fav}
//   return <h1> I like {fav}} </h1>
// }

// Map 함수 : Array의 각 Item에 Function을 적용하고 그걸 Return한값을 Array에 가짐
// friends.map((friend)=> {return friend +"친구";})