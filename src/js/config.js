angular.module('perfetch', []).
  value('config', {     // global state
    companyName: 'Perfetch',
    menus: [
      {
        title: 'App',
        url: 'app.html',
        active: true
      }, {
        title: 'Stats',
        url: 'stats.html',
        active: false
      }
    ],
    homePage: 'App'
  });
