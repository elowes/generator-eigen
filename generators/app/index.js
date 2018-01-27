var Generator = require('yeoman-generator');

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
    install() {
        return this.prompt([{
            type: "confirm",
            message: 'Have you installed `cnpm`?',
            name: 'cnpm'
        }]).then((answers) => {
            if (answers.cnpm) {
                this.spawnCommandSync('cnpm', ['install'])
            } else {
                this.spawnCommandSync('npm', ['install'])
            }
        })
    }
    end() {
        this.log("Start dev server...")
        this.spawnCommand('npm', ['start'])
    }
}