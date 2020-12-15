import './main.css';
import Post from '../posts/post';
import { Profile } from '../home/profile';
import { PostForm } from '../utilities/PostInput';

// The main form of the webpage.
function App() {
  return (
    <div className="App">
        <header className="App-header">
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