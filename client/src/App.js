import logo from './logo.svg';
import './App.css';
import Post from './components/posts/post';
import {Home} from './components//home/home';
import { Profile } from './components/home/profile';
import { PostForm } from './components/utilities/PostInput';
import { Beater } from "./components/utilities/Beater";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home/>
        <div className="prof-header">
          <Profile/>
        </div>
        <div className="postInput">
          <PostForm/>
        </div>
        <div className="post">
          <Post/>
        </div>
      </header>
    </div>
  );
}

export default App;