document.addEventListener('DOMContentLoaded', () => {
    console.log('App loaded!');
  
    const mainContent = document.getElementById('main-content');
  
    // Load Dashboard by default
    loadDashboard();
  
    // Sidebar Button Event Listeners
    document.getElementById('dashboard-button').addEventListener('click', (e) => {
      e.preventDefault();
      loadDashboard();
    });
  
    document.getElementById('contributions-button').addEventListener('click', (e) => {
      e.preventDefault();
      loadContributions();
    });
  
    document.getElementById('rewards-button').addEventListener('click', (e) => {
      e.preventDefault();
      loadRewards();
    });
  
    // Function to load Dashboard
    function loadDashboard() {
      mainContent.innerHTML = `
        <header class="header">
          <h1>Dashboard</h1>
          <div class="user-profile">
            <img src="./profile.png" alt="User Avatar">
            <span>John Doe</span>
          </div>
        </header>
  
        <!-- Stats Cards -->
        <div class="stats">
          <div class="card">
            <h3>Total Contributions</h3>
            <p>1,200 kg</p>
          </div>
          <div class="card">
            <h3>Reward Points</h3>
            <p>12,000 pts</p>
          </div>
          <div class="card">
            <h3>Recent Contribution</h3>
            <p>50 kg</p>
          </div>
        </div>
  
        <!-- Garbage Pickup Schedule -->
        <section class="schedule">
          <h2>Garbage Pickup Schedule</h2>
          <div class="calendar">
            <div class="calendar-header">
              <button id="prev-month"><i class="fas fa-chevron-left"></i></button>
              <h3 id="current-month">October 2023</h3>
              <button id="next-month"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="calendar-grid" id="calendar-grid">
              <!-- Calendar days will be populated here -->
            </div>
          </div>
        </section>
      `;
  
      // Initialize Calendar
      initializeCalendar();
    }
  
    // Function to load Contributions
    function loadContributions() {
      mainContent.innerHTML = `
        <header class="header">
          <h1>Contribution History</h1>
          <div class="user-profile">
            <img src="./profile.png" alt="User Avatar">
            <span>John Doe</span>
          </div>
        </header>
  
        <!-- Contribution History Table -->
        <section class="contribution-history">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Quantity (kg)</th>
                <th>Points Earned</th>
              </tr>
            </thead>
            <tbody id="contribution-table">
              <!-- Contribution data will be populated here -->
            </tbody>
          </table>
        </section>
      `;
  
      // Populate Contribution History
      const contributionTable = document.getElementById('contribution-table');
      const contributions = [
        { date: '2023-10-01', quantity: 50, points: 500 },
        { date: '2023-09-28', quantity: 30, points: 300 },
        { date: '2023-09-25', quantity: 20, points: 200 },
      ];
  
      contributions.forEach((contribution) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${contribution.date}</td>
          <td>${contribution.quantity} kg</td>
          <td>${contribution.points} pts</td>
        `;
        contributionTable.appendChild(row);
      });
    }
  
    // Function to load Rewards
    function loadRewards() {
      mainContent.innerHTML = `
        <header class="header">
          <h1>Rewards</h1>
          <div class="user-profile">
            <img src="./profile.png" alt="User Avatar">
            <span>John Doe</span>
          </div>
        </header>
  
        <!-- Rewards Summary -->
        <div class="stats">
          <div class="card">
            <h3>Total Rewards Earned</h3>
            <p id="total-rewards">12,000 pts</p>
          </div>
          <div class="card">
            <h3>Rewards Used</h3>
            <p id="rewards-used">2,000 pts</p>
          </div>
          <div class="card">
            <h3>Rewards Available</h3>
            <p id="rewards-available">10,000 pts</p>
          </div>
        </div>
  
        <!-- Convert Rewards to Money -->
        <section class="convert-rewards">
          <h2>Convert Rewards to Money</h2>
          <div class="convert-form">
            <label for="reward-amount">Enter Reward Points to Convert:</label>
            <input type="number" id="reward-amount" placeholder="e.g., 1000">
            <button id="convert-button">Convert</button>
          </div>
          <p id="conversion-result"></p>
        </section>
      `;
  
      // Initialize Rewards Conversion
      const convertButton = document.getElementById('convert-button');
      const rewardAmountInput = document.getElementById('reward-amount');
      const conversionResult = document.getElementById('conversion-result');
  
      convertButton.addEventListener('click', () => {
        const points = parseInt(rewardAmountInput.value, 10);
        if (points > 0 && points <= 10000) { // Example: 10,000 points available
          const money = (points / 100).toFixed(2); // 100 points = $1
          conversionResult.textContent = `You have converted ${points} pts to $${money}.`;
        } else {
          conversionResult.textContent = 'Invalid amount or insufficient points.';
        }
      });
    }
  
    // Function to initialize Calendar
    function initializeCalendar() {
      const calendarGrid = document.getElementById('calendar-grid');
      const currentMonthElement = document.getElementById('current-month');
      const prevMonthButton = document.getElementById('prev-month');
      const nextMonthButton = document.getElementById('next-month');
  
      let currentDate = new Date();
  
      function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
  
        currentMonthElement.textContent = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
        }).format(date);
  
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const startingDay = firstDayOfMonth.getDay();
  
        calendarGrid.innerHTML = '';
  
        for (let i = 0; i < startingDay; i++) {
          const emptyDay = document.createElement('div');
          calendarGrid.appendChild(emptyDay);
        }
  
        for (let day = 1; day <= daysInMonth; day++) {
          const calendarDay = document.createElement('div');
          calendarDay.classList.add('calendar-day');
          calendarDay.textContent = day;
  
          // Highlight pickup days (example: every Wednesday)
          if (new Date(year, month, day).getDay() === 3) {
            calendarDay.classList.add('pickup-day');
          }
  
          calendarGrid.appendChild(calendarDay);
        }
      }
  
      prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
      });
  
      nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
      });
  
      renderCalendar(currentDate);
    }
  });