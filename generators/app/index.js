var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
    default() {
        mkdirp(this.destinationPath('./src/assets'));
        mkdirp(this.destinationPath('./src/components'));
        mkdirp(this.destinationPath('./src/models'));
        mkdirp(this.destinationPath('./src/routes/HomePage'));
        mkdirp(this.destinationPath('./src/services'));
        mkdirp(this.destinationPath('./src/utils'));
    }
    writing() {
        this.fs.copy(
            this.templatePath('./*'),
            this.destinationPath('./')
        );
        this.fs.copy(
            this.templatePath('./src/*'),
            this.destinationPath('./src/')
        );
        this.fs.copy(
            this.templatePath('./src/assets/*'),
            this.destinationPath('./src/assets/')
        );
        this.fs.copy(
            this.templatePath('./src/models/*'),
            this.destinationPath('./src/models/')
        );
        this.fs.copy(
            this.templatePath('./src/routes/*'),
            this.destinationPath('./src/routes/')
        );
        this.fs.copy(
            this.templatePath('./src/routes/HomePage/*'),
            this.destinationPath('./src/routes/HomePage/')
        );
        this.fs.copy(
            this.templatePath('./.*'),
            this.destinationPath('./')
        );
    }
    
}