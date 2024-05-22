document.addEventListener('DOMContentLoaded', () => {
    const data = [
        "техна", "шатать", "нестабильная ветка", "раскуривать",
        "чик-чик", "багофиксы", "проблемы с гитом/SVN", "мне написали с кореха",
        "драфт", "сделать по красоте", "завести бажок", "я сам напишу ему/ей",
        "упарываться/упороться", "подлизывание Софье", "работа над бесполезной задачей", "жирный прчик"
    ];

    shuffleArray(data);

    const table = document.querySelector('table');
    let index = 0;

    for (let i = 0; i < 4; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('td');
            cell.textContent = data[index++];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    const cells = document.querySelectorAll('td');

    cells.forEach(cell => {
        const cellId = cell.textContent; 
        const isHighlighted = localStorage.getItem(cellId); 

        if (isHighlighted === 'true') {
            cell.classList.add('highlight'); 
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            this.classList.toggle('highlight');

            const cellId = this.textContent;
            const isHighlighted = this.classList.contains('highlight');
            localStorage.setItem(cellId, isHighlighted.toString());

            checkBingo();
        });
    });

    function checkBingo() {
        const rows = document.querySelectorAll('table tr');
        const columnsCount = rows[0].querySelectorAll('td').length;
    
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            let allGreen = true;
    
            cells.forEach(cell => {
                if (!cell.classList.contains('highlight')) {
                    allGreen = false;
                }
            });
    
            if (allGreen) {
                saveWinData(cells);
                openModal();
                resetGame();
                return;
            }
        }
    
        for (let col = 0; col < columnsCount; col++) {
            let allGreen = true;
    
            for (let row = 0; row < rows.length; row++) {
                const cell = rows[row].querySelectorAll('td')[col];
                if (!cell.classList.contains('highlight')) {
                    allGreen = false;
                    break;
                }
            }
    
            if (allGreen) {
                saveWinData(cells);
                openModal();
                resetGame();
                return;
            }
        }
    }
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    function resetGame() {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.classList.remove('highlight');
        });

        cells.forEach(cell => {
            localStorage.removeItem(cell.textContent);
        });

        shuffleArray(data);
        let index = 0;

        const rows = document.querySelectorAll('table tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                cell.textContent = data[index++];
            });
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];

    function openModal() {
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    closeBtn.onclick = function() {
        closeModal();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    function saveWinData(cells) {
        let winsData = JSON.parse(localStorage.getItem('winsData')) || [];

        const win = [];
        cells.forEach(cell => {
            win.push(cell.textContent);
        });

        winsData.push(win);

        localStorage.setItem('winsData', JSON.stringify(winsData));
    }
});