import * as React from "react";
import * as ReactDOM from "react-dom";
import * as page from 'page';

class App extends React.Component<any, any> {
  render(){
    return(
    <div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/state">State</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/redirect">Redirect</a></li>
        <li><a href="/param/123">Params</a></li>
        <li><a href="/qparam?num=123">Query Params</a></li>
      </ul>
      { this.props.children }
    </div>
    )
  }    
}

function render(text: string){
  ReactDOM.render(<App><h1>{text}</h1></App>, document.getElementById('react'));
}

function about1(ctx:any, next:any){
  ctx.test = 'test';
  next();
}

function about2(ctx:any){
  console.log('/about', ctx.test);  
  render('ABOUT');
}

page('/', () => {
  console.log('/');
  render('HOME');
});

page('/about', about1, about2);

page();
