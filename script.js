// Auth state management
let isAuthenticated = false;
let isDarkMode = false;
let isWalletConnected = false;
let isCreatorDarkMode = false;
let isSocialDarkMode = false;
let currentFeed = 'forYou';
let posts = [];

// Enhanced Create Post Variables
let selectedMedia = [];
let currentLocation = null;
let currentPoll = null;
let uploadSource = null;
let selectedFiles = [];

// Toggle between login and signup forms
function toggleAuth() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  if (loginForm.classList.contains('active')) {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
  } else {
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
  }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Basic validation
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  // Simulate authentication (in a real app, this would be an API call)
  if (email && password) {
    isAuthenticated = true;
    showDashboard();
  }
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  
  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  
  if (password.length < 6) {
    alert('Password must be at least 6 characters long');
    return;
  }
  
  // Simulate registration (in a real app, this would be an API call)
  isAuthenticated = true;
  showDashboard();
});

// Show dashboard after successful authentication
function showDashboard() {
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('dashboard').style.display = 'flex';
}

// Check if user is already authenticated (for demo purposes)
// In a real app, you'd check for stored tokens/session
function checkAuthStatus() {
  // For demo, always show login first
  // In production, check localStorage/sessionStorage for tokens
  if (!isAuthenticated) {
    document.getElementById('authModal').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
  }
}

// AI Chat Interface Functions
function openAIChat() {
  document.getElementById('aiChatModal').style.display = 'flex';
  // Focus on input when chat opens
  setTimeout(() => {
    document.getElementById('chatInput').focus();
  }, 100);
}

function closeAIChat() {
  document.getElementById('aiChatModal').style.display = 'none';
}

// Send message function
function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (message) {
    addMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      addMessage(aiResponse, 'ai');
    }, 1000 + Math.random() * 2000); // Random delay for realism
  }
}

// Add message to chat
function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = sender === 'ai' ? '🤖' : '👤';
  
  const content = document.createElement('div');
  content.className = 'message-content';
  
  const textP = document.createElement('p');
  textP.textContent = text;
  
  const time = document.createElement('span');
  time.className = 'message-time';
  time.textContent = getCurrentTime();
  
  content.appendChild(textP);
  content.appendChild(time);
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  
  messagesContainer.appendChild(messageDiv);
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Generate AI response (simulated)
function generateAIResponse(userMessage) {
  const responses = {
    help: "I'm here to help! I can assist with coding, explain concepts, help with creative projects, or answer general questions. What would you like to know?",
    code: "I'd be happy to help with coding! I can write code, debug issues, explain programming concepts, or help you learn new technologies. What programming language or framework are you working with?",
    explain: "I love explaining things! I can break down complex topics, provide step-by-step explanations, or help you understand any concept. What would you like me to explain?",
    creative: "Let's get creative! I can help with writing, brainstorming ideas, design concepts, or any creative project. What kind of creative work are you interested in?"
  };
  
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for quick action keywords
  if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
    return responses.help;
  } else if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('javascript') || lowerMessage.includes('python')) {
    return responses.code;
  } else if (lowerMessage.includes('explain') || lowerMessage.includes('how') || lowerMessage.includes('what is')) {
    return responses.explain;
  } else if (lowerMessage.includes('creative') || lowerMessage.includes('write') || lowerMessage.includes('design')) {
    return responses.creative;
  }
  
  // Default responses based on message content
  const defaultResponses = [
    "That's an interesting question! Let me think about that...",
    "I understand what you're asking. Here's what I can tell you...",
    "Great question! I'd be happy to help you with that.",
    "I see what you're looking for. Let me provide some insights...",
    "Thanks for asking! Here's what I know about that topic..."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)] + 
         " Could you provide more specific details about what you'd like to know?";
}

// Quick action buttons
function quickAction(action) {
  const actionTexts = {
    help: "I need help with something",
    code: "Can you help me with coding?",
    explain: "Can you explain something to me?",
    creative: "I need help with a creative project"
  };
  
  const input = document.getElementById('chatInput');
  input.value = actionTexts[action];
  sendMessage();
}

// Get current time for messages
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Theme switching
function toggleTheme() {
  isDarkMode = !isDarkMode;
  const chatContainer = document.querySelector('.chat-container');
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (isDarkMode) {
    chatContainer.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    chatContainer.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
  }
}

// Web3 Wallet Functions
function openWallet() {
  document.getElementById('walletModal').style.display = 'flex';
}

function closeWallet() {
  document.getElementById('walletModal').style.display = 'none';
}

// Connect wallet function
function connectWallet() {
  if (!isWalletConnected) {
    // Simulate wallet connection
    isWalletConnected = true;
    const connectBtn = document.getElementById('connectBtn');
    const statusText = document.getElementById('statusText');
    
    connectBtn.textContent = 'Connected';
    connectBtn.classList.add('connected');
    statusText.textContent = 'Connected to MetaMask';
    
    // Show wallet content
    showWalletContent();
    
    // Load wallet data
    loadWalletData();
  } else {
    // Disconnect wallet
    isWalletConnected = false;
    const connectBtn = document.getElementById('connectBtn');
    const statusText = document.getElementById('statusText');
    
    connectBtn.textContent = 'Connect Wallet';
    connectBtn.classList.remove('connected');
    statusText.textContent = 'Not Connected';
    
    // Hide wallet content
    hideWalletContent();
  }
}

