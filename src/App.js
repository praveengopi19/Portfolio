import React, { lazy, Suspense } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { ReactComponent as Error404 } from './assets/icons/error.svg'
import ErrorBoundries from './components/ErrorBoundries';

//import DesktopMain from './components/Desktop/DesktopMain';
//import MobileMain from './components/Mobile/MobileMain';

const DesktopMain = lazy(() => import("./components/Desktop/DesktopMain"));
const MobileMain = lazy(() => import("./components/Mobile/MobileMain"));

const Error = () => (<section><div className="error404"><Error404 /></div>
  <Link to="/"><button className="errorbuttom">Return Home</button></Link></section>);

function App() {
  var ua = navigator.userAgent;
  var mobile = /IEMobile|Windows Phone|Lumia/i.test(ua) ? 'w' : /iPhone|iP[oa]d/.test(ua) ? 'i' : /Android/.test(ua) ? 'a' : /BlackBerry|PlayBook|BB10/.test(ua) ? 'b' : /Mobile Safari/.test(ua) ? 's' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua) ? 1 : 0;
  return (
    <div className="App">
      <Suspense fallback={<section>
        <svg className="spinner" width="174px" height="174px" viewBox="0 0 66 66" >
          <circle className="path" fill="transparent" strokeWidth="2" cx="33" cy="33" r="11" stroke="rgb(61, 157, 209)" />
        </svg>
        <div className="loader">Preparing Portfolio</div>
      </section>}>
        <ErrorBoundries>
          {mobile ?
            <Switch>
              <Route exact path="/" render={(props) => (<MobileMain mobile={mobile} />)} />
              <Route component={() => (<Error />)} />
            </Switch>
            :
            <Switch>
              <Route exact path="/" render={props => (<MobileMain mobile={mobile} />)} />
              <Route exact path="/cmd" render={props => (<DesktopMain mobile={mobile} />)} />
              <Route component={() => (<Error />)} />
            </Switch>
          }
        </ErrorBoundries>
      </Suspense>
    </div >
  );
}

export default App;
//header flex inital
//content flex 1 1 basis
//footer flex end