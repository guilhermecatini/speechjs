window.__speech = (function(){
	
	var recognizer = null

	// Testa compatibilidade
	var _initPage = function(lang) {
		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null
		if (!window.SpeechRecognition) {
			alert('NAVEGADOR SEM SUPORTE.')
		} else {
			recognizer            = new window.SpeechRecognition()
			var transcription     = document.getElementById("transcription")
			recognizer.continuous = true
			recognizer.lang       = lang
			
			recognizer.onresult = function(event){
				_executeEventAudio(event.results[0][0].transcript)
				//for (var i = event.resultIndex; i < event.results.length; i++) {
				//	if(event.results[i].isFinal){
				//		transcription.textContent = event.results[i][0].transcript+' (Taxa de acerto [0/1] : ' + event.results[i][0].confidence + ')';
				//	}else{
				//		transcription.textContent += event.results[i][0].transcript;
				//	}
				//}
			}
		}
	}
	
	
	var _capturaAudio = function(tempo = 3000) {
		recognizer.start()
		setTimeout(function(){
			recognizer.stop()
		},tempo)
	}
	
	
	var _executeEventAudio = function(audio, commands) {
		
		
		var commands = {
			"abrir central de tearefas" : function(){ window.location.href = "http://terra.com.br"},
			"abrir youtube" : function(){ window.location.href = "http://youtube.com.br"}				
		}
		
		var hasAudio = false;
		for(var i in commands){
		  if(i == audio.toLowerCase()) {
			var execute = commands[i];
			hasAudio = true;
			execute();
		  }
		  
		}
		
		(!hasAudio) ? window.open("https://www.google.com.br/search?source=hp&q=" + audio, '_blank') : "";
	
		
	}
	

	
	return {
		initPage: _initPage,
		capturaAudio: _capturaAudio,
		executeEventAudio: _executeEventAudio
	}

})()