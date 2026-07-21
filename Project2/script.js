// Change this line in your frontend script:
const API_URL = 'http://localhost:5000/api/items';

        // 1. Fetch and display items from backend (GET Request)
        async function fetchItems() {
            try {
                const response = await fetch(API_URL);
                const result = await response.json();
                
                const itemList = document.getElementById('itemList');
                itemList.innerHTML = '';

                if (result.success && result.data.length > 0) {
                    result.data.forEach(item => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <span>${item.title}</span>
                            <span class="status">${item.status}</span>
                        `;
                        itemList.appendChild(li);
                    });
                } else {
                    itemList.innerHTML = '<li style="border-left-color: #cbd5e0;">No items found.</li>';
                }
            } catch (error) {
                console.error('Error fetching items:', error);
                document.getElementById('itemList').innerHTML = '<li style="border-left-color: #e53e3e; color: #e53e3e;">Server offline or unreachable.</li>';
            }
        }

        // 2. Handle form submission to create a new item (POST Request)
        document.getElementById('itemForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = document.getElementById('titleInput').value;
            const status = document.getElementById('statusInput').value;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, status })
                });

                const result = await response.json();

                if (result.success) {
                    document.getElementById('titleInput').value = ''; // Reset input field
                    fetchItems(); // Refresh the list automatically
                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error('Error creating item:', error);
            }
        });

        // Load items when the page opens
        fetchItems();