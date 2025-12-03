// DOM Elements
const themeBtn = document.getElementById('themeBtn');
const calculateBMI = document.getElementById('calculateBMI');
const checkHeart = document.getElementById('checkHeart');
const clearHistory = document.getElementById('clearHistory');
const voiceToggle = document.getElementById('voiceToggle');
const sendMessage = document.getElementById('sendMessage');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');
const quickButtons = document.querySelectorAll('.quick-btn');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Theme Management
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize theme
function initTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle theme
themeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    initTheme();
});

// Initialize on load
initTheme();

// BMI Calculator Functions
function calculateBMIFunction() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiIndicator = document.getElementById('bmiIndicator');
    const bmiAdvice = document.getElementById('bmiAdvice');

    // Validation
    if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Vui lòng nhập chiều cao và cân nặng hợp lệ!');
        return;
    }

    // Calculate BMI
    const heightInMeter = height / 100;
    const bmi = weight / (heightInMeter * heightInMeter);
    const roundedBMI = bmi.toFixed(1);

    // Determine category
    let category, advice, indicatorPosition;
    if (bmi < 18.5) {
        category = 'Thiếu cân';
        advice = 'Bạn nên ăn uống đầy đủ dinh dưỡng và tăng cường thể dục nhẹ nhàng.';
        indicatorPosition = '10%';
    } else if (bmi < 23) {
        category = 'Bình thường';
        advice = 'Chúc mừng! Bạn có cân nặng lý tưởng. Hãy duy trì lối sống lành mạnh.';
        indicatorPosition = '35%';
    } else if (bmi < 25) {
        category = 'Thừa cân';
        advice = 'Bạn nên tập thể dục thường xuyên và điều chỉnh chế độ ăn uống.';
        indicatorPosition = '65%';
    } else {
        category = 'Béo phì';
        advice = 'Bạn nên tham khảo ý kiến bác sĩ để có kế hoạch giảm cân an toàn.';
        indicatorPosition = '85%';
    }

    // Update UI
    bmiValue.textContent = roundedBMI;
    bmiCategory.textContent = `Phân loại: ${category}`;
    bmiIndicator.style.width = indicatorPosition;
    bmiAdvice.innerHTML = `<strong>Lời khuyên:</strong> ${advice}`;
    
    // Show result
    bmiResult.classList.remove('hidden');

    // Save to history
    saveToHistory('BMI', {
        value: roundedBMI,
        category: category,
        height: height,
        weight: weight,
        timestamp: new Date().toLocaleString()
    });
}

// Heart Rate Assessment Functions
function checkHeartRate() {
    const age = parseInt(document.getElementById('age').value);
    const heartRate = parseInt(document.getElementById('heartRate').value);
    const activity = document.getElementById('activity').value;
    const heartResult = document.getElementById('heartResult');
    const heartStatus = document.getElementById('heartStatus');
    const heartDetail = document.getElementById('heartDetail');
    const heartBar = document.getElementById('heartBar');
    const heartAdvice = document.getElementById('heartAdvice');

    // Validation
    if (!age || !heartRate || age <= 0 || heartRate <= 0) {
        alert('Vui lòng nhập tuổi và nhịp tim hợp lệ!');
        return;
    }

    // Determine normal range based on age
    let minNormal, maxNormal;
    if (age <= 1) {
        minNormal = 100;
        maxNormal = 160;
    } else if (age <= 10) {
        minNormal = 70;
        maxNormal = 120;
    } else if (age <= 20) {
        minNormal = 60;
        maxNormal = 100;
    } else if (age <= 40) {
        minNormal = 60;
        maxNormal = 90;
    } else if (age <= 60) {
        minNormal = 60;
        maxNormal = 85;
    } else {
        minNormal = 60;
        maxNormal = 80;
    }

    // Adjust for activity level
    let activityAdjustment = 0;
    switch(activity) {
        case 'low': activityAdjustment = -5; break;
        case 'medium': activityAdjustment = 0; break;
        case 'high': activityAdjustment = 5; break;
        case 'athlete': activityAdjustment = -10; break;
    }

    minNormal += activityAdjustment;
    maxNormal += activityAdjustment;

    // Determine status
    let status, detail, advice, barWidth;
    if (heartRate < minNormal) {
        status = 'Nhịp tim chậm';
        detail = `Nhịp tim của bạn (${heartRate} bpm) thấp hơn mức bình thường (${minNormal}-${maxNormal} bpm).`;
        advice = 'Nếu kèm theo chóng mặt hoặc mệt mỏi, hãy tham khảo ý kiến bác sĩ.';
        barWidth = '20%';
    } else if (heartRate <= maxNormal) {
        status = 'Bình thường';
        detail = `Nhịp tim của bạn (${heartRate} bpm) nằm trong khoảng bình thường (${minNormal}-${maxNormal} bpm).`;
        advice = 'Tiếp tục duy trì lối sống lành mạnh và tập thể dục đều đặn.';
        barWidth = '60%';
    } else {
        status = 'Nhịp tim nhanh';
        detail = `Nhịp tim của bạn (${heartRate} bpm) cao hơn mức bình thường (${minNormal}-${maxNormal} bpm).`;
        advice = 'Hãy nghỉ ngơi, tránh căng thẳng. Nếu tình trạng kéo dài, nên gặp bác sĩ.';
        barWidth = '90%';
    }

    // Update UI
    heartStatus.textContent = status;
    heartDetail.textContent = detail;
    heartBar.style.width = barWidth;
    heartAdvice.innerHTML = `<strong>Lời khuyên:</strong> ${advice}`;
    
    // Show result
    heartResult.classList.remove('hidden');

    // Save to history
    saveToHistory('Nhịp tim', {
        value: heartRate,
        status: status,
        age: age,
        activity: activity,
        timestamp: new Date().toLocaleString()
    });
}