// Show wallet content after connection
function showWalletContent() {
  document.getElementById('balanceSection').style.display = 'block';
  document.getElementById('tokensSection').style.display = 'block';
  document.getElementById('transactionsSection').style.display = 'block';
  document.getElementById('actionsSection').style.display = 'block';
}

// Hide wallet content when disconnected
function hideWalletContent() {
  document.getElementById('balanceSection').style.display = 'none';
  document.getElementById('tokensSection').style.display = 'none';
  document.getElementById('transactionsSection').style.display = 'none';
  document.getElementById('actionsSection').style.display = 'none';
}

// Load wallet data (simulated)
function loadWalletData() {
  // Simulate loading balance
  setTimeout(() => {
    document.getElementById('totalBalance').textContent = '$2,847.32';
    document.getElementById('balanceChange').textContent = '+5.23%';
    
    // Load tokens
    loadTokens();
    
    // Load transactions
    loadTransactions();
  }, 1000);
}

// Load tokens (simulated)
function loadTokens() {
  const tokensList = document.getElementById('tokensList');
  const tokens = [
    { name: 'Ethereum', symbol: 'ETH', balance: '1.245', value: '$2,234.50', icon: '🔷' },
    { name: 'USD Coin', symbol: 'USDC', balance: '1,250.00', value: '$1,250.00', icon: '💙' },
    { name: 'Tether', symbol: 'USDT', balance: '500.00', value: '$500.00', icon: '💚' },
    { name: 'Polygon', symbol: 'MATIC', balance: '2,500.00', value: '$1,847.32', icon: '🟣' }
  ];
  
  tokensList.innerHTML = '';
  tokens.forEach(token => {
    const tokenItem = document.createElement('div');
    tokenItem.className = 'token-item';
    tokenItem.innerHTML = `
      <div class="token-info">
        <div class="token-icon">${token.icon}</div>
        <div class="token-details">
          <h4>${token.name}</h4>
          <p>${token.symbol}</p>
        </div>
      </div>
      <div class="token-value">
        <h4>${token.balance}</h4>
        <p>${token.value}</p>
      </div>
    `;
    tokensList.appendChild(tokenItem);
  });
}

// Load transactions (simulated)
function loadTransactions() {
  const transactionsList = document.getElementById('transactionsList');
  const transactions = [
    { type: 'Received', amount: '+0.5 ETH', value: '+$897.25', time: '2 hours ago', icon: '📥' },
    { type: 'Sent', amount: '-100 USDC', value: '-$100.00', time: '1 day ago', icon: '📤' },
    { type: 'Swapped', amount: 'ETH → MATIC', value: '$250.00', time: '3 days ago', icon: '🔄' },
    { type: 'Received', amount: '+1,000 USDT', value: '+$1,000.00', time: '1 week ago', icon: '📥' }
  ];
  
  transactionsList.innerHTML = '';
  transactions.forEach(tx => {
    const txItem = document.createElement('div');
    txItem.className = 'transaction-item';
    txItem.innerHTML = `
      <div class="transaction-info">
        <div class="transaction-icon">${tx.icon}</div>
        <div class="transaction-details">
          <h4>${tx.type}</h4>
          <p>${tx.time}</p>
        </div>
      </div>
      <div class="transaction-amount">
        <h4>${tx.amount}</h4>
        <p>${tx.value}</p>
      </div>
    `;
    transactionsList.appendChild(txItem);
  });
}

// Send modal functions
function showSendModal() {
  document.getElementById('sendModal').style.display = 'flex';
}

function closeSendModal() {
  document.getElementById('sendModal').style.display = 'none';
}

// Handle send form submission
document.getElementById('sendForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const recipient = document.getElementById('recipientAddress').value;
  const amount = document.getElementById('sendAmount').value;
  const token = document.getElementById('sendToken').value;
  
  if (!recipient || !amount) {
    alert('Please fill in all fields');
    return;
  }
  
  // Simulate transaction
  alert(`Transaction submitted! Sending ${amount} ${token} to ${recipient}`);
  closeSendModal();
  
  // Reset form
  document.getElementById('sendForm').reset();
});

// Receive and Swap functions (placeholder)
function showReceiveModal() {
  alert('Receive functionality coming soon!');
}

function showSwapModal() {
  alert('Swap functionality coming soon!');
}

// Creator Tools Functions
function openCreatorTools() {
  document.getElementById('creatorToolsModal').style.display = 'flex';
}

function closeCreatorTools() {
  document.getElementById('creatorToolsModal').style.display = 'none';
}

