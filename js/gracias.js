$(document).ready(function(){
	var Folio = sessionStorage.getItem('Folio').toLowerCase();
	if (Folio.length < 10) {
		for (let G = 0; Folio.length < 11; G++) {
			Folio = "0" + Folio;
		}
	}
	$("#spanFolioN").text(Folio);
	$("#spanhorarioN").text(sessionStorage.getItem('Horario'));
	
	console.log("folio" , Folio);

	console.log("horario" , sessionStorage.getItem('Horario'));
});