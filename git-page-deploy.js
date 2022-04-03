const ghpages = require('gh-pages');

const callback = () => console.log('Deployed to github page');

try {
  ghpages.publish('build', {
    repo: 'https://github.com/praveengopi19/praveengopi19.github.io.git',
    branch: 'master',
    history: false,
  }, callback);
} catch (e) {
  console.log(e);
}
