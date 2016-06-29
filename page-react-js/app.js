import React from 'react';
import ReactDOM from 'react-dom';
import page from 'page';

class App extends React.Component {
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

function render(text){
  ReactDOM.render(<App><h1>{text}</h1></App>, document.getElementById('react'));
}


function home(ctx) {
  console.log('/home');
  render('HOME');
}

function about1(ctx, next){
  ctx.test = 'test';
  next();
}

function about2(ctx){
  console.log('/about', ctx.test);  
  render('ABOUT');
}

function redirect(ctx){  
  page.redirect('/about');
}

function load(ctx, next) {
  // check if we have .state.avatar already available
  // this could for example be a cached html fragment.
  if (ctx.state.avatar) {
    console.log('use avatar from history');
    ctx.avatar = ctx.state.avatar + '-history';
    next();
    return;
  }

  // pretend we're querying some database etc
  setTimeout(function(){
    // you can assign properties to the context
    // for use between these functions. The .state
    // property is what's saved in history.
    console.log('full');
    ctx.state.avatar = ctx.avatar = 'AVATAR';
    ctx.save();
    next();
  }, 600);
}

function show(ctx) {
  render(ctx.avatar);
}

page('/', home);
page('/about', about1, about2);
page('/redirect', redirect);
page('/param/:num', (ctx) => {
  console.log(ctx.params.num);
  page.redirect('/');
});
page('/qparam', (ctx) => {
  console.log(ctx.querystring);
  page.redirect('/');
});

page('/state', load, show);
page('*', () => {
  console.log('not found'); 
  page('/');
  //render('NOT FOUND'); 
});


page();