// Switch between tool categories
function switchCategory(category) {
  // Remove active class from all category buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to clicked button
  event.target.closest('.category-btn').classList.add('active');
  
  // Hide all tool sections
  document.querySelectorAll('.tools-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected tool section
  document.getElementById(category + 'Tools').classList.add('active');
}

// Open specific tools
function openTool(toolName) {
  if (toolName === 'textEditor') {
    document.getElementById('textEditorModal').style.display = 'flex';
  } else {
    alert(`${toolName} tool coming soon!`);
  }
}

// Close specific tools
function closeTool(toolName) {
  if (toolName === 'textEditor') {
    document.getElementById('textEditorModal').style.display = 'none';
  }
}

// Text Editor Functions
function formatText(format) {
  const editor = document.getElementById('textEditor');
  const selection = window.getSelection();
  
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (selectedText) {
      let formattedText = '';
      switch (format) {
        case 'bold':
          formattedText = `<strong>${selectedText}</strong>`;
          break;
        case 'italic':
          formattedText = `<em>${selectedText}</em>`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
      }
      
      const div = document.createElement('div');
      div.innerHTML = formattedText;
      range.deleteContents();
      range.insertNode(div.firstChild);
    }
  }
}

function insertHeading() {
  const editor = document.getElementById('textEditor');
  const heading = document.createElement('h2');
  heading.textContent = 'New Heading';
  editor.appendChild(heading);
  heading.focus();
}

function insertList() {
  const editor = document.getElementById('textEditor');
  const list = document.createElement('ul');
  const item = document.createElement('li');
  item.textContent = 'List item';
  list.appendChild(item);
  editor.appendChild(list);
}

function insertLink() {
  const url = prompt('Enter URL:');
  if (url) {
    const editor = document.getElementById('textEditor');
    const link = document.createElement('a');
    link.href = url;
    link.textContent = url;
    editor.appendChild(link);
  }
}

function insertImage() {
  const url = prompt('Enter image URL:');
  if (url) {
    const editor = document.getElementById('textEditor');
    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    editor.appendChild(img);
  }
}

// AI Assistant Functions for Text Editor
function aiSuggest() {
  alert('AI suggestion: Consider adding more descriptive headings and bullet points to improve readability.');
}

function aiImprove() {
  alert('AI improvement: Your text has been enhanced with better vocabulary and sentence structure.');
}

function aiSummarize() {
  alert('AI summary: Your content has been summarized into key points for better organization.');
}

// Document functions
function saveDocument() {
  const editor = document.getElementById('textEditor');
  const content = editor.innerHTML;
  localStorage.setItem('nexaDocument', content);
  alert('Document saved successfully!');
}

function exportDocument() {
  const editor = document.getElementById('textEditor');
  const content = editor.innerHTML;
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nexa-document.html';
  a.click();
  URL.revokeObjectURL(url);
}

// Creator Tools Theme Toggle
function toggleCreatorTheme() {
  isCreatorDarkMode = !isCreatorDarkMode;
  const creatorContainer = document.querySelector('.creator-container');
  const themeToggle = document.querySelector('.creator-modal .theme-toggle');
  
  if (isCreatorDarkMode) {
    creatorContainer.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    creatorContainer.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
  }
}

// Social Feed Functions
function openSocialFeed() {
  document.getElementById('socialFeedModal').style.display = 'flex';
  loadFeed();
}

function closeSocialFeed() {
  document.getElementById('socialFeedModal').style.display = 'none';
}

// Switch between feed types
function switchFeed(feedType) {
  currentFeed = feedType;
  
  // Remove active class from all nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to clicked button
  event.target.closest('.nav-btn').classList.add('active');
  
  // Load feed content
  loadFeed();
}

// Load feed content
function loadFeed() {
  const feedContent = document.getElementById('feedContent');
  feedContent.innerHTML = '';
  
  // Generate sample posts based on feed type
  const samplePosts = generateSamplePosts(currentFeed);
  
  samplePosts.forEach(post => {
    const postElement = createPostElement(post);
    feedContent.appendChild(postElement);
  });
}

