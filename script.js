const cells = document.querySelectorAll('td');

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        this.classList.toggle('highlight');
    });
});