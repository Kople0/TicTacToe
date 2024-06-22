document.addEventListener('DOMContentLoaded', function() {
    const fields = document.querySelectorAll('.tictactoeField .field');
    const field = document.getElementById('tictactoeField');
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    let oTurn = true;
    const positions = [
        ['field1', 'field2', 'field3'], 
        ['field4', 'field5', 'field6'],
        ['field7', 'field8', 'field9'],
        ['field1', 'field4', 'field7'],
        ['field2', 'field5', 'field8'],
        ['field3', 'field6', 'field9'],
        ['field1', 'field5', 'field9'],
        ['field3', 'field5', 'field7']
    ];
    
    function resView() {
        field.style.left = (window.innerWidth - 340) / 2 + 'px';
        field.style.top = (window.innerHeight - 340) / 2 + 'px';
    }

    fields.forEach(field => {
        field.addEventListener('click', function() {
            if (this.classList.contains('fieldO') || this.classList.contains('fieldX')) {
                return;
            }

            if (oTurn) {
                this.classList.add('fieldO');
            } else {
                this.classList.add('fieldX');
            }

            this.classList.add('selected');
            oTurn = !oTurn;

            let gameWon = false;
            let winner = '';

            positions.forEach(position => {
                let fieldOCount = 0;
                let fieldXCount = 0;
                position.forEach(id => {
                    const field = document.getElementById(id);
                    if (field.classList.contains('fieldO')) {
                        fieldOCount++; 
                    }
                    if (field.classList.contains('fieldX')) {
                        fieldXCount++;
                    }
                });
                if (fieldOCount === 3) {
                    winner = 'Blue';
                    gameWon = true;
                }
                if (fieldXCount === 3) {
                    winner = 'Red';
                    gameWon = true;
                }
            });

            if (gameWon) {
                sleep(500).then(() => {
                    fields.forEach(field => {
                        field.classList.remove('fieldO', 'fieldX', 'selected');
                    });
                    oTurn = true;
                    return;
                });
            }

            let filledSquares = 0;
            fields.forEach(field => {
                if (field.classList.contains('selected')) {
                    filledSquares++;
                }
            });

            if (filledSquares === 9) {
                fields.forEach(field => {
                    field.classList.remove('fieldO', 'fieldX', 'selected');
                });
                oTurn = true;
            }
        });
    });

    setInterval(resView, 1);
});
