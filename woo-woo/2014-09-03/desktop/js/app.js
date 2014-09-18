var App = function() {
	var that = this;

	this.on = function() {
		$('.cta').on('click', function(e){

			$('.video-container').show()
			$('.video').html(that.getPlayer());

			brightcove.createExperiences();

			$('.frame-start').removeClass('show');
			$('.frame-end').addClass('show');
		});

		$('.video-cta').on('click', function (e) {
			that.videoPlayer.pause();
		});

		$('.x').on('click', function(){
			that.closeVideo();
		});
	}
	this.off = function() {
		that.closeVideo();
		$('.cta').off();
		$('.faux-ixtrack').off();
		$('.video-cta').off();

		$('.frame-start').addClass('show');
		$('.frame-end').removeClass('show');
	}
	that.closeVideo = function() {
		$('.video-container').hide();
		$('.video').empty();
	}
	this.getPlayer = function() {
		return '<object id="player3558926841001" class="BrightcoveExperience">\
			<param name="bgcolor" value="#000000" />\
			<param name="width" value="100%" />\
			<param name="height" value="100%" />\
			<param name="playerID" value="2593615286001" />\
			<param name="playerKey" value="AQ~~,AAABnwxttEE~,HpQpfOmVc2uIuYoJ5Ua7iU_HbguYUAep" />\
			<param name="isVid" value="true" />\
			<param name="isUI" value="true" />\
			<param name="dynamicStreaming" value="true" />\
			<param name="htmlFallback" value="true" />\
			<param name="includeAPI" value="true" />\
			<param name="templateLoadHandler" value="onTemplateLoad" />\
			<param name="templateReadyHandler" value="onTemplateReady" />\
			<param name="wmode" value="transparent" />\
			<param name="@videoPlayer" value="3639489388001" />\
			<param name="autoStart" value="true" />\
		</object>';
	}
	window.onTemplateLoad = function(experienceID) {
		that.player = brightcove.api.getExperience(experienceID);
		that.APIModules = brightcove.api.modules.APIModules;
	}
	window.onTemplateReady = function() {
		that.videoPlayer = that.player.getModule(that.APIModules.VIDEO_PLAYER);
		that.experienceModule = that.player.getModule(that.APIModules.EXPERIENCE);
		that.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, function(){
			$('.x').trigger('click');
		});
		that.experienceModule.getReady(function(){
			that.videoPlayer.play();
		});
	}
};