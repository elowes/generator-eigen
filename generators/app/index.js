var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    default() {
    }
    writing() {
        return this.prompt([{
            type: "input",
            name: "name",
            message: "Your project name",
            default: "generator-eigen"
        }, {
            type: "input",
            name: "description",
            message: "Your project description",
            default: ""
        }, {
            type: "input",
            name: "author",
            message: "Your project author",
            default: "generator-eigen"
        }]).then((answers) => {
            this.fs.copy(
                this.templatePath('../sources/**/*'),
                this.destinationRoot()
            );
            this.fs.copy(
                this.templatePath('../sources/**/.*'),
                this.destinationRoot()
            );
            this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('index.html'),
                {
                    name: answers.name
                }
            );
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'),
                {
                    name: answers.name,
                    author: answers.author,
                    description: answers.description
                }
            );
            this.fs.copyTpl(
                this.templatePath('webpack.config.prod.js'),
                this.destinationPath('webpack.config.prod.js'),
                {
                    name: answers.name
                }
            )
        })


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