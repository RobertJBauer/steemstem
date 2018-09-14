

Template.topmenu.rendered = function () {
  // fix main menu to page on passing
  $('.main.menu').visibility({
    type: 'fixed'
  });
  $('.overlay').visibility({
    type: 'fixed',
    offset: 200
  });
  loadMenu()
  // lazy load images
  // $('.image').visibility({
  //   type: 'image',
  //   transition: 'vertical flip in',
  //   duration: 500
  // });

  // show dropdown on hover
  $('.main.menu  .ui.dropdown').dropdown({
    on: 'hover'
  });

  $('.ui.dropdown.steemstem').dropdown({});
  $('.ui.sidebar').sidebar('setting', 'transition', 'overlay')

}

Template.topmenu.events({
  'click #tag': function (event) {
    event.preventDefault()
    $('.actived').removeClass('actived')
    $('.steemstem.' + this.category).addClass('actived')
    if (!this.category) {
      $('.steemstem.home').addClass('actived')
      FlowRouter.go('/')
      Session.set('currentSearch', false)
    }
    else {
      FlowRouter.go('/' + this.category)
      Session.set('currentSearch', this.category)
    }
  },
  'click .item.submenu': function (event) {
    $('.actived').removeClass('actived')
    $('.steemstem.' + this.category).addClass('actived')
    if (!this.category) {
      $('.steemstem.home').addClass('actived')
      FlowRouter.go('/')
      Session.set('currentSearch', false)
    }
    else {
      FlowRouter.go('/' + event.target.textContent)
      Session.set('currentSearch', event.target.textContent)
    }
  },
  'click #display-menu': function (event) {
    $('.ui.sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle')

  },
  'click #login': function (event) {
    event.preventDefault()
    sessionStorage.setItem('currentroute', FlowRouter.current().path)
    window.location.href = sc2.getLoginURL()
  },
  'click #logout': function (event) {
    event.preventDefault()
    MainUser.remove({})
    localStorage.removeItem('username')
    localStorage.removeItem('accesstoken')
    localStorage.removeItem('expireat')
  },
})


function StopSlFunction() {
  clearTimeout(atr);
}

var atr;

function loadMenu() {
  atr = setTimeout(function () {
    $('.menu .item').tab()

    if(sessionStorage.getItem('lang'))
    {
      Session.set('lang',sessionStorage.getItem('lang'))
      $(".ui.dropdown.language").dropdown("set selected",sessionStorage.getItem('lang'))
    }
    else{
      var userLang = navigator.language || navigator.userLanguage;
      sessionStorage.setItem('lang',userLang.substring(0, 2))
      Session.set('lang',sessionStorage.getItem('lang'))
      $(".ui.dropdown.language").dropdown("set selected", userLang.substring(0, 2))
    }
    $('.ui.dropdown.language')
    .dropdown({
      useLabels: false,
      onChange: function (value, text, $selectedItem) {
        sessionStorage.setItem('lang',value)
        Session.set('lang',value)
        loadtranslations(value, function (error) {
          if (error)
            console.log(error)
        })
      }
    })
    StopSlFunction()
  }, 1500);
}

function StopSlFunction() {
  clearTimeout(atr);
}