// Health History Functions
function saveToHistory(type, data) {
    let history = JSON.parse(localStorage.getItem('healthHistory')) || [];
    
    const historyItem = {
        id: Date.now(),
        type: type,
        data: data,
        date: new Date().toLocaleDateString('vi-VN')
    };
    
    history.unshift(historyItem); // Add to beginning
    if (history.length > 10) history = history.slice(0, 10); // Keep only last 10
    
    localStorage.setItem('healthHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const historyContainer = document.getElementById('healthHistory');
    const history = JSON.parse(localStorage.getItem('healthHistory')) || [];
    
    if (history.length === 0) {
        historyContainer.innerHTML = '<p class="empty-history">Chưa có lịch sử đánh giá. Hãy sử dụng các công cụ trên!</p>';
        return;
    }
    
    let historyHTML = '';
    
    history.forEach(item => {
        let content = '';
        if (item.type === 'BMI') {
            content = `
                <div class="history-item">
                    <strong>BMI: ${item.data.value}</strong> - ${item.data.category}<br>
                    <small>Chiều cao: ${item.data.height}cm | Cân nặng: ${item.data.weight}kg</small><br>
                    <small>${item.data.timestamp}</small>
                </div>
            `;
        } else if (item.type === 'Nhịp tim') {
            content = `
                <div class="history-item">
                    <strong>Nhịp tim: ${item.data.value} bpm</strong> - ${item.data.status}<br>
                    <small>Tuổi: ${item.data.age} | Mức độ: ${getActivityText(item.data.activity)}</small><br>
                    <small>${item.data.timestamp}</small>
                </div>
            `;
        }
        
        historyHTML += content;
    });
    
    historyContainer.innerHTML = historyHTML;
}

function getActivityText(activity) {
    const activities = {
        'low': 'Ít vận động',
        'medium': 'Vận động vừa',
        'high': 'Vận động nhiều',
        'athlete': 'Vận động viên'
    };
    return activities[activity] || activity;
}

// AI Chatbot Functions
const aiResponses = {
    // Common symptoms
    'đau đầu': 'Đau đầu có thể do nhiều nguyên nhân: căng thẳng, thiếu ngủ, hoặc vấn đề về thị lực. Hãy nghỉ ngơi, uống đủ nước. Nếu đau kéo dài hoặc kèm sốt cao, nên gặp bác sĩ.',
    'mệt mỏi': 'Mệt mỏi thường do thiếu ngủ, căng thẳng hoặc thiếu dinh dưỡng. Hãy ngủ đủ 7-8 tiếng, ăn uống cân bằng và tập thể dục nhẹ nhàng.',
    'ho': 'Ho có thể do cảm lạnh, dị ứng hoặc viêm họng. Uống nước ấm với mật ong, nghỉ ngơi. Nếu ho kéo dài trên 2 tuần hoặc kèm khó thở, nên khám bác sĩ.',
    'sốt': 'Sốt là phản ứng của cơ thể với nhiễm trùng. Nhiệt độ dưới 38.5°C: nghỉ ngơi, uống nhiều nước. Trên 38.5°C: dùng thuốc hạ sốt và theo dõi. Nếu sốt cao không hạ, cần đến cơ sở y tế.',
    'đau bụng': 'Đau bụng có thể do ăn uống, rối loạn tiêu hóa hoặc vấn đề nghiêm trọng hơn. Nếu đau nhẹ: nghỉ ngơi, uống trà gừng. Nếu đau dữ dội hoặc kèm sốt, cần đi khám ngay.',
    
    // General advice
    'tăng cân': 'Để tăng cân lành mạnh: ăn nhiều bữa, tăng protein (thịt, cá, trứng), tập thể dục xây dựng cơ bắp, và ngủ đủ giấc.',
    'giảm cân': 'Giảm cân an toàn: ăn nhiều rau xanh, hạn chế đồ ngọt và dầu mỡ, tập thể dục 30 phút/ngày, uống đủ nước.',
    'mất ngủ': 'Cải thiện giấc ngủ: tắt thiết bị điện tử trước khi ngủ 1 giờ, tạo không gian yên tĩnh, tập thiền nhẹ, tránh caffeine buổi chiều.',
    'căng thẳng': 'Giảm căng thẳng: tập thể dục nhẹ, hít thở sâu, chia sẻ với người thân, sắp xếp công việc hợp lý, nghe nhạc thư giãn.',
    
    // Default response
    'default': 'Tôi hiểu bạn đang quan tâm đến sức khỏe. Để tư vấn chính xác hơn, bạn có thể mô tả chi tiết hơn về triệu chứng hoặc sử dụng các công cụ đánh giá bên trên. Nếu có triệu chứng nghiêm trọng, vui lòng đến cơ sở y tế gần nhất.'
};

function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keywords
    for (const [keyword, response] of Object.entries(aiResponses)) {
        if (message.includes(keyword)) {
            return response;
        }
    }
    
    return aiResponses.default;
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    const time = new Date().toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.innerHTML = `
        <p>${content}</p>
        <span class="message-time">${time}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    
    // Clear input
    userInput.value = '';
    
    // Simulate AI thinking
    setTimeout(() => {
        const aiResponse = getAIResponse(message);
        addMessage(aiResponse, false);
    }, 1000);
}

// Voice Assistant Functions
let isVoiceActive = false;
let recognition = null;

function initVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            handleUserMessage();
        };
        
        recognition.onerror = function(event) {
            console.log('Voice recognition error:', event.error);
            addMessage('Xin lỗi, tôi không nghe rõ bạn nói gì. Bạn có thể nhập tin nhắn bằng bàn phím được không?', false);
        };
    }
}

function toggleVoiceRecognition() {
    if (!recognition) {
        initVoiceRecognition();
    }
    
    if (isVoiceActive) {
        recognition.stop();
        voiceToggle.innerHTML = '<i class="fas fa-microphone"></i>';
        addMessage('Đã tắt nhận diện giọng nói.', false);
    } else {
        recognition.start();
        voiceToggle.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        addMessage('Đang nghe... Hãy nói triệu chứng của bạn.', false);
    }
    
    isVoiceActive = !isVoiceActive;
}

// Event Listeners
calculateBMI.addEventListener('click', calculateBMIFunction);
checkHeart.addEventListener('click', checkHeartRate);
clearHistory.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử?')) {
        localStorage.removeItem('healthHistory');
        displayHistory();
    }
});

sendMessage.addEventListener('click', handleUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserMessage();
});

quickButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const question = e.target.dataset.question;
        userInput.value = question;
        handleUserMessage();
    });
});

voiceToggle.addEventListener('click', toggleVoiceRecognition);

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        }
    });
});

// Initialize voice recognition if available
if ('webkitSpeechRecognition' in window) {
    initVoiceRecognition();
} else {
    voiceToggle.style.display = 'none';
}

// Display history on load
displayHistory();

// Auto-hide mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
    } else {
        navMenu.style.display = 'none';
    }
});

// Add sample chat messages for better UX
setTimeout(() => {
    if (chatMessages.children.length === 1) {
        addMessage('Bạn có thể hỏi tôi về: đau đầu, mệt mỏi, ho, sốt, đau bụng, hoặc các vấn đề sức khỏe khác.', false);
    }
}, 3000);

// Add loading animation for BMI calculation
calculateBMI.addEventListener('click', function() {
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tính...';
    this.disabled = true;
    
    setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
    }, 1000);
});

// Add loading animation for heart rate check
checkHeart.addEventListener('click', function() {
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang phân tích...';
    this.disabled = true;
    
    setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
    }, 1000);
});

// Enhanced input validation for BMI
document.getElementById('height').addEventListener('input', function() {
    const value = parseFloat(this.value);
    if (value > 300) {
        this.value = 300;
        alert('Chiều cao không được vượt quá 300cm');
    }
});

document.getElementById('weight').addEventListener('input', function() {
    const value = parseFloat(this.value);
    if (value > 300) {
        this.value = 300;
        alert('Cân nặng không được vượt quá 300kg');
    }
});

// Enhanced input validation for heart rate
document.getElementById('heartRate').addEventListener('input', function() {
    const value = parseFloat(this.value);
    if (value > 300) {
        this.value = 300;
        alert('Nhịp tim không được vượt quá 300 bpm');
    }
});

// Add visual feedback for form inputs
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Initialize tooltips for quick questions
quickButtons.forEach(button => {
    button.title = 'Nhấn để hỏi nhanh';
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + / to focus on chatbot
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        userInput.focus();
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        userInput.value = '';
    }
});

// Performance optimization: Debounce resize event
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Update chart sizes if needed
        const bmiIndicator = document.getElementById('bmiIndicator');
        const heartBar = document.getElementById('heartBar');
        
        if (bmiIndicator && bmiIndicator.style.width) {
            bmiIndicator.style.transition = 'none';
            setTimeout(() => {
                bmiIndicator.style.transition = 'width 0.5s ease';
            }, 10);
        }
        
        if (heartBar && heartBar.style.width) {
            heartBar.style.transition = 'none';
            setTimeout(() => {
                heartBar.style.transition = 'width 0.5s ease';
            }, 10);
        }
    }, 250);
});

// Export data function (for future enhancement)
function exportHealthData() {
    const history = JSON.parse(localStorage.getItem('healthHistory')) || [];
    if (history.length === 0) {
        alert('Không có dữ liệu để xuất!');
        return;
    }
    
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'health-data-' + new Date().toISOString().split('T')[0] + '.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Add export button dynamically (optional feature)
const exportBtn = document.createElement('button');
exportBtn.className = 'btn-secondary';
exportBtn.innerHTML = '<i class="fas fa-download"></i> Xuất dữ liệu';
exportBtn.style.marginTop = '10px';
exportBtn.onclick = exportHealthData;

const historyCard = document.querySelector('.tool-card:nth-child(3)');
if (historyCard) {
    historyCard.appendChild(exportBtn);
}

// Initialize with a welcome message in chatbot
window.onload = function() {
    console.log('MedAssist AI đã sẵn sàng!');
    console.log('Chức năng có sẵn:');
    console.log('1. Tính BMI với biểu đồ trực quan');
    console.log('2. Đánh giá nhịp tim theo độ tuổi');
    console.log('3. Chatbot AI tư vấn sức khỏe');
    console.log('4. Lưu trữ lịch sử đánh giá');
    console.log('5. Dark/Light mode');
    console.log('6. Nhận diện giọng nói (nếu trình duyệt hỗ trợ)');
    
    // Add welcome effects
    setTimeout(() => {
        document.querySelector('.hero').style.opacity = '1';
        document.querySelector('.hero').style.transform = 'translateY(0)';
    }, 100);
};

// CSS for initial animation
const style = document.createElement('style');
style.textContent = `
    .hero {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .tool-card {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .tool-card:nth-child(1) { animation-delay: 0.1s; }
    .tool-card:nth-child(2) { animation-delay: 0.2s; }
    .tool-card:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;

document.head.appendChild(style);

// Add pulse animation to important elements
setTimeout(() => {
    const importantElements = document.querySelectorAll('.tool-icon, .voice-btn');
    importantElements.forEach(el => {
        el.classList.add('pulse');
    });
}, 2000);