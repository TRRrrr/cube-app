module.value('config', {     // global state
  debug: false,
  companyName: 'Perfetch',
  menus: [
    {
      id: 'home',
      title: 'Home',
      url: 'app.html'
    }, {
      id: 'stats',
      title: 'Stats',
      url: 'stats.html'
    }
  ],
  homePage: 'home',
  toType: function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  }
});
