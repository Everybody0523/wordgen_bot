class OptionStore {
    constructor() {
        this.help = false;
        this.maxChars = -1;
        this.minChars= -1;
        this.words=200; 
    }
}


// Regular Expresion Patterns
var maxCharExp = /--maxChars=[0-9]+/
var minCharExp = /--minChar=[0-9]+/
var wordsExp = /--words=[0-9]+/


/// @function strip_prefix
/// Strips the prefix of the command
/// @param {String} Command to be stripped
/// @param {String} Prefix of command.
/// @return {String} Command with prefix stripped
function strip_prefix(cmd, prefix) {
    cmd = String(cmd);
    prefix = String(prefix);
    if (!(cmd.includes(prefix))) {
        return cmd;
    }
    else {
        let stripAmount = prefix.length + 1;
        return cmd.slice(stripAmount);
    }
}


/// @function find_options
/// Determines which options are specified in any command.
/// @param {String} Command to search for specified options in
/// @return {Object} Dict indicating options specifed and their values, if any.
function find_options(cmd){
    let output = new OptionStore();
    cmd = String(cmd);
    let opt_arr = cmd.split(' ');
    for (let i = 1; i < opt_arr.length; i++) {
        if (opt_arr[i] === "--help" || opt_arr[i] === "-h"){
            output.help = true;
            return output;
        }
        else if (maxCharExp.test(opt_arr)){
            console.log(opt_arr[i]);
        }
        else if (minCharExp.test(opt_arr)){
            console.log(opt_arr[i]);
        }
        else if (wordsExp.test(opt_arr)){
            numWords = parseInt(opt_arr[i].slice(8), 10);
            if (!(isNaN(numWords))){
                output.words = numWords;
            }
            else{
                console.log("Invalid input for words: " + opt_arr[i]);
            }
        }
        else{
            console.log("doom");
        }
    } 
    return output;
} 


module.exports = {
    /// @function print_message_content
    /// Prints content of a message
    /// @param {String} content of the message
    print_message_content: (message) => {
        console.log(message.content);
    },
    
    parse_message_contents: (message, prefix) => {
        let prefixStrippedCmd = strip_prefix(message, prefix); 
        console.log(prefixStrippedCmd);
        return find_options(prefixStrippedCmd);
    }
};

