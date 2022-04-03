import { lazy, Suspense } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import { ReactComponent as Error404 } from './assets/icons/error.svg';
import ErrorBoundries from './components/ErrorBoundries';

const DesktopMain = lazy(() => import('./components/Desktop/DesktopMain'));
const MobileMain = lazy(() => import('./components/Mobile/MobileMain'));

function Error() {
  return (
    <section className="sectionClass">
      <div className="error404"><Error404 /></div>
      <h5>Oh no! The requested URL was not found</h5>
      <a href="/"><button type="button" className="errorbuttom">Return Home</button></a>
    </section>
  );
}

function App() {
  const ua = navigator.userAgent;
  const mobile = /IEMobile|Windows Phone|Lumia/i.test(ua) ? 'w' : /iPhone|iP[oa]d/.test(ua) ? 'i' : /Android/.test(ua) ? 'a' : /BlackBerry|PlayBook|BB10/.test(ua) ? 'b' : /Mobile Safari/.test(ua) ? 's' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua) ? 1 : 0;
  return (
    <Suspense fallback={(
      <section className="sectionClass">
        <svg className="spinner" width="174px" height="174px" viewBox="0 0 66 66">
          <circle className="path" fill="transparent" strokeWidth="2" cx="33" cy="33" r="11" stroke="rgb(61, 157, 209)" />
        </svg>
        <div className="loader">Preparing Portfolio</div>
      </section>
)}
    >
      <ErrorBoundries>
        {mobile
          ? (
            <Switch>
              <Route exact path="/" element={<MobileMain mobile={mobile} />} />
              <Route component={Error} />
            </Switch>
          )
          : (
            <Switch>
              <Route exact path="/" element={<MobileMain mobile={mobile} />} />
              <Route exact path="/cmd" component={DesktopMain} />
              <Route component={Error} />
            </Switch>
          )}
      </ErrorBoundries>
    </Suspense>
  );
}

export default App;
