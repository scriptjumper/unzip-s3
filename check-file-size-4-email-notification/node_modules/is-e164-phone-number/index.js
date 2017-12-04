'use strict';
module.exports = input => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected \`phone\` to be of type \`string\`, got \`${typeof input}\``);
	}

	return /^\+?[1-9]\d{4,14}$/.test(input);
};
