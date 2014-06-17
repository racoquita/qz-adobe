var AdApp = {
	playerString: '\
	<object id="myExperience2719597149001" class="BrightcoveExperience">\
	<param name="bgcolor" value="#000000" />\
	<param name="width" value="267" />\
	<param name="height" value="150" />\
	<param name="playerID" value="2593615286001" />\
	<param name="playerKey" value="AQ~~,AAABnwxttEE~,HpQpfOmVc2v-HDVjX5evwXVa7AvwSOW1" />\
	<param name="isVid" value="true" />\
	<param name="isUI" value="true" />\
	<param name="dynamicStreaming" value="true" />\
	<param name="includeAPI" value="true" />\
	<param name="htmlFallback" value="true" />\
	<param name="templateLoadHandler" value="AdApp.videoTemplateLoadedHandler" />\
	<param name="templateReadyHandler" value="AdApp.videoTemplateReadyHandler" />\
	<param name="wmode" value="transparent" />\
	<param name="@videoPlayer" value="2719597149001" />\
	</object>\
	',
	init: function() {
		this.hasBeenInit = true;
		$('#watch-now-button').on( 'click', this.watchNowButtonHandler );
		$('#x').on( 'click', this.xHandler );
	},
	on: function() {
		if ( !this.hasBeenInit ) {
			this.init();
		}
	},
	watchNowButtonHandler: function() {
		var that = AdApp;
		$('#video-wrapper').css( 'top', 0 );
		$('#video-wrapper').prepend( that.playerString );
		brightcove.createExperiences();
		$('#final-bg').attr( 'src', 'images/final-bg.jpg' );
	},
	xHandler: function() {
		var that = AdApp;
		$('#video-wrapper').css( 'top', -150 );
		that.modVP.pause();
		that.videoCompleteHandler();
	},
	videoCompleteHandler: function() {
		$('#final-frame').show();
	},
	videoTemplateLoadedHandler: function( experienceId ) {
		var that = AdApp;
		that.player = brightcove.api.getExperience( experienceId );
		that.modVP = that.player.getModule( brightcove.api.modules.APIModules.VIDEO_PLAYER );
		$('#watch-now-button').fadeIn( 300 );
	},
	videoTemplateLoadedHandler: function( experienceId ) {
		var that = AdApp;
		that.player = brightcove.api.getExperience( experienceId );
		that.modVP = that.player.getModule( brightcove.api.modules.APIModules.VIDEO_PLAYER );
	},
	videoTemplateReadyHandler: function( e ) {
		var that = AdApp;
		that.modVP.addEventListener( brightcove.api.events.MediaEvent.COMPLETE, that.videoCompleteHandler );
		$('#x').show();
	},
	off: function() {
		$('#video-wrapper').css( 'top', -150 );
		this.modVP.pause();
		$('#final-frame').hide();
	}
}