// Generate sample posts
function generateSamplePosts(feedType) {
  const posts = [];
  const users = ['Alex', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'John', 'Anna'];
  const avatars = ['A', 'S', 'M', 'E', 'D', 'L', 'J', 'A'];
  
  const feedContent = {
    forYou: [
      {
        text: "Just discovered an amazing new AI tool! 🤖✨ #AI #Innovation #Tech",
        media: null
      },
      {
        text: "Working on some creative content today. The possibilities are endless! 🎨 #Creativity #Inspiration",
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop',
          alt: 'Creative workspace with colorful design elements'
        }
      },
      {
        text: "Morning coffee and coding session ☕💻 #DeveloperLife #Coffee",
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop',
          alt: 'Coffee and laptop on desk'
        }
      },
      {
        text: "New project idea: A social platform for creators! What do you think? 💡 #Startup #Ideas",
        media: {
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop',
          alt: 'Video presentation of new social platform'
        }
      },
      {
        text: "Check out this amazing sunset! Nature is incredible 🌅 #Nature #Photography #Sunset",
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
          alt: 'Beautiful sunset over mountains'
        }
      },
      {
        text: "Just finished this incredible project! Watch the demo 🚀 #Project #Demo #Innovation",
        media: {
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
          alt: 'Project demo video'
        }
      },
      {
        text: "Amazing street art I found today! 🎨 #StreetArt #Urban #Art",
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop',
          alt: 'Colorful street art mural'
        }
      },
      {
        text: "Behind the scenes of our latest video shoot! 📹 #BehindTheScenes #Video #Production",
        media: {
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=300&fit=crop',
          alt: 'Behind the scenes video'
        }
      }
    ],
    trending: [
      {
        text: "BREAKING: New AI developments are changing everything! 🚀 #Trending #AI #Future",
        media: null
      },
      {
        text: "This new feature is absolutely game-changing! 🔥 #Viral #Innovation",
        media: null
      },
      {
        text: "Can't believe how fast technology is evolving! 📈 #Tech #Trending",
        media: null
      },
      {
        text: "The future of social media is here! 🌟 #SocialMedia #Future",
        media: null
      }
    ],
    following: [
      {
        text: "Great meeting with the team today! 👥 #TeamWork #Collaboration",
        media: null
      },
      {
        text: "Excited about our new project launch! 🚀 #Launch #Excitement",
        media: null
      },
      {
        text: "Working on something special... stay tuned! 🤫 #ComingSoon #Teaser",
        media: null
      },
      {
        text: "Amazing feedback from our users! ❤️ #UserFeedback #Gratitude",
        media: null
      }
    ],
    ai: [
      {
        text: "AI-generated content is revolutionizing creativity! 🤖✨ #AIGenerated #Innovation",
        media: null
      },
      {
        text: "This AI assistant just helped me write the perfect post! 📝 #AI #Productivity",
        media: null
      },
      {
        text: "The future of content creation is AI-powered! 🚀 #Future #AI",
        media: null
      },
      {
        text: "AI is making social media more engaging than ever! 💡 #SocialMedia #AI",
        media: null
      }
    ]
  };
  
  for (let i = 0; i < 8; i++) {
    const userIndex = i % users.length;
    const contentIndex = i % feedContent[feedType].length;
    const postContent = feedContent[feedType][contentIndex];
    
    posts.push({
      id: i + 1,
      user: users[userIndex],
      avatar: avatars[userIndex],
      content: postContent.text,
      media: postContent.media,
      likes: Math.floor(Math.random() * 100) + 10,
      comments: Math.floor(Math.random() * 50) + 5,
      shares: Math.floor(Math.random() * 20) + 2,
      time: `${Math.floor(Math.random() * 24)}h ago`,
      isLiked: Math.random() > 0.7
    });
  }
  
  return posts;
}

