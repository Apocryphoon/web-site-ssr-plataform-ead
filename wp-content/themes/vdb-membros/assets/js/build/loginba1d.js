function apl_toast(arr){

  arr = arr || 0;

  if(arr != 0){

    var title = arr.title != undefined ? arr.title : false;
    var text  = arr.text  != undefined ? arr.text : false;
    var type  = arr.type  != undefined ? arr.type : false;
    var time  = arr.time  != undefined ? arr.time : 5000;

    var args  = {
      stack: 3,
      showHideTransition: 'fade',
      allowToastClose: true,
      position: 'top-center',
      hideAfter: time
    };

    if(title != false){
      args['heading'] = title;
    }

    if(text != false){
      args['text'] = text;
    }

    if(type != false){
      switch(type){

        case 'error':
          args['icon']     = 'error';
          args['bgColor']  = '#ED5465';
          args['loaderBg'] = '#ff99a4';
        break;

        case 'info':
          args['icon']     = 'info';
          args['bgColor']  = '#9398EC';
          args['loaderBg'] = '#d6d8ff';
        break;

        case 'warning':
          args['icon']     = 'warning';
          args['bgColor']  = '#f99c11';
          args['loaderBg'] = '#d88202';
        break;

        case 'success':
          args['icon']     = 'success';
          args['bgColor']  = '#42CC6F';
          args['loaderBg'] = '#8bf4ad';
        break;

      }
    }

    jQuery.toast(args);


  }else{
    console.log('Parâmetro não declarado');
  }

}


function apl_check_mail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function apl_login(){

  var form  = jQuery('#loginform');
  var reco  = jQuery('#loginrecover');
  var user  = form.find('#user_login');
  var pass  = form.find('#user_password');
  var btn   = form.find('#wp-submit');
  var title = jQuery('.login-title');
  var desc  = jQuery('.login-description');
  var reco_link = jQuery('.remember_link');
  var rem_link = jQuery('.remembered_link');
  var signup_link = jQuery('.signup_link');
  var reco_btn = jQuery('#loginrecover input[type="submit"]');

  // user.attr('placeholder','Email');
  // pass.attr('placeholder','Senha');

  // FORMULÁRIO

  jQuery('.form').data('height',jQuery('.form').height());

  // LOGIN

  btn.on('click',function(e){
    e.preventDefault();

      if(user.val() == ''){
        // apl_toast({
        //   type: 'warning',
        //   text: 'Por favor insira seu email.'
        // });
        form.addClass('error');
        user.addClass('error');
        user.parent().find('span.error').text('Insira seu email').removeClass('hide');
        user.focus();
      }

      if(pass.val() == ''){
        // apl_toast({
        //   type: 'warning',
        //   text: 'Você precisa inserir sua senha.'
        // });
        form.addClass('error');
        pass.addClass('error')
        pass.parent().find('span.error').removeClass('hide');
        pass.focus();
      }

      if(user.val() != '' && pass.val() != ''){
        form.removeClass('error');
      }

      if(user.val() != ''){
        /*if(!apl_check_mail(user.val())){
          // apl_toast({
          //   type: 'warning',
          //   text: 'Insira um email válido.'
          // });
          user.focus();
          user.addClass('error');
          user.parent().find('span.error').text('Insira um email válido').removeClass('hide');
          form.addClass('error');
        }else{*/
          user.removeClass('error');
          form.removeClass('error');
        // }
      }

      user.on('keypress',function(){
        user.removeClass('error');
        user.parent().find('.error').addClass('hide');
      });

      pass.on('keypress',function(){
        pass.removeClass('error');
        pass.parent().find('.error').addClass('hide');
      });

      if(!user.hasClass('error') && !pass.hasClass('error')){
        jQuery('.form').addClass('sending spinner');
        setTimeout(function(){form.submit()},1000);
      }

    return false;
  });

  // RECOVER PASS

  reco_link.on('click',function(e){
    e.preventDefault();
    form.addClass('animated fadeOut');
    jQuery('.form').css('max-height', '250px');
    // if(jQuery(window).width() > 680){
    //   jQuery('.form').animate({
    //     // height: jQuery('.form').data('height'),
    //     height: 250
    //   },{
    //     complete: function(){
    //       jQuery('.form').data('height',jQuery('.form').height());
    //     }
    //   });
    // }
    setTimeout(function(){
      form.hide();
      reco.removeClass('fadeOut').addClass('animated fadeIn').removeClass('hide');
      title.text('Recupere sua senha.');
      desc.text('Insira o email da sua conta abaixo.');
      reco_link.addClass('hide');
      rem_link.removeClass('hide').css('color','#333');
    },500);
    return false;
  });

   rem_link.on('click',function(e){
    e.preventDefault();
    form.removeClass('fadeOut').addClass('animated fadeIn');
    jQuery('.form').css('max-height', '400px');
    // if(jQuery(window).width() > 680){
    //   jQuery('.form').animate({
    //     height: jQuery('.form').data('height'),
    //   },{
    //     complete: function(){
    //       jQuery('.form').data('height',jQuery('.form').height());
    //     }
    //   });
    // }
    setTimeout(function(){
      form.show();
      form.removeClass('hide');
      reco.removeClass('fadeIn').addClass('fadeOut').addClass('hide');
      title.text(title.data('content'));
      desc.text(desc.data('content'));
      rem_link.addClass('hide');
      reco_link.removeClass('hide');
    },500);
    return false;
  });

  reco_btn.on('click',function(e){
    e.preventDefault();
    var mail = jQuery('#loginrecover input[type="text"]');
    if(mail.val() == ''){
      // apl_toast({
      //   type: 'warning',
      //   text: 'Por favor insira seu email.'
      // });
      reco.addClass('error');
      mail.parent().find('span.error').text('Insira seu email').removeClass('hide');
      mail.addClass('error');
      mail.focus();
    }else{
      /*if(!apl_check_mail(mail.val())){
        // apl_toast({
        //   type: 'warning',
        //   text: 'Insira um email válido.'
        // });
        mail.focus();
        mail.addClass('error');
        mail.parent().find('span.error').text('Insira um email válido').removeClass('hide');
        reco.addClass('error');
      }else{*/
        mail.removeClass('error');
        reco.removeClass('error');
      // }
    }
    mail.on('keypress',function(){
      mail.removeClass('error');
      mail.parent().find('.error').addClass('hide');
    });
    if(!reco.hasClass('error')){
      jQuery('.form').addClass('sending spinner');
      setTimeout(function(){reco.submit()},1000);
    }
    return false;
  });

  // LOSTPASSWORD

  var url = window.location.href;
  if(url.indexOf('?action=lostpassword') != -1){
    jQuery('.remember_link').trigger('click');
  }

}

jQuery(document).ready(function(){
  apl_login();
});
