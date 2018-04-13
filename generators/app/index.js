var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    default() {
    }
    writing() {
        return this.prompt([{
            type: "input",
            name: "name",
            message: "[1/4] Project name:",
            default: "generator-eigen"
        }, {
            type: "input",
            name: "description",
            message: "[2/4] Project description:",
            default: "no description"
        }, {
            type: "input",
            name: "author",
            message: "[3/4] Project author:",
            default: "generator-eigen"
        }, {
            type: "confirm",
            message: "[4/4] Do you need `antd` in your project?",
            name: "antd"
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
                    description: answers.description,
                    antd: answers.antd
                }
            );
            this.fs.copyTpl(
                this.templatePath('.babelrc'),
                this.destinationPath('.babelrc'),
                {
                    antd: answers.antd
                }
            );
            this.fs.copyTpl(
                this.templatePath('webpack.config.prod.js'),
                this.destinationPath('webpack.config.prod.js'),
                {
                    name: answers.name
                }
            );
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'),
                {
                    name: answers.name,
                    description: answers.description                    
                }
            )
        })


    }
    install() {
        return this.prompt([{
            type: "list",
            choices: ['npm', 'cnpm', 'yarn'],
            message: '[1/1] Which tools to install dependence?',
            name: 'tool'
        },]).then((answers) => {
            if (answers.tool === 'cnpm') {
                this.spawnCommandSync('cnpm', ['install'])
            } 
            if (answers.tool === 'npm') {
                this.spawnCommandSync('npm', ['install'])
            }
            if (answers.tool === 'yarn') {
                this.spawnCommandSync('yarn', ['install'])                
            }
        })
    }
    end() {
        this.log("run `npm start` to start dev server...")
        this.spawnCommand('npm', ['start'])
    }
}