var App = function() {
	var that = this;
	var playerString = '\
	<object id="myExperience2715192830001" class="BrightcoveExperience">\
	<param name="bgcolor" value="#000000" />\
	<param name="width" value="100%" />\
	<param name="height" value="480" />\
	<param name="playerID" value="2593615286001" />\
	<param name="playerKey" value="AQ~~,AAABnwxttEE~,HpQpfOmVc2v-HDVjX5evwXVa7AvwSOW1" />\
	<param name="isVid" value="true" />\
	<param name="isUI" value="true" />\
	<param name="dynamicStreaming" value="true" />\
	<param name="includeAPI" value="true" />\
	<param name="htmlFallback" value="true" />\
	<param name="templateLoadHandler" value="videoTemplateLoadedHandler" />\
	<param name="templateReadyHandler" value="videoTemplateReadyHandler" />\
	<param name="wmode" value="transparent" />\
	<param name="@videoPlayer" value="2735794247001" />\
	</object>';

	this.init = function() {
		that.hasBeenInit = true;
		$('#watch-now-button').on( 'click', that.watchNowButtonHandler );
		$('#x').on( 'click', that.xHandler );
	}
	this.on = function() {
		if ( !that.hasBeenInit ) {
			that.init();
		}
	}
	this.watchNowButtonHandler = function() {
		$('#video-wrapper').css( 'top', 0 );
		$('#video-wrapper').prepend( playerString );
		brightcove.createExperiences();
		$('#final-bg').attr( 'src', 'images/final-bg.jpg' );
	}
	this.xHandler = function() {
		$('#video-wrapper').css( 'top', -550 );
		modVP.pause();
		videoCompleteHandler();
	}
	window.videoCompleteHandler = function() {
		$('#final-frame').show();
	}
	window.videoTemplateLoadedHandler = function( experienceId ) {
		player = brightcove.api.getExperience( experienceId );
		modVP = player.getModule( brightcove.api.modules.APIModules.VIDEO_PLAYER );
		APIModules = brightcove.api.modules.APIModules;
	}
	window.videoTemplateReadyHandler = function( e ) {
		modVP.addEventListener( brightcove.api.events.MediaEvent.COMPLETE, videoCompleteHandler );
		videoPlayer = player.getModule(APIModules.VIDEO_PLAYER);
		contentModule = player.getModule(APIModules.CONTENT);

		videoPlayer.getCurrentVideo( function (videoDTO) {
			videoDTO.displayName = "";
			contentModule.updateMedia(videoDTO, function (newVideoDTO) {
				videoPlayer.play();
			});
		});

		$('#x').show();
	}
	this.off = function() {
		$('#video-wrapper').css( 'top', -550 );
		modVP.pause();
		$('#final-frame').hide();
	}
};