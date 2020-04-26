const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
};


class Utils {

	static getWords(str) {
		if (str === null) {
			return [];
		}

		let words = [];

		//check if words list is empty if so then insert the first word into the array

		if (!words.length) {
			let word = str.split(" ")[0];
			words.push({"text": word, "value": 1});
		}

		//convert string to array so you can iterate through it
		str = str.split(" ");

		//iterate through the array starting from the first position because word at the position 0 is already in the array
		for (let i = 1; i < str.length; i++) {

			//iterate through the words list to the see if the word has appeared yet
			let wordExists = false;

			for (let j = 0; j < words.length; j++) {
				if (str[i] == words[j].text) {

					//word exists in word so count one up
					words[j].value += 1;

					//used to prevent the word from being inserted twice
					wordExists = true;
					break;
				}
			}

			//insert new word in words if it
			if (!wordExists) {
				words.push({"text": str[i], "value": 1});
			}
		}
		return words;
	}


}

export default Utils;
