(function(){

  angular.module('contactModule',['ngMap']).

  controller('ContactCtrl',['jumboBackgroundService','$scope','$window','$document','content','sendMailService',
  	function(jumboBackgroundService,$scope,$window,$document,content,sendMailService){

  	var ContactCtrl = this;
  	var google = $window.google;

    this.user = {
    	name:"",
    	email: "",
    	tel:"",
    	msg : ""
	 };

  	jumboBackgroundService.setSmall(true);
    jumboBackgroundService.setVisible();

    this.resetContactForm = function(){
        for(key in ContactCtrl.user){
          ContactCtrl.user[key] = "";
        }

      $scope.contactForm.$setUntouched();
    };

    this.animateSending = function(){

    	/* TODO: This should be translated to Angular
		 */
    	$('.send-plane').addClass('send-active');

    };

    this.animateSentOK = function(){

  		setTimeout(function(){
  			$('.send-check').fadeIn();
  		},500);

  		setTimeout(function(){
  			$('.send-check').addClass('send-active');
  		},1000);

    };

    this.animateSentError = function(){
      setTimeout(function(){
        $('.send-check').fadeIn();
      },500);

      setTimeout(function(){
        $('.send-check').addClass('send-error');
      },1000);

    };

    this.animateAirplaneBack = function(){

		/* TODO: This should be translated to Angular
		 */
  		  setTimeout(function(){
    			$('.send-check').fadeOut().removeClass('send-active');
    			$('.send-plane').removeClass('send-active');
    		},4000);
    };

    this.send = function(){

      ContactCtrl.animateSending();

      sendMailService.sendContactPost(ContactCtrl.user)
      .success(function(data, status, headers, config){
        if ( "1" == data ){
          ContactCtrl.animateSentOK();
          ContactCtrl.animateAirplaneBack();
          ContactCtrl.resetContactForm();
        }else{
          ContactCtrl.animateSentError();
          ContactCtrl.animateAirplaneBack();
        }

      })
      .error(function(data, status, headers, config) {
        ContactCtrl.animateSentError();
        ContactCtrl.animateAirplaneBack();
      });
  

  
    	
    };





  }]);

})();