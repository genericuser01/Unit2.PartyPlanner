document.addEventListener('DOMContentLoaded', function () {
  const partyList = document.getElementById('partyList');
  const partyForm = document.getElementById('partyForm');

  async function fetchParties() {
    try {
      const response = await fetch('https://example.com/api/parties');
      const parties = await response.json();
      parties.forEach(addPartyToList);
    } catch (error) {
      console.error('Error fetching parties:', error);
    }
  }


  fetchParties();


  partyForm.addEventListener('submit', async function (event) {
    event.preventDefault();


    const name = document.getElementById('partyName').value;
    const date = document.getElementById('partyDate').value;
    const time = document.getElementById('partyTime').value;
    const location = document.getElementById('partyLocation').value;
    const description = document.getElementById('partyDescription').value;


    const newParty = { name, date, time, location, description };

    try {
      // Post new party to the API
      const response = await fetch('https://example.com/api/parties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParty),
      });

      if (response.ok) {
        // Add party to the list
        addPartyToList(newParty);
        // Clear the form
        partyForm.reset();
      } else {
        console.error('Failed to add party. Server response:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting party:', error);
    }
  });

  
  function addPartyToList(party) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${party.name}</strong> - ${party.date}, ${party.time} - ${party.location}<br>${party.description} <button class="delete-button">Delete</button>`;
    partyList.appendChild(li);


    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', async function () {
      try {
        // Delete party from the API
        const response = await fetch(`https://example.com/api/parties/${party.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove party from the list
          li.remove();
        } else {
          console.error('Failed to delete party. Server response:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting party:', error);
      }
    });
  }
});