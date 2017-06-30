// Scope-safe constructor for Cloze Deletion Cards
var ClozeCard = function(text, cloze){
	if (this instanceof ClozeCard){
		this.fullText = text;
		this.cloze = cloze;

		// Check if "cloze" is contained in "fullText"
		var found = this.fullText.search(this.cloze);
		if (found === -1){
			this.partial = "Error: '" + this.cloze + "' is not in '" + this.fullText +"'";
			// // Custom error message. Actually throws an error
			// var err = new Error("'" + this.cloze + "' is not in '" + this.fullText +"'");
			// throw err;
		}
		else{
			this.partial = this.fullText.split(this.cloze).join("...");
		}
	}
	else {
		return new ClozeCard(text, cloze);
	}
}

module.exports = ClozeCard;