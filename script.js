let sequences = [];
let headers = [];

function showHomeScreen() {
    document.getElementById('homeScreen').classList.add('active');
    document.getElementById('studyScreen').classList.remove('active');
    document.getElementById('fileInput').value = '';
    document.getElementById('sequencesTable').style.display = 'none';
}

function showStudyScreen() {
    document.getElementById('homeScreen').classList.remove('active');
    document.getElementById('studyScreen').classList.add('active');
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            sequences = text.split(/>.*\n/).filter(seq => seq.trim() !== '');
            headers = text.match(/>.*\n/g).map(header => header.trim());
            const tableBody = document.querySelector('#sequencesTable tbody');
            tableBody.innerHTML = '';
            sequences.forEach((seq, index) => {
                const row = document.createElement('tr');
                const gcCell = document.createElement('td');
                const lengthCell = document.createElement('td');
                const headerCell = document.createElement('td');
                const gcButton = document.createElement('button');
                gcButton.textContent = 'GC';
                gcButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect';
                gcButton.addEventListener('click', () => showGCContent(index));
                gcCell.appendChild(gcButton);
                lengthCell.textContent = seq.replace(/\n/g, '').length;
                headerCell.textContent = headers[index];
                row.appendChild(gcCell);
                row.appendChild(lengthCell);
                row.appendChild(headerCell);
                tableBody.appendChild(row);
            });
            document.getElementById('sequencesTable').style.display = 'table';
        };
        reader.readAsText(file);
    } else {
        alert('Failed to load file');
    }
});

function showGCContent(index) {
    const sequence = sequences[index].replace(/\n/g, '');
    const gcCount = (sequence.match(/[GC]/gi) || []).length;
    const gcContent = (gcCount / sequence.length * 100).toFixed(2);
    document.getElementById('gcContent').textContent = `GC-Content: ${gcContent}%`;
    document.getElementById('gcPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('gcPopup').style.display = 'none';
}