// Create post element
function createPostElement(post) {
  const postDiv = document.createElement('div');
  postDiv.className = 'post-card';
  
  let mediaContent = '';
  if (post.media) {
    if (post.media.type === 'image') {
      mediaContent = `
        <div class="post-media">
          <img src="${post.media.url}" alt="${post.media.alt}" class="post-image" onclick="openMediaViewer('${post.media.url}', 'image')">
        </div>
      `;
    } else if (post.media.type === 'video') {
      mediaContent = `
        <div class="post-media">
          <div class="video-container" onclick="openMediaViewer('${post.media.url}', 'video')">
            <img src="${post.media.thumbnail}" alt="${post.media.alt}" class="video-thumbnail">
            <div class="video-play-overlay">
              <span class="play-icon">▶️</span>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  postDiv.innerHTML = `
    <div class="post-header">
      <div class="post-avatar">${post.avatar}</div>
      <div class="post-user-info">
        <h4>${post.user}</h4>
        <p>${post.time}</p>
      </div>
    </div>
    <div class="post-content">
      <div class="post-text">${post.content}</div>
      ${mediaContent}
    </div>
    <div class="post-actions">
      <div class="action-group">
        <button class="action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
          <span class="action-icon">${post.isLiked ? '❤️' : '🤍'}</span>
          <span>${post.likes}</span>
        </button>
        <button class="action-btn" onclick="showComments(${post.id})">
          <span class="action-icon">💬</span>
          <span>${post.comments}</span>
        </button>
        <button class="action-btn" onclick="sharePost(${post.id})">
          <span class="action-icon">📤</span>
          <span>${post.shares}</span>
        </button>
      </div>
    </div>
  `;
  
  return postDiv;
}

// Post interaction functions
function toggleLike(postId) {
  const likeBtn = event.target.closest('.action-btn');
  const likeIcon = likeBtn.querySelector('.action-icon');
  const likeCount = likeBtn.querySelector('span:last-child');
  
  if (likeBtn.classList.contains('liked')) {
    likeBtn.classList.remove('liked');
    likeIcon.textContent = '🤍';
    likeCount.textContent = parseInt(likeCount.textContent) - 1;
  } else {
    likeBtn.classList.add('liked');
    likeIcon.textContent = '❤️';
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  }
}

function showComments(postId) {
  alert(`Comments for post ${postId} coming soon!`);
}

function sharePost(postId) {
  alert(`Sharing post ${postId}...`);
}

// Media viewer functions
function openMediaViewer(url, type) {
  const viewer = document.createElement('div');
  viewer.className = 'media-viewer';
  viewer.innerHTML = `
    <div class="media-viewer-overlay" onclick="closeMediaViewer()">
      <div class="media-viewer-content" onclick="event.stopPropagation()">
        <button class="media-viewer-close" onclick="closeMediaViewer()">×</button>
        ${type === 'video' ? `<video src="${url}" controls autoplay></video>` : `<img src="${url}" alt="Full size image">`}
      </div>
    </div>
  `;
  
  document.body.appendChild(viewer);
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMediaViewer();
    }
  });
}

function closeMediaViewer() {
  const viewer = document.querySelector('.media-viewer');
  if (viewer) {
    viewer.remove();
  }
}

// Create Post Functions
function showCreatePost() {
  document.getElementById('createPostModal').style.display = 'flex';
  document.getElementById('postContent').focus();
}

function closeCreatePost() {
  document.getElementById('createPostModal').style.display = 'none';
  document.getElementById('postContent').value = '';
  document.getElementById('charCount').textContent = '0';
}

// Character count for post input
document.addEventListener('DOMContentLoaded', function() {
  const postContent = document.getElementById('postContent');
  const charCount = document.getElementById('charCount');
  
  if (postContent) {
    postContent.addEventListener('input', function() {
      charCount.textContent = this.value.length;
    });
  }
});

// Publish post
function publishPost() {
  const content = document.getElementById('postContent').value.trim();
  
  if (!content && selectedMedia.length === 0 && !currentLocation && !currentPoll) {
    alert('Please write something or add media to post!');
    return;
  }
  
  // Collect poll data if exists
  let pollData = null;
  if (currentPoll) {
    const question = document.getElementById('pollQuestion').value.trim();
    const options = Array.from(document.querySelectorAll('.poll-option-input'))
      .map(input => input.value.trim())
      .filter(option => option.length > 0);
    
    if (question && options.length >= 2) {
      pollData = {
        question: question,
        options: options,
        multipleVotes: document.getElementById('multipleVotes').checked,
        showResults: document.getElementById('pollResults').checked,
        votes: {}
      };
    }
  }
  
  // Create new post object
  const newPost = {
    id: Date.now(),
    user: {
      name: 'James Sonzo',
      username: '@james_sonzo',
      avatar: 'JS'
    },
    content: content,
    media: selectedMedia.length > 0 ? selectedMedia.map(media => ({
      url: media.url,
      type: media.type,
      name: media.name
    })) : null,
    location: currentLocation,
    poll: pollData,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    shares: 0,
    isLiked: false
  };
  
  // Add to posts array
  posts.unshift(newPost);
  
  // Update feed
  loadFeed();
  
  // Reset form and clear all data
  resetCreatePostForm();
  
  closeCreatePost();
  alert('Post published successfully!');
}

// Reset create post form
function resetCreatePostForm() {
  document.getElementById('postContent').value = '';
  document.getElementById('charCount').textContent = '0';
  
  // Clear media
  selectedMedia = [];
  updateMediaPreview();
  
  // Clear location
  currentLocation = null;
  document.getElementById('locationSection').style.display = 'none';
  
  // Clear poll
  currentPoll = null;
  document.getElementById('pollSection').style.display = 'none';
  document.getElementById('pollQuestion').value = '';
  
  // Reset poll options
  const pollOptions = document.getElementById('pollOptions');
  pollOptions.innerHTML = `
    <div class="poll-option">
      <input type="text" placeholder="Option 1" class="poll-option-input">
      <button class="remove-option-btn" onclick="removePollOption(this)">×</button>
    </div>
    <div class="poll-option">
      <input type="text" placeholder="Option 2" class="poll-option-input">
      <button class="remove-option-btn" onclick="removePollOption(this)">×</button>
    </div>
  `;
  
  // Reset checkboxes
  document.getElementById('multipleVotes').checked = false;
  document.getElementById('pollResults').checked = false;
}

// Enhanced Post Creation Functions

// Open media picker for images or videos
function openMediaPicker(type) {
  uploadSource = type;
  const modal = document.getElementById('fileUploadModal');
  const title = document.getElementById('uploadModalTitle');
  
  if (type === 'image') {
    title.textContent = 'Add Images';
  } else if (type === 'video') {
    title.textContent = 'Add Videos';
  }
  
  modal.style.display = 'flex';
}

// Select upload source (camera, gallery, files)
function selectUploadSource(source) {
  uploadSource = source;
  
  // Remove previous selections
  document.querySelectorAll('.upload-option').forEach(option => {
    option.classList.remove('selected');
  });
  
  // Select clicked option
  event.currentTarget.classList.add('selected');
  
  // Show confirm button
  document.getElementById('uploadConfirmBtn').style.display = 'block';
}

// Confirm upload and trigger file selection
function confirmUpload() {
  const source = uploadSource;
  let inputElement;
  
  if (source === 'camera') {
    // For camera, we'll simulate by opening file picker
    inputElement = document.getElementById('mediaInput');
  } else if (source === 'gallery') {
    inputElement = document.getElementById('mediaInput');
  } else if (source === 'files') {
    inputElement = document.getElementById('mediaInput');
  }
  
  if (inputElement) {
    inputElement.click();
  }
  
  closeFileUploadModal();
}

// Close file upload modal
function closeFileUploadModal() {
  document.getElementById('fileUploadModal').style.display = 'none';
  document.getElementById('uploadConfirmBtn').style.display = 'none';
  
  // Reset selections
  document.querySelectorAll('.upload-option').forEach(option => {
    option.classList.remove('selected');
  });
}

// Handle file selection
document.getElementById('imageInput').addEventListener('change', function(e) {
  handleFileSelection(e.target.files, 'image');
});

document.getElementById('videoInput').addEventListener('change', function(e) {
  handleFileSelection(e.target.files, 'video');
});

document.getElementById('mediaInput').addEventListener('change', function(e) {
  handleFileSelection(e.target.files, 'media');
});

// Handle file selection and preview
function handleFileSelection(files, type) {
  if (files.length === 0) return;
  
  Array.from(files).forEach(file => {
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const mediaItem = {
          id: Date.now() + Math.random(),
          file: file,
          url: e.target.result,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          name: file.name
        };
        
        selectedMedia.push(mediaItem);
        updateMediaPreview();
      };
      
      reader.readAsDataURL(file);
    }
  });
}

// Update media preview section
function updateMediaPreview() {
  const previewSection = document.getElementById('mediaPreview');
  const previewGrid = document.getElementById('previewGrid');
  
  if (selectedMedia.length > 0) {
    previewSection.style.display = 'block';
    previewGrid.innerHTML = '';
    
    selectedMedia.forEach(media => {
      const mediaElement = createMediaPreviewElement(media);
      previewGrid.appendChild(mediaElement);
    });
  } else {
    previewSection.style.display = 'none';
  }
}

// Create media preview element
function createMediaPreviewElement(media) {
  const div = document.createElement('div');
  div.className = 'media-item-preview';
  div.innerHTML = `
    ${media.type === 'image' ? `<img src="${media.url}" alt="${media.name}">` : 
      `<video src="${media.url}" muted></video>`}
    <div class="media-overlay">
      <button class="remove-media-btn" onclick="removeMedia(${media.id})">×</button>
    </div>
    <div class="media-type-badge">${media.type === 'image' ? '🖼️' : '🎬'}</div>
  `;
  return div;
}

// Remove media item
function removeMedia(mediaId) {
  selectedMedia = selectedMedia.filter(media => media.id !== mediaId);
  updateMediaPreview();
}

// Clear all media
function clearAllMedia() {
  selectedMedia = [];
  updateMediaPreview();
}

// Add location to post
function addLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        // Simulate reverse geocoding
        currentLocation = {
          name: 'Current Location',
          address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          coordinates: { lat: latitude, lng: longitude }
        };
        
        updateLocationSection();
      },
      function(error) {
        // Fallback to manual location
        currentLocation = {
          name: 'Manual Location',
          address: 'Location added manually',
          coordinates: null
        };
        updateLocationSection();
      }
    );
  } else {
    // Fallback for browsers without geolocation
    currentLocation = {
      name: 'Manual Location',
      address: 'Location added manually',
      coordinates: null
    };
    updateLocationSection();
  }
}

// Update location section
function updateLocationSection() {
  const locationSection = document.getElementById('locationSection');
  const locationName = document.getElementById('locationName');
  const locationAddress = document.getElementById('locationAddress');
  
  if (currentLocation) {
    locationSection.style.display = 'block';
    locationName.textContent = currentLocation.name;
    locationAddress.textContent = currentLocation.address;
  }
}

// Remove location
function removeLocation() {
  currentLocation = null;
  document.getElementById('locationSection').style.display = 'none';
}

// Add poll to post
function addPoll() {
  currentPoll = {
    question: '',
    options: ['', ''],
    multipleVotes: false,
    showResults: false
  };
  
  document.getElementById('pollSection').style.display = 'block';
  document.getElementById('pollQuestion').focus();
}

// Remove poll
function removePoll() {
  currentPoll = null;
  document.getElementById('pollSection').style.display = 'none';
}

// Add poll option
function addPollOption() {
  const pollOptions = document.getElementById('pollOptions');
  const newOption = document.createElement('div');
  newOption.className = 'poll-option';
  newOption.innerHTML = `
    <input type="text" placeholder="Option ${pollOptions.children.length + 1}" class="poll-option-input">
    <button class="remove-option-btn" onclick="removePollOption(this)">×</button>
  `;
  pollOptions.appendChild(newOption);
}

// Remove poll option
function removePollOption(button) {
  const pollOptions = document.getElementById('pollOptions');
  if (pollOptions.children.length > 2) {
    button.parentElement.remove();
  }
}

// AI Assistant for posts
function aiSuggestHashtags() {
  const content = document.getElementById('postContent').value;
  if (content) {
    const hashtags = ['#NEXA', '#Innovation', '#Tech', '#Social', '#AI', '#Creative'];
    const suggested = hashtags.slice(0, 3).join(' ');
    document.getElementById('postContent').value += ' ' + suggested;
    document.getElementById('charCount').textContent = document.getElementById('postContent').value.length;
  } else {
    alert('Write some content first to get hashtag suggestions!');
  }
}

function aiImprovePost() {
  const content = document.getElementById('postContent').value;
  if (content) {
    const improved = content + ' ✨ (AI enhanced)';
    document.getElementById('postContent').value = improved;
    document.getElementById('charCount').textContent = improved.length;
  } else {
    alert('Write some content first to improve it!');
  }
}

function aiGenerateContent() {
  const suggestions = [
    "Just had an amazing idea! 💡 The future of social media is here! #Innovation #Future",
    "Working on something incredible today! 🚀 Can't wait to share it with you all! #Excitement #ComingSoon",
    "The possibilities are endless when you combine creativity with technology! ✨ #Creativity #Tech",
    "Every day brings new opportunities to create something amazing! 🌟 #Inspiration #Motivation"
  ];
  
  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
  document.getElementById('postContent').value = randomSuggestion;
  document.getElementById('charCount').textContent = randomSuggestion.length;
}

// Social Feed Theme Toggle
function toggleSocialTheme() {
  isSocialDarkMode = !isSocialDarkMode;
  const socialContainer = document.querySelector('.social-container');
  const themeToggle = document.querySelector('.social-modal .theme-toggle');
  
  if (isSocialDarkMode) {
    socialContainer.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    socialContainer.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
  }
}

// PWA and Service Worker Registration
let deferredPrompt;

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Handle PWA install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show install button or notification
  showInstallPrompt();
});

// Show install prompt
function showInstallPrompt() {
  if (deferredPrompt) {
    // Create install notification
    const installNotification = document.createElement('div');
    installNotification.className = 'install-notification';
    installNotification.innerHTML = `
      <div class="install-content">
        <span>📱 Install NEXA OS as an app</span>
        <button onclick="installPWA()" class="install-btn">Install</button>
        <button onclick="dismissInstall()" class="dismiss-btn">×</button>
      </div>
    `;
    document.body.appendChild(installNotification);
  }
}

// Install PWA
function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }
  dismissInstall();
}

// Dismiss install prompt
function dismissInstall() {
  const notification = document.querySelector('.install-notification');
  if (notification) {
    notification.remove();
  }
}

// Handle app shortcuts
function handleAppShortcuts() {
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get('action');
  
  if (action) {
    switch (action) {
      case 'ai':
        openAIChat();
        break;
      case 'social':
        openSocialFeed();
        break;
      case 'wallet':
        openWallet();
        break;
      case 'tools':
        openCreatorTools();
        break;
    }
  }
}

// Network status monitoring
function updateNetworkStatus() {
  const status = navigator.onLine ? 'online' : 'offline';
  console.log('Network status:', status);
  
  if (!navigator.onLine) {
    showOfflineIndicator();
  } else {
    hideOfflineIndicator();
  }
}

function showOfflineIndicator() {
  let indicator = document.querySelector('.offline-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'offline-indicator';
    indicator.innerHTML = '📡 You are offline';
    document.body.appendChild(indicator);
  }
}

function hideOfflineIndicator() {
  const indicator = document.querySelector('.offline-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', function() {
  checkAuthStatus();
  handleAppShortcuts();
  
  // Add event listener for Enter key in chat input
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  // Network status listeners
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  updateNetworkStatus();
});

function openApp(app) {
    alert(`Opening ${app} module...`);
  }

// Profile Functions
let currentProfileTab = 'overview';
let isEditMode = false;

function openProfile() {
  document.getElementById('profileModal').style.display = 'flex';
  loadUserProfile();
}

function closeProfile() {
  document.getElementById('profileModal').style.display = 'none';
}

function loadUserProfile() {
  // Load user posts
  loadUserPosts();
  // Load user media
  loadUserMedia();
}

function switchProfileTab(tabName) {
  currentProfileTab = tabName;
  
  // Remove active class from all nav buttons
  document.querySelectorAll('.profile-nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to clicked button
  event.target.closest('.profile-nav-btn').classList.add('active');
  
  // Hide all tabs
  document.querySelectorAll('.profile-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(tabName + 'Tab').classList.add('active');
  
  // Load content based on tab
  if (tabName === 'posts') {
    loadUserPosts();
  } else if (tabName === 'media') {
    loadUserMedia();
  }
}

function loadUserPosts() {
  const userPostsGrid = document.getElementById('userPostsGrid');
  const userPosts = [
    {
      id: 1,
      content: "Just finished building this amazing new feature! 🚀 #Coding #Innovation",
      likes: 45,
      comments: 12,
      time: '2 hours ago',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
        alt: 'Code on screen'
      }
    },
    {
      id: 2,
      content: "Morning coffee and coding session ☕💻 #DeveloperLife",
      likes: 32,
      comments: 8,
      time: '1 day ago',
      media: null
    },
    {
      id: 3,
      content: "Check out this amazing sunset! Nature is incredible 🌅",
      likes: 67,
      comments: 15,
      time: '3 days ago',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        alt: 'Sunset'
      }
    }
  ];
  
  userPostsGrid.innerHTML = '';
  userPosts.forEach(post => {
    const postElement = createUserPostElement(post);
    userPostsGrid.appendChild(postElement);
  });
}

function createUserPostElement(post) {
  const postDiv = document.createElement('div');
  postDiv.className = 'user-post-card';
  
  let mediaContent = '';
  if (post.media) {
    if (post.media.type === 'image') {
      mediaContent = `
        <div class="post-media">
          <img src="${post.media.url}" alt="${post.media.alt}" class="post-image">
        </div>
      `;
    }
  }
  
  postDiv.innerHTML = `
    <div class="post-header">
      <div class="post-avatar">JS</div>
      <div class="post-user-info">
        <h4>James Sonzo</h4>
        <p>${post.time}</p>
      </div>
    </div>
    <div class="post-content">
      <div class="post-text">${post.content}</div>
      ${mediaContent}
    </div>
    <div class="post-actions">
      <div class="action-group">
        <button class="action-btn">
          <span class="action-icon">❤️</span>
          <span>${post.likes}</span>
        </button>
        <button class="action-btn">
          <span class="action-icon">💬</span>
          <span>${post.comments}</span>
        </button>
      </div>
    </div>
  `;
  
  return postDiv;
}

function loadUserMedia() {
  const mediaGrid = document.getElementById('mediaGrid');
  const userMedia = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop',
      alt: 'Creative workspace'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop',
      alt: 'Coffee and laptop'
    },
    {
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=200&fit=crop',
      alt: 'Project demo'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
      alt: 'Sunset'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop',
      alt: 'Street art'
    },
    {
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop',
      alt: 'Behind the scenes'
    }
  ];
  
  mediaGrid.innerHTML = '';
  userMedia.forEach(media => {
    const mediaElement = createMediaElement(media);
    mediaGrid.appendChild(mediaElement);
  });
}

function createMediaElement(media) {
  const mediaDiv = document.createElement('div');
  mediaDiv.className = 'media-item';
  
  if (media.type === 'image') {
    mediaDiv.innerHTML = `
      <img src="${media.url}" alt="${media.alt}" onclick="openMediaViewer('${media.url}', 'image')">
    `;
  } else if (media.type === 'video') {
    mediaDiv.innerHTML = `
      <div class="video-container" onclick="openMediaViewer('${media.url}', 'video')">
        <img src="${media.thumbnail}" alt="${media.alt}" class="video-thumbnail">
        <div class="video-play-overlay">
          <span class="play-icon">▶️</span>
        </div>
      </div>
    `;
  }
  
  return mediaDiv;
}

function filterMedia(type) {
  // Remove active class from all filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to clicked button
  event.target.classList.add('active');
  
  // Filter media based on type
  const mediaItems = document.querySelectorAll('.media-item');
  mediaItems.forEach(item => {
    if (type === 'all') {
      item.style.display = 'block';
    } else if (type === 'images' && item.querySelector('img:not(.video-thumbnail)')) {
      item.style.display = 'block';
    } else if (type === 'videos' && item.querySelector('.video-container')) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function toggleEditMode() {
  isEditMode = !isEditMode;
  const editBtn = document.querySelector('.edit-profile-btn');
  
  if (isEditMode) {
    editBtn.textContent = '💾 Save';
    editBtn.style.background = 'rgba(34, 197, 94, 0.2)';
    editBtn.style.borderColor = 'rgba(34, 197, 94, 0.3)';
  } else {
    editBtn.textContent = '✏️ Edit';
    editBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    editBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
  }
}

function changeAvatar() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const avatar = document.getElementById('profileAvatar');
        avatar.style.background = `url(${e.target.result}) center/cover`;
        avatar.textContent = '';
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}

function createNewPost() {
  closeProfile();
  showCreatePost();
}

// Settings Functions
document.addEventListener('DOMContentLoaded', function() {
  // Handle settings form submission
  const settingsForm = document.getElementById('profileSettingsForm');
  if (settingsForm) {
    settingsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('settingsName').value;
      const username = document.getElementById('settingsUsername').value;
      const bio = document.getElementById('settingsBio').value;
      const email = document.getElementById('settingsEmail').value;
      
      // Update profile display
      document.getElementById('profileName').textContent = name;
      document.getElementById('profileUsername').textContent = username;
      document.getElementById('profileBio').textContent = bio;
      
      alert('Profile settings saved successfully!');
    });
  }
});

function setTheme(theme) {
  // Remove active class from all theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to clicked button
  event.target.classList.add('active');
  
  // Apply theme (placeholder for theme implementation)
  console.log(`Theme set to: ${theme}`);
}

// Dashboard Navigation Functions
function updateFooterActive(activeButton) {
  // Remove active class from all footer nav items
  document.querySelectorAll('.footer-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to clicked button
  activeButton.classList.add('active');
}

// Override existing functions to update footer state
function openAIChat() {
  document.getElementById('aiChatModal').style.display = 'flex';
  updateFooterActive(event.target.closest('.footer-nav-item'));
  // Focus on input when chat opens
  setTimeout(() => {
    document.getElementById('chatInput').focus();
  }, 100);
}

function openSocialFeed() {
  document.getElementById('socialFeedModal').style.display = 'flex';
  updateFooterActive(event.target.closest('.footer-nav-item'));
  loadFeed();
}

function openWallet() {
  document.getElementById('walletModal').style.display = 'flex';
  updateFooterActive(event.target.closest('.footer-nav-item'));
}

function openCreatorTools() {
  document.getElementById('creatorToolsModal').style.display = 'flex';
  updateFooterActive(event.target.closest('.footer-nav-item'));
}

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchInput && searchBtn) {
    // Handle search button click
    searchBtn.addEventListener('click', function() {
      performSearch(searchInput.value);
    });
    
    // Handle Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch(this.value);
      }
    });
  }
});

function performSearch(query) {
  if (!query.trim()) {
    alert('Please enter a search term');
    return;
  }
  
  // Search functionality (placeholder)
  console.log(`Searching for: ${query}`);
  alert(`Searching for: ${query}\n\nThis feature will be implemented soon!`);
  
  // Clear search input
  document.querySelector('.search-input').value = '';
}
  