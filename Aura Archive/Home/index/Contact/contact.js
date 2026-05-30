     document.getElementById('c-form').addEventListener('submit', function(e) {
        e.preventDefault();
        this.classList.add('hidden');
        document.getElementById('c-success').classList.add('visible');
    });