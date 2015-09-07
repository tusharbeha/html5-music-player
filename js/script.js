$(document).ready(function(){


	var tracks = [], currentTrack = 0, j=0, audioArray = [], nowPlaying;
	
//Drag and drop functionality
	var dropZone = $('#drop-zone');
	$(document).on('dragover', function(event){
		if(event.preventDefault){
			event.preventDefault();	
		}
		dropZone.addClass("dragged");
		$('.hidden').show();
	});

	$(document).on("dragenter dragleave dragover drop", function(event){
		if(event.preventDefault){
			event.preventDefault();
		}
	});

	$(document).on("dragleave drop",function(){
		if(event.preventDefault){
			event.preventDefault();
		}
		dropZone.removeClass("dragged");
		$('.hidden').hide();
	});

	$(dropZone).on("drop", function(event){
		if(event.preventDefault){
			event.preventDefault();
		}
		//get file data
		var files = event.originalEvent.dataTransfer.files;
		
		var count = tracks.length;
		for(var i=0;i<files.length;i++){
			if(files[i].type.match(/audio\/(mp3|mpeg)/)){
			var url = URL.createObjectURL(files[i]);
			var obj = {
				"name" : files[i].name,
				"url" : url
			}
			$("#list").append('<li id="track'+(i+count)+'">'+ files[i].name +'</li>');
			tracks.push(obj);
			$(".audio").append($('<audio>'));
			}
		}

		$("audio").each(function(j){
			$(this).addClass("tracks");
			$(this).attr("id","track"+j).attr('src', tracks[j].url);
			j++;
		});

		audioArray = $(".tracks");
		nowPlaying = audioArray[currentTrack];
		//nowPlaying.load();
		dropZone.removeClass("dragged");
		$('.hidden').hide();

	});



	//Audio Player
	$(".btn-play").on("click", function(){
		$("#list #track"+currentTrack).removeClass("selected");
		if(nowPlaying.paused){
			nowPlaying.load();
			nowPlaying.play();
		}
		else{
			nowPlaying.pause();
		}
		$("#list #track"+currentTrack).addClass("selected");
		DisplayTitle(currentTrack);
	});

	$(".btn-stop").on("click", function(){
		nowPlaying.pause();
		nowPlaying.currentTime=0;
		$("#list #track"+currentTrack).removeClass("selected");

	});

	$(".btn-next").on("click", function(){
		$("#list #track"+currentTrack).removeClass("selected");

		nowPlaying.pause();
		currentTrack = (currentTrack+1)%audioArray.length;
		nowPlaying = audioArray[currentTrack];
		nowPlaying.load();
		nowPlaying.play();
		$("#list #track"+currentTrack).addClass("selected");
		DisplayTitle(currentTrack);
	});

	$(".btn-prev").on("click", function(){
		$("#list #track"+currentTrack).removeClass("selected");

		nowPlaying.pause();
		currentTrack = (currentTrack+audioArray.length-1)%audioArray.length;
		nowPlaying = audioArray[currentTrack];
		nowPlaying.load();
		nowPlaying.play();
		$("#list #track"+currentTrack).addClass("selected");
		DisplayTitle(currentTrack);
	});

	$("#list").on("dblclick", "li", function(){
		nowPlaying.pause();
		//console.log(currentTrack);
		for(var i=0;i<audioArray.length;i++){
			if(audioArray[i] === nowPlaying){
				currentTrack = i;
			}
		}

		$("#list #track"+currentTrack).removeClass("selected");
		var id = $(this).attr('id');
		nowPlaying = $("audio#"+id).get(0);
		
		for(var i=0;i<audioArray.length;i++){
			if(audioArray[i] === nowPlaying){
				currentTrack = i;
			}
		}
		nowPlaying.load();
		nowPlaying.play();
		$(this).addClass("selected");
		DisplayTitle(currentTrack);
	});

	function DisplayTitle(currTrack){
		var title = $("#list #track"+currTrack).html();

		$(".now-playing").html('<p>'+title+'</p>');
	}

});