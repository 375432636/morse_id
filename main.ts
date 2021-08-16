let morseToChar = {
    "A" : ".-",
    "B" : "-...",
    "C" : "-.-.",
    "D" : "-..",
    "E" : ".",
    "F" : "..-.",
    "G" : "--.",
    "H" : "....",
    "I" : "..",
    "J" : ".---",
    "K" : "-.-",
    "L" : ".-..",
    "M" : "--",
    "N" : "-.",
    "O" : "---",
    "P" : ".--.",
    "Q" : "--.-",
    "R" : ".-.",
    "S" : "...",
    "T" : "-",
    "U" : "..-",
    "V" : "...-",
    "W" : ".--",
    "X" : "-..-",
    "Y" : "-.--",
    "Z" : "--..",
    "1" : ".----",
    "2" : "..---",
    "3" : "...--",
    "4" : "....-",
    "5" : ".....",
    "6" : "-....",
    "7" : "--...",
    "8" : "---..",
    "9" : "----.",
    "0" : "-----",
}

let morseChar = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
let morseCode = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----"]
let DotS = sprites.create(img`
    . . . . .
    . . 3 . .
    . . . . .
`)
let Question = sprites.create(img`
    . . . . .
    . . 3 . .
    . . . . .
`)
let input_code = ""
let choise_chr_index = 0
let choise_chr = ""
function choise() {
    
    choise_chr_index = randint(0, morseCode.length + 1)
    choise_chr = morseChar[choise_chr_index]
    input_code = ""
}

function dot() {
    
    input_code = input_code + "."
    music.playTone(Note.C5, 100)
    music.rest(50)
}

function dash() {
    
    input_code = input_code + "-"
    music.playTone(Note.C5, 300)
    music.rest(50)
}

function space() {
    
    input_code = input_code + " "
}

function show() {
    // game.splash(input_code)
    DotS.say(input_code)
    Question.say(choise_chr)
}

controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function on_button_event_left_pressed() {
    dash()
    show()
    
})
controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function on_button_event_right_pressed() {
    dot()
    show()
    
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function input_space() {
    space()
    show()
    
})
//  def on_button_event_up_pressed():
//      global input_code
//      input_code = input_code[:-1]
//      show()
//      pass
//  controller.player1.on_button_event(ControllerButton.B , ControllerButtonEvent.PRESSED, on_button_event_up_pressed)
function on_event_pressed() {
    
}

controller.A.onEvent(ControllerButtonEvent.Repeated, function parse() {
    
    if (morseCode[choise_chr_index] == input_code) {
        game.splash("correct answer")
        info.changeScoreBy(1)
    } else {
        //  game.splash("wrong answer "+choise_chr+": "+morseCode[choise_chr_index]+" you: "+input_code)
        game.splash("wrong answer " + choise_chr + ": " + morseCode[choise_chr_index])
        info.changeLifeBy(-1)
    }
    
    choise()
    show()
    
})
function mode_1() {
    Question.setPosition(30, 30)
    info.setScore(0)
    info.setLife(3)
    // choise()
    show()
    game.splash("左键:-/ 右键:.")
    game.splash("B:清除/ 长按:空格")
    game.splash("A:无/ 长按:提交")
}

game.ask("请选择模式", "A: ID")
mode_1()
