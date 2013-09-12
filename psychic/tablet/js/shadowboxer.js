QZAD.Shadowboxer = function( settings ) {

  var that = this;
  this.button = settings.button;

  this.templ = function( s, data ) {
    return s.replace( /{{(.*)}}/g, function( match, p1 ) {
      return data[p1]
    });
  };

  this.init = function() {
    that.bindLaunch();
  };

  this.deinit = function() {
    that.destroyBrightcoveVideo();
    that.unbindLaunch();
  };

  this.loadBrightcoveVideo = function() {
    $(QZAD.el).trigger( 'shadowboxerlaunch' );
    var shadowboxerTemplate = $('#shadowboxer-template').html();
    var videoTemplate = $('#video-template').html();
    var videoId = that.button.data( 'video-id' );
    $('.ad').append(
      shadowboxerTemplate
    );
    $('#shadowboxer-wrapper').fadeIn( 500, function() {
      $('#shadowboxer-video-wrapper').append(
        that.templ(
          videoTemplate,
          {
            'videoId': videoId
          }
        )
      );
      brightcove.createExperiences();
    });
    that.bindDestroy();
    that.unbindLaunch();
  };

  this.destroyBrightcoveVideo = function() {
    $(QZAD.el).trigger( 'shadowboxerdestroy' );
    $('#shadowboxer-wrapper').hide().remove();
    that.bindLaunch();
    that.unbindDestroy();
  };

  this.bindLaunch = function() {
    this.button.on( 'click', this.loadBrightcoveVideo );
  };

  this.bindDestroy = function() {
    $('#shadowboxer-gloss').on( 'click', this.destroyBrightcoveVideo );
    $('#shadowboxer-x').on( 'click', this.destroyBrightcoveVideo );
  };

  this.unbindLaunch = function() {
    this.button.off( 'click', this.launchBrightcoveVideo );
  };

  this.unbindDestroy = function() {
    $('#shadowboxer-gloss').off( 'click', this.destroyBrightcoveVideo );
    $('#shadowboxer-x').off( 'click', this.destroyBrightcoveVideo );
  };

}