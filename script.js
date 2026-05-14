document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatPanel = document.getElementById('chat-panel');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');
    const chatMessages = document.getElementById('chat-messages');
    const tableBody = document.getElementById('table-body');
    const addManualBtn = document.getElementById('add-manual');
    const exportCsvBtn = document.getElementById('export-csv');
    
    const navDashboard = document.getElementById('nav-dashboard');
    const navPlatforms = document.getElementById('nav-platforms');
    const tableSection = document.querySelector('.table-section');
    const platformsSection = document.getElementById('platforms-section');
    const platformsGrid = document.getElementById('platforms-grid');

    const statTotal = document.getElementById('stat-total');
    const statCold = document.getElementById('stat-cold');
    const statApplied = document.getElementById('stat-applied');

    // Seed Data (Job Hunt focus only)
    const initialSeedData = [
        { name: "Silent Infotech", focus: "ERP & AI Agents", contact: "jobs@silentinfotech.com", platform: "Email", coldMail: true, applied: false },
        { name: "Arcraft Infotech", focus: "IT Training", contact: "career@arcraftinfotech.com", platform: "WhatsApp", coldMail: true, applied: false },
        { name: "CANKADO", focus: "Digital Health", contact: "career@cankado.in", platform: "Email", coldMail: true, applied: false },
        { name: "Examind AI", focus: "AI Integrity", contact: "privacy@examind.io", platform: "LinkedIn", coldMail: true, applied: false },
        { name: "Soranova Technologies", focus: "Custom ERP", contact: "sales@soranova.in", platform: "Form", coldMail: true, applied: false },
        { name: "Wegren Technologies", focus: "Digital Reimagination", contact: "connectus@wegren.com", platform: "Email", coldMail: true, applied: false },
        { name: "Nepton Global", focus: "Retail ERP", contact: "admin@neptonglobal.com", platform: "Email", coldMail: true, applied: false },
        { name: "Bluefinch Technology", focus: "Intelligent ERP", contact: "info@bluefinchtech.com", platform: "Email", coldMail: true, applied: false },
        { name: "Eurolink Technologies", focus: "Digital Agency", contact: "hello@eurolinktechnologies.com", platform: "Email", coldMail: true, applied: false },
        { name: "Axnol Digital Solutions", focus: "Python & Odoo", contact: "hr@axnoldigitalsolutions.com", platform: "WhatsApp", coldMail: true, applied: false },
        { name: "Saiket Systems", focus: "IT Consultancy", contact: "info@saiket.in", platform: "Email", coldMail: true, applied: false },
        { name: "CipherStudio", focus: "Django & Cloud", contact: "hr@cipherstudio.net", platform: "WhatsApp", coldMail: true, applied: false },
        { name: "IOTtech Smart Products", focus: "Smart Automation", contact: "info@iottechsmart.com", platform: "Email", coldMail: true, applied: false },
        { name: "Brahmanet IT Solutions", focus: "Web & AI", contact: "hr@brahmanet.com", platform: "Email", coldMail: true, applied: false },
        { name: "Tridots Tech", focus: "ERPNext & Frappe", contact: "jobs@tridotstech.com", platform: "WhatsApp", coldMail: true, applied: false },
        { name: "Mando Engineering", focus: "Smart Automotive", contact: "msi@hlcompany.com", platform: "Email", coldMail: true, applied: false }
    ];

    const platformsData = [
        { name: "LinkedIn", desc: "The world's largest professional network.", url: "https://linkedin.com", logo: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=128" },
        { name: "Indeed", desc: "Worldwide employment search engine.", url: "https://indeed.com", logo: "https://www.google.com/s2/favicons?domain=indeed.com&sz=128" },
        { name: "Wellfound", desc: "The place where startups and job seekers connect.", url: "https://wellfound.com", logo: "https://www.google.com/s2/favicons?domain=wellfound.com&sz=128" },
        { name: "Glassdoor", desc: "Search jobs and get company reviews.", url: "https://glassdoor.com", logo: "https://www.google.com/s2/favicons?domain=glassdoor.com&sz=128" },
        { name: "Cutshort", desc: "Modern recruitment for tech talent in India.", url: "https://cutshort.io", logo: "https://www.google.com/s2/favicons?domain=cutshort.io&sz=128" },
        { name: "Instahyre", desc: "AI-driven curated job matching.", url: "https://instahyre.com", logo: "https://www.google.com/s2/favicons?domain=instahyre.com&sz=128" },
        { name: "Hirect", desc: "Direct chat with hiring managers.", url: "https://hirect.in", logo: "https://www.google.com/s2/favicons?domain=hirect.in&sz=128" },
        { name: "Remote OK", desc: "Top remote jobs for digital nomads.", url: "https://remoteok.com", logo: "https://www.google.com/s2/favicons?domain=remoteok.com&sz=128" },
        { name: "Internshala", desc: "Best internship platform for students.", url: "https://internshala.com", logo: "https://www.google.com/s2/favicons?domain=internshala.com&sz=128" },
        { name: "Foundit", desc: "Leading job search portal (formerly Monster).", url: "https://foundit.in", logo: "https://www.google.com/s2/favicons?domain=foundit.in&sz=128" },
        { name: "AmbitionBox", desc: "Discover best places to work with reviews.", url: "https://ambitionbox.com", logo: "https://www.google.com/s2/favicons?domain=ambitionbox.com&sz=128" },
        { name: "Talent.com", desc: "A centralized job board for everything.", url: "https://talent.com", logo: "https://www.google.com/s2/favicons?domain=talent.com&sz=128" }
    ];

    let companies = JSON.parse(localStorage.getItem('nexTableCompanies')) || [];

    // Filter out Instagram-only leads if they were accidentally saved
    companies = companies.filter(c => c.platform !== 'Instagram');

    function updateStats() {
        statTotal.textContent = companies.length;
        statCold.textContent = companies.filter(c => c.coldMail).length;
        statApplied.textContent = companies.filter(c => c.applied).length;
    }

    function seedData() {
        initialSeedData.forEach(item => {
            const exists = companies.some(c => c.name === item.name);
            if (!exists) {
                companies.push({
                    id: Date.now() + Math.random(),
                    ...item,
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                });
            }
        });
        localStorage.setItem('nexTableCompanies', JSON.stringify(companies));
    }

    // Navigation
    navDashboard.addEventListener('click', (e) => { e.preventDefault(); switchPage('dashboard'); });
    navPlatforms.addEventListener('click', (e) => { e.preventDefault(); switchPage('platforms'); });

    function switchPage(page) {
        if (page === 'dashboard') {
            tableSection.style.display = 'block';
            platformsSection.style.display = 'none';
            navDashboard.classList.add('active');
            navPlatforms.classList.remove('active');
            updateStats();
        } else {
            tableSection.style.display = 'none';
            platformsSection.style.display = 'block';
            navDashboard.classList.remove('active');
            navPlatforms.classList.add('active');
            renderPlatforms();
        }
    }

    function initTable() {
        tableBody.innerHTML = '';
        if (companies.length === 0) {
            tableBody.innerHTML = `<tr class="empty-state"><td colspan="8">No companies added yet.</td></tr>`;
        } else {
            companies.forEach((company, index) => renderRow(company, index + 1));
        }
        updateStats();
    }

    function renderPlatforms() {
        platformsGrid.innerHTML = '';
        platformsData.forEach(platform => {
            const card = document.createElement('div');
            card.className = 'platform-card';
            card.innerHTML = `
                <div class="platform-logo">
                    <img src="${platform.logo}" alt="${platform.name}" onerror="this.src='https://ui-avatars.com/api/?name=${platform.name}&background=6366f1&color=fff'">
                </div>
                <h3>${platform.name}</h3>
                <p>${platform.desc}</p>
                <a href="${platform.url}" target="_blank" class="btn-visit">Visit Site</a>
            `;
            platformsGrid.appendChild(card);
        });
    }

    // Chatbot logic
    chatToggle.addEventListener('click', () => {
        chatPanel.classList.toggle('active');
        if (chatPanel.classList.contains('active')) chatInput.focus();
    });

    closeChat.addEventListener('click', () => chatPanel.classList.remove('active'));

    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        chatInput.value = '';
        setTimeout(() => processBotCommand(text), 600);
    };

    sendChat.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processBotCommand(text) {
        const companyName = text.replace(/add /i, '').trim();
        if (companyName.length > 0) {
            addCompany(companyName);
            addMessage(`Excellent! I've added **${companyName}** to your table.`, 'bot');
        } else {
            addMessage("I'm sorry, I didn't catch that. Try saying something like 'Add Google'.", 'bot');
        }
    }

    function addCompany(name, focus = "General", contact = "N/A", platform = "Manual", coldMail = false, applied = false) {
        const company = {
            id: Date.now(),
            name: name,
            focus: focus,
            contact: contact,
            platform: platform,
            coldMail: coldMail,
            applied: applied,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        };
        companies.unshift(company);
        saveAndRefresh();
    }

    function saveAndRefresh() {
        localStorage.setItem('nexTableCompanies', JSON.stringify(companies));
        initTable();
    }

    function renderRow(company, displayId) {
        const row = document.createElement('tr');
        row.className = 'row-entry';
        
        const coldMailStatus = company.coldMail ? '<span class="status-badge status-cold-mail-sent">Sent</span>' : '<span class="status-badge status-pending">No</span>';
        const appliedStatus = company.applied ? '<span class="status-badge status-applied">Applied</span>' : '<span class="status-badge status-pending">No</span>';

        row.innerHTML = `
            <td>${displayId}</td>
            <td style="font-weight: 600;">${company.name}</td>
            <td>${company.focus}</td>
            <td style="font-size: 0.85rem; color: var(--text-muted);">${company.contact}</td>
            <td style="font-size: 0.85rem; font-weight: 600;">${company.platform || "N/A"}</td>
            <td>${company.date}</td>
            <td class="toggle-cold" style="cursor:pointer;">${coldMailStatus}</td>
            <td class="toggle-applied" style="cursor:pointer;">${appliedStatus}</td>
            <td>
                <button class="btn-icon delete-btn" data-id="${company.id}" style="background:none; border:none; color:var(--danger); cursor:pointer;">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);

        row.querySelector('.toggle-cold').addEventListener('click', () => {
            company.coldMail = !company.coldMail;
            saveAndRefresh();
        });

        row.querySelector('.toggle-applied').addEventListener('click', () => {
            company.applied = !company.applied;
            saveAndRefresh();
        });

        row.querySelector('.delete-btn').addEventListener('click', () => {
            companies = companies.filter(c => c.id !== company.id);
            saveAndRefresh();
        });
    }

    // Export CSV
    exportCsvBtn.addEventListener('click', () => {
        if (companies.length === 0) return alert("No data to export!");
        let csv = ['#,Company Name,Focus,Contact,Applied Via,Date Added,Cold Mail,Applied'];
        companies.forEach((c, i) => csv.push(`${i + 1},"${c.name}","${c.focus}","${c.contact}","${c.platform}","${c.date}","${c.coldMail ? 'Yes' : 'No'}","${c.applied ? 'Yes' : 'No'}"`));
        const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NexTable_Export.csv`;
        a.click();
    });

    addManualBtn.addEventListener('click', () => {
        const name = prompt("Company Name:");
        if (!name) return;
        const focus = prompt("Focus:", "General");
        const contact = prompt("Contact:", "N/A");
        const platform = prompt("Platform:", "LinkedIn");
        const coldMail = confirm("Cold Mail Sent?");
        const applied = confirm("Job Applied?");
        addCompany(name, focus, contact, platform, coldMail, applied);
    });

    // Run
    seedData();
    initTable();
});
