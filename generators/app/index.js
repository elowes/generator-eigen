var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
    default() {

    }
    writing() {
        this.fs.copy(
            this.templatePath('./**/*'),
            this.destinationPath('./')
        );
        this.fs.copy(
            this.templatePath('./**/.*'),
            this.destinationPath('./')
        );
    }

}